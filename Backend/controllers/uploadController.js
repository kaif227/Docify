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

const upload = multer({
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

exports.uploadFiles = (req, res) => {
  upload(
    req,
    res,

    async (err) => {
      if (err) {
        return res.status(500).json({
          message: "Upload failed",
        });
      }

      try {
        const excelPath = req.files.excel[0].path;

        const templatePath = req.files.template[0].path;

        const zipPath = await generateDocuments(excelPath, templatePath);

        res.download(zipPath);
      }catch(error){

console.log("UPLOAD ERROR:", error);

console.log(
error.stack
);

res.status(500).json({

message:error.message

});

}
    },
  );
};
