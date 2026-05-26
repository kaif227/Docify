import { useState } from "react";

import {
Container,
Paper,
Typography,
Button,
Box,
LinearProgress
}
from "@mui/material";

import UploadFileIcon
from "@mui/icons-material/UploadFile";

import DescriptionIcon
from "@mui/icons-material/Description";

import api from "../services/api";

function UploadCard(){

const [excelFile,setExcelFile]=
useState(null);

const [templateFile,setTemplateFile]=
useState(null);

const [progress,setProgress]=
useState(0);

const handleGenerate=
async()=>{

try{

const formData=
new FormData();

formData.append(
"excel",
excelFile
);

formData.append(
"template",
templateFile
);

const response=
await api.post(

"/upload",

formData,

{

responseType:"blob",

headers:{

"Content-Type":
"multipart/form-data"

},

onUploadProgress:
(progressEvent)=>{

const percent=
Math.round(

(progressEvent.loaded*100)
/progressEvent.total

);

setProgress(
percent
);

}

}

);

const url=
window.URL.createObjectURL(

new Blob(
[response.data]
)

);

const link=
document.createElement(
"a"
);

link.href=url;

link.setAttribute(

"download",
"documents.zip"

);

document.body.appendChild(
link
);

link.click();

console.log(
response.data
);

alert(
"Files uploaded successfully"
);

}
catch(error){

console.log(error);

alert(
"Upload failed"
);

}

};

return(

<Container
maxWidth="sm"
sx={{mt:8}}
>

<Paper
elevation={4}
sx={{
padding:4,
borderRadius:4
}}
>

<Typography
variant="h4"
mb={2}
>

Docify Doc Generator

</Typography>

<Box mb={3}>

<Button
variant="outlined"
component="label"
fullWidth
startIcon={<UploadFileIcon/>}
>

Upload Excel

<input
hidden
type="file"
accept=".xlsx,.xls"
onChange={(e)=>{

setExcelFile(
e.target.files[0]
)

}}
/>

</Button>

</Box>

<Box mb={3}>

<Button
variant="outlined"
component="label"
fullWidth
startIcon={<DescriptionIcon/>}
>

Upload Template

<input
hidden
type="file"
accept=".docx"
onChange={(e)=>{

setTemplateFile(
e.target.files[0]
)

}}
/>

</Button>

</Box>

{

excelFile&&(

<Typography>

📊 {excelFile.name}

</Typography>

)

}

{

templateFile&&(

<Typography>

📄 {templateFile.name}

</Typography>

)

}

<Box mt={3}>

<Button
variant="contained"
fullWidth
onClick={
handleGenerate
}

disabled={
!excelFile||
!templateFile
}
>

Generate Files

</Button>

</Box>

{

progress>0&&(

<Box mt={3}>

<LinearProgress
variant="determinate"
value={progress}
/>

<Typography>

{progress}%

</Typography>

</Box>

)

}

</Paper>

</Container>

)

}

export default UploadCard;