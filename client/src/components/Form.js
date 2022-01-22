import React,{useState} from 'react';
import Result from './Result';

const Form = () => {
    const [val,setVal]=useState([]);
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
            console.log('Success:', data);
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
                <div>
                    <label htmlFor="serviceTag">Service Tag : </label>
                    <input 
                        type="textarea"
                        id='serviceTag'
                        name='serviceTag'
                        value={val}
                        onChange={(e)=>setVal(e.target.value.split(","))}
                    />
                </div>
                <button type='submit' >Search</button>
                <button type='button' onClick={handleClear} >Clear</button>
            </form>

            {
                flag && <Result/>
            }
        </>
    );
}

export default Form;
