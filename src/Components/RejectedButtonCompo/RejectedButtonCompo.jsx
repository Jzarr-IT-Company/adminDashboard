import Button from '@mui/material/Button';
import { message, Spin } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'

function RejectedButtonCompo({ id, approvalFunction }) {
    const [loading, setloading] = useState(false);
    const handleDeleteButton = async () => {
        setloading(true)
        try {
            const response = await axios.post('https://hdpicks-main-server.vercel.app/rejectedimages', { id })
            console.log(response.data.status)
            if (response.data.status == 200) {
                setloading(false)
                message.success("Rejected Successfully")
                approvalFunction()
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
            color="error"
            onClick={handleDeleteButton}
        >
            {loading ? <Spin /> : "Rejected"}
        </Button>
    )
}

export default RejectedButtonCompo