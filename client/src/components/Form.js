import React,{useState} from 'react';
import Result from './Result';
import Loader from './Loader';
import './Form.css';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import Particles from "react-tsparticles";
import { options } from "../options";

const Form = () => {
    const [val,setVal]=useState([]);
    const [output,setOutput]=useState([]);
    const [flag,setFlag]=useState(false);
    const [isLoading,setIsLoading]=useState(false);
    const [dp,setDp]=useState([]);

    const handleSubmit=(e)=>{
        // prevent auto refresh 
        e.preventDefault();
        setIsLoading(true);

        // call backend
        fetch('/members',{
            method:'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify([val,dp]),
        })
        .then(response => response.json())
        .then(data => {
            setIsLoading(false);
            setOutput(data['data']);
            setDp(data['dp']);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error in fetching data from backend")
        });

        // display output
        setFlag(true);
    }
    const handleClear=(e)=>{
        setVal([]);
        setFlag(false);
        setIsLoading(false);
    }
    return ( 
        <>
            <form action="" onSubmit={handleSubmit} >
                <Zoom center> 
                    <label>SAASTR - SEARCH </label>
                </Zoom>
                <div class="Card">
                    <Fade left>
                    <div class="CardInner">
                        {/* SEARCH BAR COMPONENT */}
                        <div class="container">
                            <div class="InputContainer">
                                <input 
                                    placeholder="Search for the Service Tag"
                                    type="search" 
                                    id='serviceTag'
                                    name='serviceTag'
                                    value={val}
                                    onChange={(e)=>setVal(e.target.value.split(","))}
                                />
                            </div>
                            <div class="Icon" onClick={handleSubmit}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </div>
                            <div class="Icon">
                                <a class="button clear" onClick={handleClear}>
                                CLEAR
                                </a>
                             </div>
                        </div>
                    </div>
                    </Fade>
                </div>
            </form>


            {
                // particles component
                (!flag || isLoading) && <Particles options={options} id="tsparticles" />
            }

            {
                // Loader component
                isLoading && <Loader />
            }

            {
                // Result component
                !isLoading && flag && <Result output={output} />
            }
        </>
    );
}

export default Form;