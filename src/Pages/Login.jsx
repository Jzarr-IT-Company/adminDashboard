import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import axios from 'axios'
function Login() {
    const [password,setPassword]=useState('')
    const handle = async()=>{
        axios.post('')
        console.log(password)
    }
    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center border" style={{ height: "100vh" }}>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                        <div className='mb-3 d-flex justify-content-center align-items-center'>
                            <img src={logo} alt="" />
                        </div>
                        <div className="">
                            <input type="text" placeholder='Enter Password' className='form-control py-3' onChange={(e)=>{setPassword(e.target.value)}} />
                            <button className='mt-3 btn btn-success w-100' onClick={handle}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login