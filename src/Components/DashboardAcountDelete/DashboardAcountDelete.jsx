import axios from 'axios'
import React from 'react'

function DashboardAcountDelete({ id }) {
    const handle = async () => {
        console.log(id)
        axios.delete(`http://localhost:4040/deleteAccount/${id}`)
        .then(res=>{
            console.log(res)
        })
    }
    return (
        <>
            <button className='btn btn-danger' onClick={handle}>Delete Account</button>
        </>
    )
}

export default DashboardAcountDelete