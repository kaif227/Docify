import Navbar from "../components/Navbar";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

import "../styles/success.css";

function Success(){

const navigate=useNavigate();

return(

<>

<Navbar/>

<Confetti/>

<div className="successPage">

<div className="successCard">

<div className="checkmark">

✓

</div>

<h1>

Documents Generated!

</h1>

<p>

Your files were successfully generated.

</p>

<div className="details">

<p>

Files Generated:
100+

</p>

<p>

Status:
Completed

</p>

</div>

<div className="buttonGroup">

<button
onClick={()=>
navigate("/generate")
}
>

Generate New

</button>

<button>

Download Again

</button>

</div>

</div>

</div>

</>

)

}

export default Success;