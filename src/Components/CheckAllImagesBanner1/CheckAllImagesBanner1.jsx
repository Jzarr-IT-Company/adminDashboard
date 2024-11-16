// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';
// import * as XLSX from 'xlsx';
// import { Image } from 'antd';
// import ApprovalBttonCompo from '../ApprovalBttonCompo/ApprovalBttonCompo';
// import RejectedButtonCompo from '../RejectedButtonCompo/RejectedButtonCompo';

// function CheckAllImagesBanner1() {
//     const [getImagesData, setGetImagesData] = useState([]);
//     const [getUsersData, setGetUsersData] = useState([]);
//     const [mergedData, setMergedData] = useState([]);
//     const [pageSize, setPageSize] = useState(20);
//     const [loading, setLoading] = useState(true); // Loading state

//     useEffect(() => {
//         setLoading(true); // Set loading to true before fetching
//         const fetchImagesData = axios.get('https://hdpicks-main-server.vercel.app/getDataAllFromDB');
//         const fetchUsersData = axios.get('https://hdpicks-main-server.vercel.app/allUserSData');

//         Promise.all([fetchImagesData, fetchUsersData])
//             .then(([imagesResponse, usersResponse]) => {
//                 const imagesData = imagesResponse.data.data;
//                 const usersData = usersResponse.data.data;
//                 setGetImagesData(imagesData);
//                 setGetUsersData(usersData);

//                 const combinedData = imagesData.map(image => {
//                     const user = usersData.find(user => user._id === image.userId);
//                     return {
//                         ...image,
//                         userName: user ? user.name : 'Unknown',
//                         userEmail: user ? user.email : 'Unknown',
//                         userPhone: user ? user.phone : 'Unknown',
//                         userId: user ? user._id : 'Unknown',
//                         imageId: image ? image._id : 'Unknown'
//                     };
//                 });
//                 setMergedData(combinedData);
//             })
//             .catch(error => {
//                 console.error("Error fetching data:", error);
//             })
//             .finally(() => {
//                 setLoading(false); // Set loading to false after fetching is complete
//             });
//     }, []);

//     const handleExportClick = () => {
//         const dataToExport = mergedData.map(data => ({
//             Name: data.userName,
//             Email: data.userEmail,
//             Phone: data.userPhone,
//             ImageURL: data.imageUrl
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "ImagesData");
//         XLSX.writeFile(workbook, "ImagesData.xlsx");
//     };

//     const rows = mergedData.map((data, index) => ({
//         id: index + 1,
//         imageUrl: data.imageUrl,
//         userName: data.userName,
//         userEmail: data.userEmail,
//         userPhone: data.userPhone,
//         dataId: data._id,
//         status: data.rejected === true ? "Reject" : data.approved === true ? "Approval" : "Pending",
//         category: data.category
//     }));

//     const columns = [
//         { field: 'id', headerName: 'S.no', width: 90 },
//         { field: 'imageUrl', headerName: 'Image', width: 150, renderCell: (params) => <Image src={params.value} alt="image" width={50} /> },
//         { field: 'userName', headerName: 'Uploaded By', width: 200 },
//         { field: 'userEmail', headerName: 'Email', width: 250 },
//         { field: 'userPhone', headerName: 'Phone Number', width: 200 },
//         { field: 'category', headerName: 'Category', width: 200 },
//         { field: 'status', headerName: 'Status', width: 200 },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 400,
//             renderCell: (params) => (
//                 <div className="d-flex" style={{ gap: "10px" }}>
//                     <Button variant="contained" color="white">
//                         View Detail
//                     </Button>
//                     <ApprovalBttonCompo id={params.row.dataId} approved={params.row.approved} />
//                     <RejectedButtonCompo id={params.row.dataId} />
//                 </div>
//             ),
//         },
//     ];

//     return (
//         <div className="container-fluid mt-5">
//             {loading ? (
//                 <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     height="70vh"
//                 >
//                     <CircularProgress />
//                 </Box>
//             ) : (
//                 <>
//                     <div className="d-flex justify-content-between">
//                         <h4>All Images with User Data</h4>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={handleExportClick}
//                             style={{ marginBottom: '20px' }}
//                         >
//                             Export to Excel
//                         </Button>
//                     </div>
//                     <Paper sx={{ height: 400, width: '100%' }}>
//                         <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             pageSize={pageSize}
//                             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//                             rowsPerPageOptions={[20, 40, 60]}
//                             pagination
//                             disableSelectionOnClick
//                         />
//                     </Paper>
//                 </>
//             )}
//         </div>
//     );
// }

