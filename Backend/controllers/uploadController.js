// const multer = require("multer");

// const { generateDocuments } = require("../services/documentService");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// exports.upload = multer({
//   storage,
// }).fields([
//   {
//     name: "excel",
//     maxCount: 1,
//   },
//   {
//     name: "template",
//     maxCount: 1,
//   },
// ]);

// exports.uploadFiles = async (req, res) => {
//   try {

//     console.log("REQUEST RECEIVED");

//     console.log("FILES:", req.files);

//     if (!req.files?.excel || !req.files?.template) {
//       return res.status(400).json({
//         message: "Missing files",
//       });
//     }

//     const excelPath = req.files.excel[0].path;
//     const templatePath = req.files.template[0].path;

//     console.log("EXCEL:", excelPath);
//     console.log("TEMPLATE:", templatePath);

//     const zipPath = await generateDocuments(
//       excelPath,
//       templatePath
//     );

//     console.log("ZIP:", zipPath);

//     return res.download(zipPath);

//   } catch (error) {

//     console.log("UPLOAD CONTROLLER ERROR:");
//     console.log(error);
//     console.log(error.stack);

//     return res.status(500).json({
//       message: error.message
//     });
//   }
// };
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
    console.log("REQUEST RECEIVED");
    console.log("FILES:", req.files);

    if (!req.files?.excel || !req.files?.template) {
      return res.status(400).json({
        message: "Missing files",
      });
    }

    const excelPath = req.files.excel[0].path;
    const templatePath = req.files.template[0].path;

    console.log("EXCEL:", excelPath);
    console.log("TEMPLATE:", templatePath);

    const zipPath = await generateDocuments(excelPath, templatePath);

    console.log("ZIP:", zipPath);

    return res.download(zipPath);
  } catch (error) {
    console.log("UPLOAD CONTROLLER ERROR:");

    console.log(error);
    console.log(error.stack);

    return res.status(500).json({
      message: error.message,
    });
  }
};
