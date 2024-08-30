// import { useEffect, useState } from "react"
// import Navbar from "../Components/Navbar/Navbar"
// import axios from "axios"
// import PaymnetDetail from "../Components/PaymnetDetail/PaymnetDetail"
// import { Image } from "antd"
// import AccessBtn from "../Components/AccessBtn/AccessBtn"
// function Payment() {
//     const [getPaymentDetails, setGetPaymentDetails] = useState([])
//     useEffect(() => {
//         axios('https://main-server-zeta.vercel.app/getPaymentDetail')
//             .then(async (res) => {
//                 setGetPaymentDetails(res.data.response)
//                 console.log("PAYMENT DATA", res.data.response)
//             })
//     }, [])
//     const [modalImage, setModalImage] = useState('');

//     const handleImageClick = (imageSrc) => {
//         setModalImage(imageSrc); // Set the image source for the modal
//     };
//     return (
//         <>
//             <div className="sticky-top">
//                 <Navbar />
//             </div>
//             <div className="container bordre mt-5">
//                 <div className="row">
//                     <div className="col-12">
//                         <table className="table table-border">
//                             <thead>
//                                 <tr>
//                                     <th>S.no</th>
//                                     <th>Courses</th>
//                                     <th>Ammount</th>
//                                     <th>payment Image</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     getPaymentDetails.map((data, index) => {
//                                         console.log(data)
//                                         return (
//                                             <>
//                                                 <tr key={index}>
//                                                     <td>{index + 1}</td>
//                                                     <td>{data.coursesname}</td>
//                                                     <td>{data.amount}</td>
//                                                     <td>
//                                                         <Image.PreviewGroup
//                                                             preview={{
//                                                                 onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
//                                                             }}
//                                                         >
//                                                             <Image width={70} src={data.image} />
//                                                         </Image.PreviewGroup>
//                                                         {/* <img src={data.image} width={40} alt="" /> */}
//                                                     </td>
//                                                     <td style={{ gap: "10px" }}>
//                                                         <PaymnetDetail data={data} />
//                                                         {/* <AccessBtn data={data} /> */}
//                                                         <button className="btn btn-danger">Denied</button>
//                                                     </td>
//                                                 </tr>
//                                             </>
//                                         )
//                                     })
//                                 }
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Payment


import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Image } from 'antd';
import * as XLSX from 'xlsx';
import AccessBtn from "../Components/AccessBtn/AccessBtn"
function Payment() {
    const [getPaymentDetails, setGetPaymentDetails] = useState([]);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        axios('https://main-server-zeta.vercel.app/getPaymentDetail')
            .then(res => {
                setGetPaymentDetails(res.data.response);
            });
    }, []);
    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:8888/deletePaymnet/${id}`)
            .then((res) => {
                setGetPaymentDetails(prevDetails => prevDetails.filter(item => item._id !== id));
            })
            .catch(error => {
                console.error("Error deleting data:", error);
                // 
            });
    };

    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'coursesname', headerName: 'Courses', width: 200 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
        {
            field: 'image',
            headerName: 'Payment Image',
            width: 150,
            renderCell: (params) => (

                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    <Image width={60} height={60} src={params.value} />
                </Image.PreviewGroup>
            ),
        },
        {
            field: 'Access',
            headerName: 'Access',
            width: 150,
            renderCell: (params) => (
                <>
                    <AccessBtn coursesname={params.row.data} />
                </>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteClick(params.row.userId)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const rows = getPaymentDetails.map((data, index) => ({
        id: index + 1, // Assuming _id is present; use index as fallback
        coursesname: data.coursesname,
        amount: data.amount,
        image: data.image,
        userId: data._id,
        data: data,
        paymentMethod: data.paymenttype
    }));

    const handleExportClick = () => {
        const dataToExport = getPaymentDetails.map(data => ({
            Courses: data.coursesname,
            Amount: data.amount,
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PaymentData");
        XLSX.writeFile(workbook, "PaymentData.xlsx");
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="d-flex justify-content-between">
                    <h4>Payment Details</h4>
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

export default Payment;
