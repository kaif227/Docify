const multer = require("multer");
const { generateDocuments } = require("../services/documentService");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({
  storage,
}).fields([
  {
    name: "excel",
    maxCount: 1,
  },
  {
    name: "template",
    maxCount: 1,
  },
]);

exports.uploadFiles = async (req, res) => {
  try {

  // console.log("BODY:", req.body);

  //   console.log("FILES:", req.files);

  //   console.log("ROWS EXISTS:", !!req.body.rows);

    console.log(
      "TEMPLATE EXISTS:",
      !!req.files?.template
    );
  

  if (!req.files?.template) {
  return res.status(400).json({
    message: "Template file missing",
  });
}

if (!req.body.rows) {
  return res.status(400).json({
    message: "Rows data missing",
  });
}

const rows = JSON.parse(req.body.rows);

const templatePath =
  req.files.template[0].path;

const zipPath =
  await generateDocuments(
    rows,
    templatePath
  );

    return res.download(zipPath);

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
