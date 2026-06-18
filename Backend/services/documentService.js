const fs = require("fs");
const path = require("path");

const XLSX = require("xlsx");
const PizZip = require("pizzip");
const archiver = require("archiver");
function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

exports.generateDocuments = async (rows, templatePath) => {
  // const workbook = XLSX.readFile(excelPath);

  // const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // const rows = XLSX.utils.sheet_to_json(sheet);

  const jobId = Date.now().toString();

  const outputFolder = path.join(__dirname, "../generated", jobId);

  fs.mkdirSync(outputFolder, { recursive: true });

  for (const row of rows) {
    try {
      const content = fs.readFileSync(templatePath, "binary");
      const zip = new PizZip(content);

      const xmlFile = zip.file("word/document.xml");

      if (!xmlFile) {
        throw new Error("Template document.xml not found");
      }
      // console.log("PROCESSING:", row.refNo);
      
      let documentXml = xmlFile.asText();
      const refNo = escapeXml(row.refNo || "");
      const description = escapeXml(
        (row.description || "").replace(/\r?\n/g, " "),
      );

      const subDate = row.subDate
        ? XLSX.SSF.format("dd-mmm-yyyy", row.subDate)
        : "";

      const inspectionDate = row.inspectionDate
        ? XLSX.SSF.format("dd-mmm-yyyy", row.inspectionDate)
        : "";

      const inspectionTime = row.inspectionTime
        ? XLSX.SSF.format("hh:mm AM/PM", row.inspectionTime)
        : "";

      const villaMatch = description.match(/VILLA\s*NO:\s*([^,]+?\([^)]+\))/i);

      const buildingNo = villaMatch ? villaMatch[1].trim() : "";

      documentXml = documentXml.replaceAll("REF_NO", refNo);

      documentXml = documentXml.replaceAll("DESCRIPTION_TEXT", description);

      documentXml = documentXml.replaceAll("SUB_DATE", subDate);

      documentXml = documentXml.replaceAll("INSPECTION_DATE", inspectionDate);

      documentXml = documentXml.replaceAll("INSPECTION_TIME", inspectionTime);

      documentXml = documentXml.replaceAll("BUILDING_NO", buildingNo);

      zip.file("word/document.xml", documentXml);

      const buffer = zip.generate({
        type: "nodebuffer",
      });

      // const fileName = `${refNo}.docx`;
      const safeRefNo = refNo.replace(/[\\/:*?"<>|]/g, "_");

      const fileName = `${safeRefNo}.docx`;
      // console.log("CREATING FILE:", fileName);

      fs.writeFileSync(path.join(outputFolder, fileName), buffer);
//       console.log(
//   "WRITING:",
//   fileName
// );
// console.log(
//   "SUCCESS:",
//   fileName
// );
    } catch (error) {
      console.log("ROW ERROR:", error);

      throw error;
    }
  }

  // create zip

  const zipPath = path.join(outputFolder, "documents.zip");

  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipPath);

    const archive = archiver("zip", {
      zlib: {
        level: 9,
      },
    });

    archive.pipe(output);

    archive.glob("*.docx", {
      cwd: outputFolder,
    });

    output.on("close", () => resolve());

    // archive.on("error", (err) => reject(err));
    archive.on("error", (err) => {
      console.log("ZIP ERROR:", err);

      reject(err);
    });

    archive.finalize();
  });
  // console.log("ZIP CREATED:", zipPath);

  return zipPath;
};

  