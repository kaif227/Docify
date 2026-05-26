import {TypeAnimation}
from "react-type-animation";

import {motion}
from "framer-motion";

import "./../styles/hero.css";

function Hero(){

return(

<div className="hero">

<motion.h1

initial={{
opacity:0,
y:-50
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

>

Generate
1000+
Documents
in Seconds

</motion.h1>


<TypeAnimation

sequence={[

"Generating Inspection Forms",
2000,

"Generating Certificates",
2000,

"Generating Contracts",
2000,

]}

speed={50}

repeat={Infinity}

/>

<button>

Start Generating

</button>

</div>

)

}

export default Hero;