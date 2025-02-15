import axios from 'axios'
import React, { useEffect, useState } from 'react';
import DashboardAddAccount from '../dashboardAddAccount/DashboardAddAccount';
import DashboardChangePassword from '../DashboardChangePassword/DashboardChangePassword';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DashboardChangeEmail from '../DashboardChangeEmail/DashboardChangeEmail';
import DashboardAcountDelete from '../DashboardAcountDelete/DashboardAcountDelete';
function DashboardPasswordChangeComp() {
    const [getPaymentDetails, setGetPaymentDetails] = useState([]);
    const [pageSize, setPageSize] = useState(20);
    useEffect(() => {
        axios('http://localhost:8800/getStaffData')
            .then(async (res) => {
                setGetPaymentDetails(res.data.data);
                console.log(res.data.data);
            });
    }, []);
    const done = () => {
        axios('http://localhost:4040/getDashboardAccessData')
            .then(async (res) => {
                setGetPaymentDetails(res.data.data);
            });
    }
    const columns = [
        { field: 'id', headerName: 'S.no', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone Number', width: 200 },
        {
            field: 'changepass',
            headerName: 'Change Password',
            width: 150,
            renderCell: (params) => (
                <DashboardChangePassword />
            ),
        },
        {
            field: 'changeemail',
            headerName: 'Change Email',
            width: 150,
            renderCell: (params) => (
                <DashboardChangeEmail />
            ),
        },
        ,
        {
            field: 'delete',
            headerName: 'Delete Account',
            width: 150,
            renderCell: (params) => (
                <DashboardAcountDelete id={params.row.dataId} done={done} />
            ),
        },
    ];
    const rows = getPaymentDetails.map((data, index) => ({
        id: index + 1,
        name: data.name,
        email: data.email,
        phone: data.phone,
        dataId: data._id
    }));
    return (
        <>
            <div className="col-12 d-flex justify-content-between">
                <p className='text-capitalize mb-3 fw-semibold'>Dashboard Password change</p>
                <div className="border" style={{ gap: "20px 0px" }}>
                    <DashboardAddAccount done={done} />
                </div>

            </div>
            <div className="col-12">
                <Paper sx={{ height: 270, width: '100%' }}>
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
        </>
    )
}

export default DashboardPasswordChangeComp