// export default CheckAllImagesBanner1;

import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { Image } from 'antd';
import ApprovalBttonCompo from '../ApprovalBttonCompo/ApprovalBttonCompo';
import RejectedButtonCompo from '../RejectedButtonCompo/RejectedButtonCompo';

function CheckAllImagesBanner1() {
    const [getImagesData, setGetImagesData] = useState([]);
    const [getUsersData, setGetUsersData] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const fetchData = async () => {
        setIsLoading(true); // Show loading spinner
        try {
            const fetchImagesData = axios.get('https://hdpicks-main-server.vercel.app/getDataAllFromDB');
            const fetchUsersData = axios.get('https://hdpicks-main-server.vercel.app/allUserSData');

            const [imagesResponse, usersResponse] = await Promise.all([fetchImagesData, fetchUsersData]);
            const imagesData = imagesResponse.data.data;
            const usersData = usersResponse.data.data;
            setGetImagesData(imagesData);
            setGetUsersData(usersData);

            const combinedData = imagesData.map(image => {
                const user = usersData.find(user => user._id === image.userId);
                return {
                    ...image,
                    userName: user ? user.name : 'Unknown',
                    userEmail: user ? user.email : 'Unknown',
                    userPhone: user ? user.phone : 'Unknown',
                    userId: user ? user._id : 'Unknown',
                    imageId: image ? image._id : 'Unknown',
                };
            });
            setMergedData(combinedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false); // Hide loading spinner
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleExportClick = () => {
        const dataToExport = mergedData.map(data => ({
            Name: data.userName,
            Email: data.userEmail,
            Phone: data.userPhone,
            ImageURL: data.imageUrl,
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ImagesData");
        XLSX.writeFile(workbook, "ImagesData.xlsx");
    };

    const rows = mergedData.map((data, index) => ({
        id: index + 1,
        imageUrl: data.imageUrl,
        userName: data.userName,
        userEmail: data.userEmail,
        userPhone: data.userPhone,
        dataId: data._id,
        status: data.rejected === true ? "Rejected" : data.approved === true ? "Approved" : "Pending",
        category: data.category,
    }));

    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'imageUrl', headerName: 'Image', width: 150, renderCell: (params) => <Image src={params.value} alt="image" width={50} /> },
        { field: 'userName', headerName: 'Uploaded By', width: 200 },
        { field: 'userEmail', headerName: 'Email', width: 250 },
        { field: 'userPhone', headerName: 'Phone Number', width: 200 },
        { field: 'category', headerName: 'Category', width: 200 },
        { field: 'status', headerName: 'Status', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => (
                <div className="d-flex" style={{ gap: "10px" }}>
                    <Button variant="contained" color="white">
                        View Detail
                    </Button>
                    <ApprovalBttonCompo id={params.row.dataId} approved={params.row.approved} />
                    <RejectedButtonCompo id={params.row.dataId} />
                    <Button variant="contained" color="error">
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="container-fluid mt-5">
            <div className="d-flex justify-content-between mb-3">
                <h4>All Images with User Data</h4>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchData} // Refresh table button
                        style={{ marginRight: '10px' }}
                    >
                        Refresh Table
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleExportClick} // Export to Excel button
                    >
                        Export to Excel
                    </Button>
                </div>
            </div>
            {/* {isLoading ? (
                <div className='d-flex justify-content-center align-items-center' style={{ textAlign: 'center', height:"70vh" }}>Loading...</div>
            ) : (
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
            )} */}
            <Paper sx={{ height: 400, width: '100%' }}>
                {isLoading ? (
                    <div className='d-flex justify-content-center align-items-center' style={{ textAlign: 'center', height: "30vh" }}>Loading...</div>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[20, 40, 60]}
                        pagination
                        disableSelectionOnClick
                    />
                )}
            </Paper>
        </div>
    );
}

export default CheckAllImagesBanner1;
