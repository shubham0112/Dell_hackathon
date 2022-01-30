import React from 'react';
import Form from './components/Form';
import './styles.css'
import './App.css'
import Particles from "react-tsparticles";
import { options } from "./options.js";
import styled, { keyframes } from "styled-components";
import { wobble } from "react-animations";

export default function App() {
  
    return (
      <>
        <Particles options={options} id="tsparticles"></Particles>
        <Form></Form>
      </>
    );
  }
// const App=()=>{
//     return<>
        
//         <Form/>
//     </> 
// };

// export default App;