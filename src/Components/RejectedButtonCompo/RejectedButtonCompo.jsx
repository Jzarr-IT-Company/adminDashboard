import Button from '@mui/material/Button';
import { message, Spin } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'

function RejectedButtonCompo({ id, rejected, approvalFunction }) {
    const [loading, setloading] = useState(false);
    const handleDeleteButton = async () => {
        setloading(true)
        try {
            const response = await axios.post('https://hdpicks-main-server.vercel.app/rejectedimages', { id })
            if (response.data.status == 200) {
                approvalFunction()
                if (rejected) {
                    message.success("Rejected Successfully")
                    setloading(false)
                }
            }

        } catch (error) {
            setloading(false)
            console.log("SERVER ERROR", error.message)
        } finally {
            setloading(false)
        }
    }
    return (
        <Button
            variant="contained"
            color={rejected ? "primary" : "error"}
            onClick={handleDeleteButton}
            disabled={rejected || loading}
        >
            {loading ? <Spin /> : "Rejected"}
        </Button>
    )
}

export default RejectedButtonCompo