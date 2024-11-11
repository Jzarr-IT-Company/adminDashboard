import { Spin } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
function DashboardPhysicalAccessDelete({ id, done }) {
    const [loading, setLoading] = useState(false)
    const handle = async () => {
        setLoading(true)
        axios.delete(`http://localhost:4040/deleteUser/${id}`)
            .then(res => {
                if (res.data.status === 200) {
                    setLoading(false)
                    done()
                }
            }).catch(error => {
                setLoading(false)
            })
    }
    return (
        <>
            <button className='btn btn-danger' onClick={handle}>{loading ? <Spin /> : "Delete Account"}</button>
        </>
    )
}

export default DashboardPhysicalAccessDelete