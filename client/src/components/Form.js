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
                <div className='container'>
                    {/* <label className='sub1' htmlFor="serviceTag">Service Tag : </label> */}
                    <input
                        className='sub2'
                        placeholder='Enter Service Tag'
                        type="search" 
                        id='serviceTag'
                        name='serviceTag'
                        value={val}
                        onChange={(e)=>setVal(e.target.value.split(","))}
                    />
                    <div class="search">
                    </div>
                </div>

                <div class="round">
                        <a class="button" onClick={handleClear}>Clear All</a>
                </div>

                {/* <p className='note' >*Use comma(,) for multiple Service Tags without spaces</p> */}

                {/* <div className='btn' >
                    <button className='btn1' type='submit' >Search</button>
                    <button className='btn2' type='button' onClick={handleClear} >Clear</button>
                </div> */}
            </form>

            {
                flag && <Result output={output} />
            }
        </>
    );
}

export default Form;
