// import * as React from 'react';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import UpdatedAnswers from '../Components/UpdatedAnswers/UpdatedAnswers';

// function faqs() {
//     const [getPaymentDetails, setGetPaymentDetails] = useState([]);
//     const [pageSize, setPageSize] = useState(20);

//     useEffect(() => {
//         axios('http://localhost:4040/getFAQS')
//             .then(async (res) => {
//                 console.log(res.data.data)
//                 setGetPaymentDetails(res.data.data);
//             });
//     }, []);

//     const handleButtonClick = (id) => {
//         axios.delete(`https://main-server-zeta.vercel.app/deleteData/${id}`)
//             .then((res) => {
//                 setGetPaymentDetails((prevDetails) => prevDetails.filter(item => item._id !== id));
//             })
//             .catch((error) => {
//                 console.error("Error deleting data:", error);
//             });
//     };
//     const columns = [
//         { field: 'id', headerName: 'S.no', width: 90 },
//         { field: 'question', headerName: 'Questions', width: 200 },
//         { field: 'answer', headerName: 'Answers', width: 250 },
//         {
//             field: 'action',
//             headerName: 'Action',
//             width: 150,
//             renderCell: (params) => (
//                 <UpdatedAnswers id={params.row.dataId} />
//             ),
//         }, ,
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 150,
//             renderCell: (params) => (
//                 <Button
//                     variant="contained"
//                     color="error"
//                     onClick={() => handleButtonClick(params.row.dataId)}
//                 >
//                     Delete
//                 </Button>
//             ),
//         },
//     ];
//     const rows = getPaymentDetails.map((data, index) => ({
//         id: index + 1,
//         question: data.faqsquestions,
//         answer: data.faqsanswer,
//         phone: data.phone,
//         dataId: data._id
//     }));

//     return (
//         <>
//             <div className="container-fluid mt-5">
//                 <div className="d-flex justify-content-between">
//                     <h4>All Students</h4>
//                 </div>
//                 <div>
//                     <div className="row">
//                         <div className="col-12">
//                             <Paper sx={{ height: 400, width: '100%' }}>
//                                 <DataGrid
//                                     rows={rows}
//                                     columns={columns}
//                                     pageSize={pageSize}
//                                     onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                                     rowsPerPageOptions={[20, 40, 60]}
//                                     pagination
//                                     disableSelectionOnClick
//                                 />
//                             </Paper>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default faqs;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import UpdatedAnswers from '../Components/UpdatedAnswers/UpdatedAnswers';

function Faqs() {
    const [getPaymentDetails, setGetPaymentDetails] = useState([]);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        axios('https://admin-portal-server.vercel.app/getFAQS')
            .then((res) => {
                console.log(res.data.data);
                setGetPaymentDetails(res.data.data);
            }).catch((error)=>{
                console.log("ERROR FROM GET FAQS",error.message)
            })
    }, []);

    const handleButtonClick = (id) => {
        axios.delete(`https://admin-portal-server.vercel.app/deleteFAQS/${id}`)
            .then((response) => {
                console.log(response)
                setGetPaymentDetails((prevDetails) => prevDetails.filter(item => item._id !== id));
            })
            .catch((error) => {
                console.error("Error deleting data:", error.message);
            });
    };

    const updateAnswer = (id, newAnswer) => {
        setGetPaymentDetails((prevDetails) => 
            prevDetails.map((item) =>
                item._id === id ? { ...item, faqsanswer: newAnswer } : item
            )
        );
    };

    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'question', headerName: 'Questions', width: 200 },
        { field: 'answer', headerName: 'Answers', width: 250 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <UpdatedAnswers id={params.row.dataId} onUpdate={updateAnswer} />
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
                    onClick={() => handleButtonClick(params.row.dataId)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    const rows = getPaymentDetails.map((data, index) => ({
        id: index + 1,
        question: data.faqsquestions,
        answer: data.faqsanswer,
        dataId: data._id
    }));

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="d-flex justify-content-between">
                    <h4>FAQS Queestions and Answers</h4>
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

export default Faqs;
