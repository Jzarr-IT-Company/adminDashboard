import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function EditStudentData() {

    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullName: "",
        fatherName: "",
        dob: "",
        cnic: "",
        mobile: "",
        whatsapp: "",
        email: "",
        address: "",
        emergencyContactName: "",
        emergencyContactNumber: "",
        qualification: "",
        institute: "",
        passingYear: "",
        courseName: "",
        batchTiming: "",
        admissionDate: "",
        enrollmentId: "",
        admissionStatus: "",
        totalAmount: "",
        discountedAmount: "",
        amountPaid: "",
        discount: "",
        paymentMethod: "",
        screenshot: null,
        city: "",
        religion: "",
        gender: "",
        marital_status: ""
    });

    const generateUniqueEnrollmentId = () => {
        return "ENROLL-" + Math.floor(100000 + Math.random() * 900000);
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    const fetchStudentData = async () => {
        try {
            const res = await axios.get("http://localhost:8800/getAllStudentsDatas");
            if (res.data.status === 200) {
                const filteredData = res.data.data.find((data) => data._id === id);
                if (filteredData) {
                    setFormData({
                        fullName: filteredData.fullName || "",
                        fatherName: filteredData.fatherName || "",
                        dob: filteredData.dob || "",
                        cnic: filteredData.cnic || "",
                        mobile: filteredData.mobile || "",
                        whatsapp: filteredData.whatsapp || "",
                        email: filteredData.email || "",
                        address: filteredData.address || "",
                        emergencyContactName: filteredData.emergencyContactName || "",
                        emergencyContactNumber: filteredData.emergencyContactNumber || "",
                        qualification: filteredData.qualification || "",
                        institute: filteredData.institute || "",
                        passingYear: filteredData.passingYear || "",
                        courseName: filteredData.courseName || "",
                        batchTiming: filteredData.batchTiming || "",
                        admissionDate: filteredData.admissionDate || "",
                        enrollmentId: filteredData.enrollmentId || generateUniqueEnrollmentId(),
                        admissionStatus: filteredData.admissionStatus || "",
                        totalAmount: filteredData.totalAmount || "",
                        discountedAmount: filteredData.discountedAmount || "",
                        amountPaid: filteredData.amountPaid || "",
                        discount: filteredData.discount || "",
                        paymentMethod: filteredData.paymentMethod || "",
                        screenshot: null,
                        city: filteredData.city,
                        religion: filteredData.religion,
                        gender: filteredData.gender,
                        marital_status: filteredData.marital_status
                    });
                } else {
                    toast.error("Student data not found!");
                }
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
            toast.error("Error fetching student data");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id, formData)
        try {
            const res = await axios.post(`http://localhost:8800/updateStudentData`, { id, formData });
            if (res.data.status === 200) {
                toast.success("Student data updated successfully!");
            } else {
                toast.error("Failed to update student data");
            }
        } catch (error) {
            console.error("Error updating student data:", error.message);
            toast.error("Error updating student data");
        }
    };

    const handleBack = async () => {
        window.history.back()
    }

    return (
        <div className='container mt-4'>
            <ToastContainer />
            <div className='section-heading d-flex mb-4'>
                <span className='btn btn-light' onClick={handleBack}>Back</span> <h3>Edit Data</h3>
            </div>
            <div className='row'>
                <h5>Basic Information</h5>
                <div className='col-md-6'>
                    <TextField name='fullName' onChange={handleChange} value={formData.fullName} label='Full Name *' fullWidth required />
                </div>
                <div className='col-md-6'>
                    <TextField name='fatherName' onChange={handleChange} value={formData.fatherName} label="Father's Name *" fullWidth required />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='dob' onChange={handleChange} value={formData.dob} label='Date of Birth *' type='date' fullWidth required InputLabelProps={{ shrink: true }} />
                </div>
                <div className='col-md-6'>
                    <TextField name='cnic' onChange={handleChange} value={formData.cnic} label='CNIC/B-Form Number *' fullWidth required />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='mobile' onChange={handleChange} value={formData.mobile} label='Mobile Number *' fullWidth required type='tel' />
                </div>
                <div className='col-md-6'>
                    <TextField name='whatsapp' onChange={handleChange} value={formData.whatsapp} label='WhatsApp Number' fullWidth type='tel' />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='email' onChange={handleChange} value={formData.email} label='Email Address' fullWidth type='email' required />
                </div>
                <div className='col-md-6'>
                    <TextField name='address' onChange={handleChange} value={formData.address} label='Home Address *' fullWidth required />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='city' onChange={handleChange} value={formData.city} label='City' fullWidth type='email' required />
                </div>
                <div className='col-md-6'>
                    <TextField name='religion' onChange={handleChange} value={formData.religion} label='Religion *' fullWidth required />
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='gender' onChange={handleChange} value={formData.gender} label='Gender' fullWidth type='text' required />
                </div>
                <div className='col-md-6'>
                    <TextField name='marital_status' onChange={handleChange} value={formData.marital_status} label='Marital Status *' fullWidth required />
                </div>
            </div>

            <div className='section-heading mt-5'>
                <h3>Emergency Information</h3>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='emergencyContactName' onChange={handleChange} value={formData.emergencyContactName} label='Emergency Contact Name *' fullWidth required />
                </div>
                <div className='col-md-6'>
                    <TextField name='emergencyContactNumber' onChange={handleChange} value={formData.emergencyContactNumber} label='Emergency Contact Number *' fullWidth required type='tel' />
                </div>
            </div>

            <div className='section-heading mt-5'>
                <h3>Course Information</h3>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='qualification' onChange={handleChange} value={formData.qualification} label='Last Qualification *' fullWidth required />
                </div>
                <div className='col-md-6'>
                    <TextField name='institute' onChange={handleChange} value={formData.institute} label='Institute Name *' fullWidth required />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='passingYear' onChange={handleChange} value={formData.passingYear} label='Year of Passing *' fullWidth required type='number' />
                </div>
                <div className='col-md-6'>
                    <TextField name='courseName' onChange={handleChange} value={formData.courseName} label='Course Name *' fullWidth required />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='batchTiming' onChange={handleChange} value={formData.batchTiming} label='Batch Timing *' fullWidth required />
                </div>
                <div className='col-md-6'>
                    <TextField name='admissionDate' onChange={handleChange} value={formData.admissionDate} label='Admission Date *' type='date' fullWidth required InputLabelProps={{ shrink: true }} />
                </div>
            </div>

            <div className='section-heading mt-5'>
                <h3>Enrollment Information</h3>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='enrollmentId' onChange={handleChange} value={`${formData.enrollmentId}`} label='Enrollment ID' fullWidth required disabled />
                </div>
                <div className='col-md-6'>
                    <TextField name='admissionStatus' onChange={handleChange} value={formData.admissionStatus} select label='Admission Status *' fullWidth required  >
                        <MenuItem value='pending'>Pending</MenuItem>
                        <MenuItem value='confirmed'>Confirmed</MenuItem>
                    </TextField>
                </div>
            </div>

            <div className='section-heading mt-5'>
                <h3>Payment Details</h3>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='totalAmount' onChange={handleChange} value={formData.totalAmount} label='Total Amount (PKR) ' fullWidth type='number' required disabled />
                </div>
                <div className='col-md-6'>
                    <TextField name='discountedAmount' onChange={handleChange} value={formData.discountedAmount} label='Discounted Amount (PKR) ' fullWidth type='number' required disabled />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='amountPaid' onChange={handleChange} value={formData.amountPaid} label='Amount Paid (PKR) ' fullWidth type='number' required disabled />
                </div>
                <div className='col-md-6'>
                    <TextField label='Remaining Balance' fullWidth disabled value={formData.discountedAmount - formData.amountPaid} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='discount' onChange={handleChange} value={formData.discount} label='Discount (%)' fullWidth type='number' required disabled />
                </div>
                <div className='col-md-6'>
                    <TextField name='paymentMethod' onChange={handleChange} select label='Payment Method ' fullWidth value={formData.paymentMethod} required disabled>
                        <MenuItem value='cash'>Cash</MenuItem>
                        <MenuItem value='easypaisa'>Easypaisa</MenuItem>
                        <MenuItem value='bank'>Bank Transfer</MenuItem>
                    </TextField>
                </div>
            </div>
            <div className="row mt-3">
                {formData.paymentMethod === 'cash' && (
                    <div className='col-md-6'>
                        <TextField label='Paid' value={"Paid"} fullWidth type='text' disabled />
                    </div>
                )}
                {(formData.paymentMethod === 'easypaisa' || formData.paymentMethod === 'bank') && (
                    <div className='col-md-6'>
                        <input type='file' accept='image/*' className='form-control' required disabled />
                    </div>
                )}
            </div>

            <div className='row mt-4'>
                <div className='col-md-12 text-center'>
                    <Button variant='contained' onClick={handleSubmit} fullWidth className='py-3' color='primary' size='large'>Edit</Button>
                </div>
            </div>
        </div>
    );
}

export default EditStudentData