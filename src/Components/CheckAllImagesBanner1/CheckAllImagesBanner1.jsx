import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import { Image } from 'antd';

function CheckAllImagesBanner1() {
    const [getImagesData, setGetImagesData] = useState([]);
    const [getUsersData, setGetUsersData] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {

        const fetchImagesData = axios.get('http://localhost:8800/AllImagesfromDB');
        const fetchUsersData = axios.get('http://localhost:8800/allUserSData');

        Promise.all([fetchImagesData, fetchUsersData])
            .then(([imagesResponse, usersResponse]) => {
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
                        imageId: image ? image._id : 'Unknown'
                    };
                });
                setMergedData(combinedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const refreshData = () => {
        try {
            const fetchImagesData = axios.get('http://localhost:8800/AllImagesfromDB');
            const fetchUsersData = axios.get('http://localhost:8800/allUserSData');

            Promise.all([fetchImagesData, fetchUsersData])
                .then(([imagesResponse, usersResponse]) => {
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
                            imageId: image ? image._id : 'Unknown'
                        };
                    });
                    setMergedData(combinedData);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        } catch (error) {
            throw error;
        }
    }

    const handleButtonClick = async (id, url) => {
        const modifiedUrl = url?.replace('https://imagesvideoszipfilesbuckets.s3.amazonaws.com/', '') || '';
        const resp = await axios.delete('https://hdpicks-main-server.vercel.app/fileObjectDelete', {
            data: { id: id }
        })
        const response = await axios.delete('https://hspiks-image-server.vercel.app/delete', {
            data: { key: modifiedUrl }
        })
        if (response.data.status == 200) {
            refreshData()
        }
        console.log('DELETE DATA', resp, response)
    };

    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'imageUrl', headerName: 'Image', width: 150, renderCell: (params) => <Image src={params.value} alt="image" width={50} /> },
        { field: 'userName', headerName: 'Uploaded By', width: 200 },
        { field: 'userEmail', headerName: 'Email', width: 250 },
        { field: 'userPhone', headerName: 'Phone Number', width: 200 },
         
        {
            field: 'actions',
            headerName: 'Actions',
            width: 400,
            renderCell: (params) => (
                <>
                <div className="d-flex" style={{gap:"0px 10px"}}>
                <Button
                    variant="contained"
                    color="white"
                    onClick={() => handleButtonClick(params.row.dataId, params.row.imageUrl)}
                >
                    View Detail
                </Button>
                 <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleButtonClick(params.row.dataId, params.row.imageUrl)}
                >
                    Accept
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleButtonClick(params.row.dataId, params.row.imageUrl)}
                >
                    Rejected
                </Button>
                </div>
                </>
            ),
        },
    ];
    const rows = mergedData.map((data, index) => ({
        id: index + 1,
        imageUrl: data.imageUrl,
        userName: data.userName,
        userEmail: data.userEmail,
        userPhone: data.userPhone,
        dataId: data._id
    }));

    const handleExportClick = () => {
        const dataToExport = mergedData.map(data => ({
            Name: data.userName,
            Email: data.userEmail,
            Phone: data.userPhone,
            ImageURL: data.imageUrl
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ImagesData");
        XLSX.writeFile(workbook, "ImagesData.xlsx");
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="d-flex justify-content-between">
                    <h4>All Images with User Data</h4>
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

export default CheckAllImagesBanner1;
