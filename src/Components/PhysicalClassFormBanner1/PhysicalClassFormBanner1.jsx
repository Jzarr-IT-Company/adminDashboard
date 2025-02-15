import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

function PhysicalClassFormBanner1() {
    const [getPaymentDetails, setGetPaymentDetails] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        refreshBtn()
    }, []);

    const refreshBtn = async () => {
        setLoading(true)
        axios('https://main-server-zeta.vercel.app/getAllStudentsDatas')
            .then(async (res) => {
                if (res.data.status == 200) {
                    setGetPaymentDetails(res.data.data);
                    setLoading(false)
                    console.log(res.data.data)
                }
            });
    }

    const handleButtonClick = (id) => {
        axios.delete(`https://admin-portal-server.vercel.app/deleteData/${id}`)
            .then((res) => {
                setGetPaymentDetails((prevDetails) => prevDetails.filter(item => item._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
    };
    const handleEdit = async (id) => {
        navigate(`/ed/${id}`)
        console.log(id)
    }
    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'enrollmentId', headerName: 'Enrollment ID', width: 170 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone Number', width: 170 },
        { field: 'courseName', headerName: 'Course Name', width: 200 },
        { field: 'paymentMethod', headerName: 'Payment Methods', width: 200 },
        { field: 'whatsapp_number', headerName: 'Whatsapp Number', width: 200 },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    // color="error"
                    onClick={() => handleEdit(params.row.dataId)}
                >
                    Edit
                </Button>
            ),
        },
        {
            field: 'deleteBtn',
            headerName: 'Removed',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleButtonClick(params.row.dataId)}
                >
                    Delete
                </Button>
            ),
        },

    ];

    const rows = getPaymentDetails.map((data, index) => ({
        id: index + 1,
        name: data.fullName,
        email: data.email,
        phone: data.mobile,
        whatsapp_number: data.whatsapp || "-",
        paymentMethod: data.paymentMethod || "-",
        courseName: data.courseName,
        dataId: data._id,
        enrollmentId: data.enrollmentId,
    }));

    const handleExportClick = () => {
        const dataToExport = getPaymentDetails.map(data => ({
            enrollmentId: data.enrollmentId,
            name: data.fullName,
            email: data.email,
            phone: data.mobile,
            whatsapp_number: data.whatsapp || "-",
            paymentMethod: data.paymentMethod || "-",
            courseName: data.courseName,
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StudentsData");
        XLSX.writeFile(workbook, "StudentsData.xlsx");
    };

    const handleBttn = () => {
        navigate('/addst')
    }
    return (
        <div className="container-fluid mt-5">
            <div className="d-flex justify-content-between">
                <h4>Physical Students</h4>
                <div className='d-flex align-items-center'>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBttn}
                        style={{ marginBottom: '20px' }}
                        className='me-2'
                    >
                        Add
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExportClick}
                        style={{ marginBottom: '20px' }}
                    >
                        Export to Excel
                    </Button>
                    <IconButton sx={{ mb: 2 }} onClick={refreshBtn}>
                        <RefreshIcon />
                    </IconButton>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col-12">
                        <Paper sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={pageSize}
                                loading={loading}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[20, 40, 60]}
                                pagination
                                disableSelectionOnClick
                            />
                        </Paper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhysicalClassFormBanner1