const PROXY_CONFIG = [
  {
    context: [
      "/blobstore-upload-url",
      "/serve",
      "/_ah"
    ],
    target: "http://localhost:8080",
    secure: false,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
