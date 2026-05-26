// import {AppBar,Toolbar,Typography}
// from "@mui/material";

// function Navbar(){

// return(

// <AppBar position="static">

// <Toolbar>

// <Typography
// variant="h5"
// >

// Docify

// </Typography>

// </Toolbar>

// </AppBar>

// )

// }

// export default Navbar;

import "./../styles/navbar.css";
import {Link} from "react-router-dom";
import {useEffect,useState} from "react";

function Navbar(){

const[scroll,setScroll]=useState(false);

useEffect(()=>{

window.addEventListener(

"scroll",

()=>{

if(window.scrollY>50){

setScroll(true);

}else{

setScroll(false);

}

}

)

},[])

return(

<nav className={scroll?"navbar active":"navbar"}>

<div className="logo">

Docify 

</div>

<ul>

<li>
<Link to="/">
Home
</Link>
</li>

<li>
<Link to="/generate">
Generate
</Link>
</li>

<li>
<Link to="/dashboard">
Dashboard
</Link>
</li>

<li>
<Link to="/features">
Features
</Link>
</li>

<li>
<Link to="/upcoming">
Upcoming
</Link>
</li>
<li>
<Link to="/contact">
Contact
</Link>
</li>

</ul>

<button>


<Link to="/generate">
Get Started
</Link>

</button>

</nav>

)

}

export default Navbar;