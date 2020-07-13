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

package com.google.ensemble.servlets;

import com.google.api.core.ApiFuture;
import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.google.cloud.firestore.WriteResult;
import com.google.ensemble.data.Constants;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import javax.annotation.Nullable;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.InterruptedException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Servlet that stores and returns visitor comments
 */
@WebServlet(Constants.SERVLET_UPLOAD)
public class UploadServlet extends HttpServlet {

  private static final String FILE_INPUT_NAME = "file";
  private static final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
  private static final FirestoreOptions firestoreOptions =
    FirestoreOptions.getDefaultInstance().toBuilder()
    .setProjectId(Constants.PROJECT_ID)
    .build();
  private static final Firestore db = firestoreOptions.getService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String project = request.getParameter("project");
    String filename = request.getParameter("filename");
    String fileUrl = getUploadedFileUrl(request, FILE_INPUT_NAME);

    Map<String, Object> docData = new HashMap<>();
    docData.put("filename", filename);
    docData.put("fileUrl", fileUrl);
    ApiFuture<WriteResult> future = db.collection("projects").document(project).collection("files").document(filename).set(docData);
    try {
      System.out.println("File " + filename + " uploaded at time " + future.get().getUpdateTime());
    } catch (Exception e) {
      System.out.println(e);
    }
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

    return Constants.SERVLET_SERVE_BLOB + "?blob-key=" + blobKey.getKeyString();
  }
}
