import React,{useState} from 'react';
import Result from './Result';
import './Form.css';

const Form = () => {
    const [val,setVal]=useState([]);
    const [output,setOutput]=useState([]);
    const [flag,setFlag]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(val);
        
        // call backend
        fetch('/members',{
            method:'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(val),
        })
        .then(response => response.json())
        .then(data => {
            // console.log('Success:', data['data']);
            setOutput(data['data']);
            // console.log('Success2:', output);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        // display output
        setFlag(true);
    }
    const handleClear=(e)=>{
        setVal([]);
        setFlag(false);
    }
    return ( 
        <>
            <form action="" onSubmit={handleSubmit} >
                <label>SAASTR - SEARCH</label>
                <div class="Card">
                    <div class="CardInner">
                        <div class="container">
                            <div class="Icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#657789" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                            </div>
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
                            <div class="Icon">
                                <a class="button clear" onClick={handleClear}>Clear All</a>
                             </div>
                        </div>
                    </div>
                </div>
            </form>
            {
                flag && <Result output={output} />
            }
        </>
    );
}

export default Form;


