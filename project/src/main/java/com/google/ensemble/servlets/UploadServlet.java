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

  private static final String COLLECTION_PROJECTS = "projects";
  private static final String COLLECTION_FILES = "files";

  private static final String INPUT_NAME_PROJECT = "project";
  private static final String INPUT_NAME_FILENAME = "filename";
  private static final String INPUT_NAME_FILES = "files";

  private static final String FIELD_FILENAME = "filename";
  private static final String FIELD_CONTENT_TYPE = "contentType";
  private static final String FIELD_FILE_URL = "fileUrl";

  private static final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
  private static final Firestore db =
    FirestoreOptions.getDefaultInstance().toBuilder()
    .setProjectId(Constants.PROJECT_ID)
    .build()
    .getService();

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String project = request.getParameter(INPUT_NAME_PROJECT);

    List<Map<String, Object>> docDataList = getFilesData(request, INPUT_NAME_FILES);
    for (Map<String, Object> docData: docDataList) {
      String filename = docData.get(FIELD_FILENAME).toString();
      ApiFuture<WriteResult> future = db.collection(COLLECTION_PROJECTS).document(project)
        .collection(COLLECTION_FILES).document(filename).set(docData);
      try {
        System.out.println("File " + filename + " uploaded at time " + future.get().getUpdateTime());
      } catch (Exception e) {
        System.out.println(e);
      }
    }
  }

  /** 
   * Returns a list of document data maps, ready to be written to Firestore or to have more data appended before writing
   */
  private List<Map<String, Object>> getFilesData(HttpServletRequest request, String formInputElementName) {
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get(formInputElementName);

    // User submitted form without selecting a file, so we can't get a URL. (dev server)
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null;
    }

    BlobInfoFactory blobInfoFactory = new BlobInfoFactory();
    List<Map<String, Object>> docDataList = new ArrayList<>();
    for (BlobKey blobKey: blobKeys) {
      Map<String, Object> docData = getBlobData(blobInfoFactory, blobKey);
      if (docData != null) {
        docDataList.add(docData)
      }
    }

    return docDataList;
  }

  /**
   * Returns a new map containing file information for a given blob
   */
  @Nullable
  private Map<String, Object> getBlobData(BlobInfoFactory blobInfoFactory, BlobKey blobKey) {
    BlobInfo blobInfo = blobInfoFactory.loadBlobInfo(blobKey);

    // User submitted form without selecting a file, so we can't get a URL. (live server)
    if (blobInfo.getSize() == 0) {
      blobstoreService.delete(blobKey);
      return null;
    }

    String fileUrl = Constants.SERVLET_SERVE_BLOB + "?blob-key=" + blobKey.getKeyString();

    Map<String, Object> docData = new HashMap<>();
    docData.put(FIELD_FILENAME, blobInfo.getFilename());
    docData.put(FIELD_CONTENT_TYPE, blobInfo.getContentType());
    docData.put(FIELD_FILE_URL, fileUrl);

    return docData;
  }
}