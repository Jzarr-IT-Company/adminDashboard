import axios from 'axios'
import React, { useState } from 'react';

function DashboardPasswordChangeComp() {
    const [password, setPassword] = useState('')
    const handle = async () => {
        try {
            // console.log(password)
            axios.post('http://localhost:4040/dashboardLogin', { password })
                .then((res) => {
                    console.log(res.data.id)
                    if (res.data.status === 200) {
                    }
                }).catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="col-12">
                <p className='text-capitalize mb-3 fw-semibold'>Dashboard Password change</p>
                <div className="d-flex" style={{ gap: "30px" }}>
                    <input type="password" placeholder='***********' className='form-control py-3' onChange={(e) => { setPassword(e.target.value) }} />
                    <button className='btn btn-success' onClick={handle}>Change password</button>
                </div>
            </div>
        </>
    )
}

export default DashboardPasswordChangeComp