import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileExcel, FaFileWord } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import "./../styles/upload.css";

function UploadSection() {
  // const [excel,setExcel]=useState(null);
  // const [template,setTemplate]=useState(null);
  // const [loading,setLoading]=useState(false);

  const [excel, setExcel] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const [activeCell, setActiveCell] = useState(null);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  // const excelDrop = useDropzone({
  //   accept: {
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
  //   },

  //   onDrop: (files) => {
  //     setExcel(files[0]);
  //   },
  // });
  const excelDrop = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },

    onDrop: (files) => {
      const file = files[0];

      setExcel(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, {
          type: "array",
        });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // const json = XLSX.utils.sheet_to_json(sheet);
        // const json = XLSX.utils.sheet_to_json(sheet, {
        //   range: 6,
        // });

        const rawData = XLSX.utils.sheet_to_json(sheet, {
          range: 6,
        });

        const formattedRows = rawData
          .filter((row) => row.__EMPTY_1 === "IRW")
          .map((row) => ({
            sn: row.__EMPTY,
            type: row.__EMPTY_1,
            discipline: row.__EMPTY_2,
            refNo: row.__EMPTY_3,
            revision: row.__EMPTY_4,
            contractor: row.__EMPTY_5,
            description: row.__EMPTY_6,
            subDate: XLSX.SSF.format("dd-mmm-yyyy", row.__EMPTY_7),
            inspectionDate: XLSX.SSF.format("dd-mmm-yyyy", row.__EMPTY_8),
            inspectionTime: XLSX.SSF.format("hh:mm AM/PM", row.__EMPTY_9),
          }));

        // console.log(formattedRows);
        // console.log("RAW DATA:", rawData);
        // console.log("FORMATTED:", formattedRows);

        setRows(formattedRows);
      };

      reader.readAsArrayBuffer(file);

      toast.success("Excel uploaded");
    },
  });

  const templateDrop = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },

    onDrop: (files) => {
      setTemplate(files[0]);

      toast.success("Template uploaded");
    },
  });

  const handleGenerate = async () => {
    if (!excel || !template) {
      toast.error("Upload both files");
      // console.log("ROWS BEING SENT:", rows);
      // console.log("EXCEL STATE:", excel);
      // console.log("TEMPLATE STATE:", template);
      // console.log("ROWS:", rows.length);

      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("template", template);

      formData.append("rows", JSON.stringify(rows));

      // console.log("EXCEL STATE:", excel);

      // console.log("TEMPLATE STATE:", template);

      // console.log("ROWS LENGTH:", rows.length);

      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      const response = await axios.post(
        "https://docify-backend-c8gt.onrender.com/api/upload", //"http://localhost:5000/api/upload",
        formData,

        {
          responseType: "blob",
        },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "documents.zip");

      document.body.appendChild(link);
      link.click();

      toast.success("Documents Generated");

      setTimeout(() => {
        navigate("/success");
      }, 1000);
    } catch (error) {
      console.log("FULL ERROR:", error);

      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();

        console.log("SERVER MESSAGE:", text);
      } else {
        console.log("SERVER RESPONSE:", error.response?.data);
      }
    }
  };

  // for deletecell

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);

    setRows(updated);
  };
  // for updateCell
  const updateCell = (rowIndex, field, value) => {
    const updatedRows = [...rows];

    updatedRows[rowIndex][field] = value;

    setRows(updatedRows);
  };

  return (
    <div className="pageContent">
      <div className="uploadContainer">
        {/* upload card 1 */}
        <div className="uploadCards">
          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <div {...excelDrop.getRootProps()}>
              <input {...excelDrop.getInputProps()} />

              <FaFileExcel size={60} />

              <h2>Upload Excel</h2>

              <p>{excel ? excel.name : "Drag Excel Here"}</p>
            </div>
          </motion.div>
          {/* upload card 2 */}

          <motion.div whileHover={{ scale: 1.05 }} className="card">
            <div {...templateDrop.getRootProps()}>
              <input {...templateDrop.getInputProps()} />

              <FaFileWord size={60} />

              <h2>Upload Template</h2>

              <p>{template ? template.name : "Drag Template Here"}</p>
            </div>
          </motion.div>
        </div>

        <div className="tableContainer">
          {rows.length > 0 && (
            <table>
              <thead>
                <tr>
                  {Object.keys(rows[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(row).map((key) => (
                      <td key={key}>
                        {key === "description" ? (
                          <textarea
                            className="descriptionInput"
                            value={row[key]}
                            onChange={(e) =>
                              updateCell(rowIndex, key, e.target.value)
                            }
                          />
                        ) : (
                          <input
                            className={key === "refNo" ? "refNoInput" : ""}
                            value={row[key]}
                            onChange={(e) =>
                              updateCell(rowIndex, key, e.target.value)
                            }
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="buttonSection">
          <button onClick={handleGenerate} className="generateBtn">
            {loading ? "Generating..." : "Generate Documents"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadSection;
