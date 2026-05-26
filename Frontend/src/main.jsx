// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import {
ToastContainer
}
from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(
document.getElementById("root")
).render(

<>

<App/>

<ToastContainer
position="bottom-right"
/>

</>

);