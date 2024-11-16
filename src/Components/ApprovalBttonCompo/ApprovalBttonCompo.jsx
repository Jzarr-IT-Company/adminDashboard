import { Button } from '@mui/material'
import { message, Spin } from 'antd'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

function ApprovalButtonCompo({ id, approved, approvalFunction }) {
    const [loading, setLoading] = useState(false)

    const handleButtonClick = async () => {
        if (approved) return;  
        setLoading(true)
        try {
            const response = await axios.post('https://hdpicks-main-server.vercel.app/approvedimages', { id })
           console.log(response)
            if (response.data.status === 200) {
                setLoading(false)
                message.success('Approved')
                approvalFunction()  
            }
        } catch (error) {
            console.log('Error from approval button:', error.message)
        }
    }

    useEffect(() => {
        if (approved) {
            setLoading(false)
        }
    }, [approved])

    return (
        <Button
            variant="contained"
            color={approved ? "primary" : "success"}
            onClick={handleButtonClick}
            disabled={approved || loading}  
        >
            {loading ? <Spin /> : approved ? "Approved" : "Approval"}
        </Button>
    )
}

export default ApprovalButtonCompo