import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

function Home() {
    const [getPaymentDetails, setGetPaymentDetails] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const [coursename, setcourseName] = useState([])
    useEffect(() => {
        axios('https://main-server-zeta.vercel.app/getAllStudentsdata')
            .then(async (res) => {
                console.log(res.data.data)
                setGetPaymentDetails(res.data.data);
            });
    }, []);

    const handleButtonClick = (id) => {
        axios.delete(`https://main-server-zeta.vercel.app/deleteData/${id}`)
            .then((res) => {
                setGetPaymentDetails((prevDetails) => prevDetails.filter(item => item._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting data:", error);
            });
    };

    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'course', headerName: 'Course', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone Number', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
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
        name: data.name,
        course: data.courses,
        email: data.email,
        phone: data.phone,
        dataId: data._id
    }));
    // const handleExportClick = () => {
    //     // const dataToExport = getPaymentDetails.map(data => ({
    //     //     Name: data.name,
    //     //     Courses: data.courses,
    //     //     Email: data.email,
    //     //     Phone: data.phone
    //     // }));
    //     // const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    //     // const workbook = XLSX.utils.book_new();
    //     // XLSX.utils.book_append_sheet(workbook, worksheet, "StudentsData");
    //     // XLSX.writeFile(workbook, "StudentsData.xlsx");
    //     getPaymentDetails.map(data => {
    //         console.log(data.courses)
    //     });
    // };

    const handleExportClick = () => {
        // const dataToExport = getPaymentDetails.map(data => ({
        //     Name: data.name,
        //     Courses: data.courses.map(course => `Course Name: ${course.courseName}`),  // Format each course with details
        //     Email: data.email,
        //     Phone: data.phone
        // }));
        const courses = getPaymentDetails.map(data => {
            console.log(data.courses)
        });
        const dataToExport = getPaymentDetails.map(data => ({
            Name: data.name,
            // Courses: data.courses.map(course => course.courseName),  // Format each course with details
            Email: data.email,
            Phone: data.phone
        }));
        console.log(dataToExport)
        // const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        // const workbook = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(workbook, worksheet, "StudentsData");
        // XLSX.writeFile(workbook, "StudentsData.xlsx");
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="d-flex justify-content-between">
                    <h4>All Students</h4>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleExportClick} // Export button
                        style={{ marginBottom: '20px' }}
                    >
                        Export to Excel
                    </Button>
                </div>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <Paper sx={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[20, 40, 60]}
                                    pagination
                                    // className='px-4'
                                    disableSelectionOnClick
                                />
                            </Paper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
