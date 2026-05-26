import UploadSection from "../components/UploadSection";
import "./../styles/generate.css";
import Navbar from "../components/Navbar";


function Generate(){

return(
<>
<Navbar/>
<div className="generatePage">

<h1>

Generate Documents

</h1>

<p>

Upload your Excel file and template
to create documents instantly

</p>

<UploadSection/>

<div className="aiSection">

<h2>

AI Detection

</h2>

<div className="detectCard">

<p>
✓ Reference Number detected
</p>

<p>
✓ Description detected
</p>

<p>
✓ Building extraction ready
</p>

<p>
✓ Inspection date found
</p>

</div>

</div>

</div>
</>
)

}

export default Generate;