import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddStudentsFormModalCompo() {
    const initialFormData = {
        fullName: '',
        fatherName: '',
        dob: '',
        cnic: '',
        mobile: '',
        whatsapp: '',
        email: '',
        address: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        qualification: '',
        institute: '',
        passingYear: '',
        courseName: '',
        batchTiming: '',
        admissionDate: '',
        enrollmentId: '',
        admissionStatus: '',
        totalAmount: '',
        discountedAmount: '',
        amountPaid: '',
        discount: '',
        paymentMethod: '',
        screenshot: null
    };
    const [formData, setFormData] = useState(initialFormData);

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName) newErrors.fullName = "Full Name is required.";
        if (!formData.fatherName) newErrors.fatherName = "Father's Name is required.";
        if (!formData.dob) newErrors.dob = "Date of Birth is required.";
        if (!formData.cnic.match(/^\d{13}$/)) newErrors.cnic = "CNIC must be 13 digits.";
        if (!formData.mobile.match(/^\d{11}$/)) newErrors.mobile = "Mobile number must be 11 digits.";
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency Contact Name is required.";
        if (!formData.emergencyContactNumber.match(/^\d{11}$/)) newErrors.emergencyContactNumber = "Emergency Contact must be 11 digits.";
        if (!formData.qualification) newErrors.qualification = "Qualification is required.";
        if (!formData.institute) newErrors.institute = "Institute Name is required.";
        if (!formData.passingYear) newErrors.passingYear = "Passing Year is required.";
        if (!formData.courseName) newErrors.courseName = "Course Name is required.";
        if (!formData.batchTiming) newErrors.batchTiming = "Batch Timing is required.";
        if (!formData.admissionDate) newErrors.admissionDate = "Admission Date is required.";
        if (!formData.totalAmount) newErrors.totalAmount = "Total Amount is required.";
        if (!formData.admissionStatus) newErrors.admissionStatus = "Admission Status is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const existingEnrollmentIds = [];
    const generateUniqueEnrollmentId = () => {
        let newId;
        do {
            newId = Math.floor(100000 + Math.random() * 900000);
        } while (existingEnrollmentIds.includes(newId));
        return `Enrollment ID-${newId}`;
    };
    useEffect(() => {
        const uniqueId = generateUniqueEnrollmentId();
        setFormData({ ...formData, enrollmentId: uniqueId });
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBack = () => {
        window.history.back();
        window.scroll(0, 0);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            alert("Form submitted successfully!");
            console.log(formData);
            setFormData(initialFormData);
            handleBack();
        }
    };

    return (
        <div className='container mt-4'>
            <div className='section-heading d-flex mb-4'>
                <span className='btn btn-light' onClick={handleBack}>Back</span> <h3>Basic Information</h3>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <TextField name='fullName' onChange={handleChange} value={formData.fullName} label='Full Name *' fullWidth required error={!!errors.fullName} helperText={errors.fullName} />
                </div>
                <div className='col-md-6'>
                    <TextField name='fatherName' onChange={handleChange} value={formData.fatherName} label="Father's Name *" fullWidth required error={!!errors.fatherName} helperText={errors.fatherName} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='dob' onChange={handleChange} value={formData.dob} label='Date of Birth *' type='date' fullWidth required InputLabelProps={{ shrink: true }} error={!!errors.dob} helperText={errors.dob} />
                </div>
                <div className='col-md-6'>
                    <TextField name='cnic' onChange={handleChange} value={formData.cnic} label='CNIC/B-Form Number *' fullWidth required error={!!errors.cnic} helperText={errors.cnic} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='mobile' onChange={handleChange} value={formData.mobile} label='Mobile Number *' fullWidth required error={!!errors.mobile} helperText={errors.mobile} type='tel' />
                </div>
                <div className='col-md-6'>
                    <TextField name='whatsapp' onChange={handleChange} value={formData.whatsapp} label='WhatsApp Number' fullWidth type='tel' />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='email' onChange={handleChange} value={formData.email} label='Email Address' fullWidth type='email' required error={!!errors.email} helperText={errors.email} />
                </div>
                <div className='col-md-6'>
                    <TextField name='address' onChange={handleChange} value={formData.address} label='Home Address *' fullWidth required error={!!errors.address} helperText={errors.address} />
                </div>
            </div>

            <div className='section-heading mt-5'>
                <h3>Emergency Information</h3>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='emergencyContactName' onChange={handleChange} value={formData.emergencyContactName} label='Emergency Contact Name *' fullWidth required error={!!errors.emergencyContactName} helperText={errors.emergencyContactName} />
                </div>
                <div className='col-md-6'>
                    <TextField name='emergencyContactNumber' onChange={handleChange} value={formData.emergencyContactNumber} label='Emergency Contact Number *' fullWidth required error={!!errors.emergencyContactNumber} helperText={errors.emergencyContactNumber} type='tel' />
                </div>
            </div>

            <div className='section-heading mt-5'>
                <h3>Course Information</h3>
            </div>
            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='qualification' onChange={handleChange} value={formData.qualification} label='Last Qualification *' fullWidth required error={!!errors.qualification} helperText={errors.qualification} />
                </div>
                <div className='col-md-6'>
                    <TextField name='institute' onChange={handleChange} value={formData.institute} label='Institute Name *' fullWidth required error={!!errors.institute} helperText={errors.institute} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='passingYear' onChange={handleChange} value={formData.passingYear} label='Year of Passing *' fullWidth required error={!!errors.passingYear} helperText={errors.passingYear} type='number' />
                </div>
                <div className='col-md-6'>
                    <TextField name='courseName' onChange={handleChange} value={formData.courseName} label='Course Name *' fullWidth required error={!!errors.courseName} helperText={errors.courseName} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='batchTiming' onChange={handleChange} value={formData.batchTiming} label='Batch Timing *' fullWidth required error={!!errors.batchTiming} helperText={errors.batchTiming} />
                </div>
                <div className='col-md-6'>
                    <TextField name='admissionDate' onChange={handleChange} value={formData.admissionDate} label='Admission Date *' type='date' fullWidth required error={!!errors.admissionDate} helperText={errors.admissionDate} InputLabelProps={{ shrink: true }} />
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
                    <TextField name='admissionStatus' onChange={handleChange} value={formData.admissionStatus} select label='Admission Status *' fullWidth required error={!!errors.admissionStatus} helperText={errors.admissionStatus}>
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
                    <TextField name='totalAmount' onChange={handleChange} value={formData.totalAmount} label='Total Amount (PKR) ' fullWidth type='number' />
                </div>
                <div className='col-md-6'>
                    <TextField name='discountedAmount' onChange={handleChange} value={formData.discountedAmount} label='Discounted Amount (PKR) ' fullWidth type='number' />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='amountPaid' onChange={handleChange} value={formData.amountPaid} label='Amount Paid (PKR) ' fullWidth type='number' />
                </div>
                <div className='col-md-6'>
                    <TextField label='Remaining Balance' fullWidth disabled value={formData.totalAmount - formData.amountPaid} />
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-md-6'>
                    <TextField name='discount' onChange={handleChange} value={formData.discount} label='Discount (%)' fullWidth type='number' />
                </div>
                <div className='col-md-6'>
                    <TextField name='paymentMethod' onChange={handleChange} select label='Payment Method ' fullWidth value={formData.paymentMethod}>
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
                        <input type='file' accept='image/*' onChange={handleScreenshotUpload} className='form-control' />
                    </div>
                )}
            </div>

            <div className='row mt-4'>
                <div className='col-md-12 text-center'>
                    <Button variant='contained' onClick={handleSubmit} fullWidth className='py-3' color='primary' size='large'>Submit</Button>
                </div>
            </div>
        </div>
    );
}

export default AddStudentsFormModalCompo;