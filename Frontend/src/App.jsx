
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Features from "./pages/Features";
import Dashboard from "./pages/Dashboard";
import Upcoming from "./pages/Upcoming";
import Contact from "./pages/Contact";
import Success from "./pages/Success";

function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/generate"
element={<Generate/>}
/>

<Route
path="/features"
element={<Features/>}
/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>

<Route
path="/upcoming"
element={<Upcoming/>}
/>
<Route
path="/contact"
element={<Contact/>}
/>
<Route
path="/success"
element={<Success/>}
/>

</Routes>

</BrowserRouter>

)

}

export default App;