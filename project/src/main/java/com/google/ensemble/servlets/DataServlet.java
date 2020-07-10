// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ImagesServiceFailureException;
import com.google.appengine.api.images.ServingUrlOptions;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.sps.data.Comment;
import com.google.sps.data.Constants;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import javax.annotation.Nullable;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 * Servlet that stores and returns visitor comments
 */
@WebServlet(Constants.SERVLET_DATA)
public class DataServlet extends HttpServlet {

    private static final int NUM_COMMENTS_DEFAULT = 1;
    private static final String PARAM_NUM_COMMENTS = "num-comments";
    private static final String PARAM_COMMENT_BOX = "comment-box";
    private static final String IMAGE_INPUT_NAME = "image";

    private static final Gson gson = new Gson();
    private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private static final UserService userService = UserServiceFactory.getUserService();
    private static final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    private static final ImagesService imagesService = ImagesServiceFactory.getImagesService();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Query query = new Query(Comment.KIND).addSort(Comment.PROPERTY_TIMESTAMP, SortDirection.DESCENDING);
        PreparedQuery results = datastore.prepare(query);
        int maxNumComments;
        try {
            maxNumComments = Integer.parseInt(request.getParameter(PARAM_NUM_COMMENTS));
        } catch (NumberFormatException e) {
            maxNumComments = NUM_COMMENTS_DEFAULT;
        }

        List<Comment> comments = new ArrayList<Comment>();
        for (Entity entity : results.asIterable(FetchOptions.Builder.withLimit(maxNumComments))) {
            String key = KeyFactory.keyToString(entity.getKey());
            long timestamp = (long) entity.getProperty(Comment.PROPERTY_TIMESTAMP);
            String userId = (String) entity.getProperty(Comment.PROPERTY_ID);
            String userEmail = (String) entity.getProperty(Comment.PROPERTY_EMAIL);
            String text = (String) entity.getProperty(Comment.PROPERTY_TEXT);
            String imageUrl = (String) entity.getProperty(Comment.PROPERTY_IMAGE);

            Comment comment = new Comment(key, timestamp, userId, userEmail, text, imageUrl);
            comments.add(comment);
        }

        String json = gson.toJson(comments);
        response.setContentType("application/json");
        response.getWriter().println(json);
    }


    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String text = request.getParameter(PARAM_COMMENT_BOX);
        long timestamp = System.currentTimeMillis();
        String userId = userService.getCurrentUser().getUserId();
        String userEmail = userService.getCurrentUser().getEmail();
        String imageUrl = getUploadedFileUrl(request, IMAGE_INPUT_NAME);

        Entity commentEntity = new Entity(Comment.KIND);
        commentEntity.setProperty(Comment.PROPERTY_TIMESTAMP, timestamp);
        commentEntity.setProperty(Comment.PROPERTY_ID, userId);
        commentEntity.setProperty(Comment.PROPERTY_EMAIL, userEmail);
        commentEntity.setProperty(Comment.PROPERTY_TEXT, text);
        commentEntity.setProperty(Comment.PROPERTY_IMAGE, imageUrl);

        datastore.put(commentEntity);

        // Redirect back to main page
        response.sendRedirect(Constants.PAGE_INDEX);
    }

    /** 
     * Returns a URL that points to the uploaded file, or null if the user didn't upload a file. 
     */
    @Nullable
    private String getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
        Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
        List<BlobKey> blobKeys = blobs.get(formInputElementName);

        // User submitted form without selecting a file, so we can't get a URL. (dev server)
        if (blobKeys == null || blobKeys.isEmpty()) {
            return null;
        }

        // Our form only contains a single file input, so get the first index.
        BlobKey blobKey = blobKeys.get(0);

        // User submitted form without selecting a file, so we can't get a URL. (live server)
        BlobInfo blobInfo = new BlobInfoFactory().loadBlobInfo(blobKey);
        if (blobInfo.getSize() == 0) {
            blobstoreService.delete(blobKey);
            return null;
        }

        // TODO: issue#32 file (image) validity check
        // https://stackoverflow.com/q/10779564/873165

        // Use ImagesService to get a URL that points to the uploaded file.
        ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(blobKey);

        // Use Blobstore-only serving if getServingUrl fails
        String servingUrl;
        try {
            servingUrl = imagesService.getServingUrl(options);
        } catch (ImagesServiceFailureException e) {
            return Constants.SERVLET_SERVE_BLOB + "?blob-key=" + blobKey.getKeyString();
        }

        // To support running in Google Cloud Shell with AppEngine's devserver, we must use the relative
        // path to the image, rather than the path returned by imagesService which contains a host.
        try {
            URL url = new URL(servingUrl);
            return url.getPath();
        } catch (MalformedURLException e) {
            return servingUrl;
        }
    }
}
