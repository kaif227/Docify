const fs = require("fs");
const path = require("path");

const XLSX = require("xlsx");
const PizZip = require("pizzip");
const archiver = require("archiver");

exports.generateDocuments = async (excelPath, templatePath) => {

    const workbook = XLSX.readFile(excelPath);

    const sheet =
    workbook.Sheets[
        workbook.SheetNames[0]
    ];

    const rows =
    XLSX.utils.sheet_to_json(sheet);

    const jobId =
    Date.now().toString();

    const outputFolder =
    path.join(
        __dirname,
        "../generated",
        jobId
    );

    fs.mkdirSync(
        outputFolder,
        {recursive:true}
    );

    for(const row of rows){

        const content =
        fs.readFileSync(
            templatePath,
            "binary"
        );

        const zip =
        new PizZip(content);

        let documentXml =
        zip.file(
            "word/document.xml"
        ).asText();

        // -------------------
        // Excel values
        // -------------------

        const refNo =
        row.__EMPTY_3 || "";

        const description =
        row.__EMPTY_6 || "";

        // Sub Date
        const subDate =
        XLSX.SSF.format(
            "dd-mmm-yyyy",
            row.__EMPTY_7
        );

        // Inspection Date
        const inspectionDate =
        XLSX.SSF.format(
            "dd-mmm-yyyy",
            row.__EMPTY_8
        );

        // Time
        const inspectionTime =
        XLSX.SSF.format(
            "hh:mm AM/PM",
            row.__EMPTY_9
        );

        // -------------------
        // Extract Building No
        // Example:
        // VILLA NO: 5973538 (GCR-V18-E-153)
        // -------------------

        const villaMatch =
        description.match(
        /VILLA\s*NO:\s*([^,]+?\([^)]+\))/i
        );

        const buildingNo =
        villaMatch
        ? villaMatch[1].trim()
        : "";

        // -------------------
        // Replace template text
        // -------------------

        documentXml =
        documentXml.replaceAll(
            "REF_NO",
            refNo
        );

        documentXml =
        documentXml.replaceAll(
            "DESCRIPTION_TEXT",
            description
        );

        documentXml =
        documentXml.replaceAll(
            "SUB_DATE",
            subDate
        );

        documentXml =
        documentXml.replaceAll(
            "INSPECTION_DATE",
            inspectionDate
        );

        documentXml =
        documentXml.replaceAll(
            "INSPECTION_TIME",
            inspectionTime
        );

        documentXml =
        documentXml.replaceAll(
            "BUILDING_NO",
            buildingNo
        );

        zip.file(
            "word/document.xml",
            documentXml
        );

        const buffer =
        zip.generate({
            type:"nodebuffer"
        });

        const fileName =
        `${refNo}.docx`;

        fs.writeFileSync(
            path.join(
                outputFolder,
                fileName
            ),
            buffer
        );

    }

    // create zip

    const zipPath =
    path.join(
        outputFolder,
        "documents.zip"
    );

    await new Promise(
        (resolve,reject)=>{

        const output =
        fs.createWriteStream(
            zipPath
        );

        const archive =
        archiver(
            "zip",
            {
                zlib:{
                    level:9
                }
            }
        );

        archive.pipe(output);

        archive.glob(
            "*.docx",
            {
                cwd:outputFolder
            }
        );

        output.on(
            "close",
            ()=>resolve()
        );

        archive.on(
            "error",
            err=>reject(err)
        );

        archive.finalize();

    });

    return zipPath;

};