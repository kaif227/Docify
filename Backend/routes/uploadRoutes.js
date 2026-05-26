// const express = require("express");

// const router = express.Router();

// const { upload, uploadFiles } = require("../controllers/uploadController");

// router.post("/upload", upload, uploadFiles);

const express = require("express");

const router = express.Router();

const {
  upload,
  uploadFiles
} = require("../controllers/uploadController");

router.post(
  "/upload",
  upload,
  uploadFiles
);

module.exports = router;
