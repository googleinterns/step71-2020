package com.google.ensemble.servlets;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.ensemble.data.Constants;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(Constants.SERVLET_SERVE_BLOB)
public class ServeBlobServlet extends HttpServlet {

    private static final String PROPERTY_BLOBKEY = "blob-key";

    private static final BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        BlobKey blobKey = new BlobKey(request.getParameter(PROPERTY_BLOBKEY));
        blobstoreService.serve(blobKey, response);
    }
}
