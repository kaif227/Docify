import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaFileExcel, FaFileWord } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./../styles/upload.css";

function UploadSection() {
  // const [excel,setExcel]=useState(null);
  // const [template,setTemplate]=useState(null);
  // const [loading,setLoading]=useState(false);

  const [excel, setExcel] = useState(null);
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const excelDrop = useDropzone({
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },

    onDrop: (files) => {
      setExcel(files[0]);
    },
  });

const templateDrop = useDropzone({

accept:{
'application/vnd.openxmlformats-officedocument.wordprocessingml.document':[]
},

onDrop:(files)=>{

setTemplate(files[0]);

toast.success(
"Template uploaded"
);

}

});

  const handleGenerate = async () => {
    if (!excel || !template) {
      toast.error("Upload both files");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("excel", excel);

      formData.append("template", template);

      const response = await axios.post(
        "https://docify-backend.onrender.com/api/upload",

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

     toast.success(
"Documents Generated"
);

setTimeout(()=>{

navigate("/success");

},1000);
    } catch (error) {
      toast.error("Generation Failed");

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploadContainer">
      <motion.div whileHover={{ scale: 1.05 }} className="card">
        <div {...excelDrop.getRootProps()}>
          <input {...excelDrop.getInputProps()} />

          <FaFileExcel size={60} />

          <h2>Upload Excel</h2>

          <p>{excel ? excel.name : "Drag Excel Here"}</p>
        </div>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} className="card">
        <div {...templateDrop.getRootProps()}>
          <input {...templateDrop.getInputProps()} />

          <FaFileWord size={60} />

          <h2>Upload Template</h2>

          <p>{template ? template.name : "Drag Template Here"}</p>
        </div>
      </motion.div>

      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <button onClick={handleGenerate} className="generateBtn">
          {loading ? "Generating..." : "Generate Documents"}
        </button>
      </div>
    </div>
  );
}

export default UploadSection;
