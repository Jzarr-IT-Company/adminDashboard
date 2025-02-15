import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, CircularProgress } from '@mui/material';

function DashboardAddAccount({ done }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [cnic, setCnic] = useState('');
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        setErrors({});
    };
    const handleShow = () => setShow(true);

    const validate = () => {
        let newErrors = {};

        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";

        if (!password.trim()) newErrors.password = "Password is required";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (!phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d{11}$/.test(phone)) newErrors.phone = "Invalid phone number (11 digits required)";

        if (!designation) newErrors.designation = "Designation is required";

        if (!cnic.trim()) newErrors.cnic = "CNIC is required";
        else if (!/^\d{13}$/.test(cnic)) newErrors.cnic = "Invalid CNIC (13 digits required)";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handle = async () => {
        if (!validate()) return;

        setLoading(true);
        const obj = { name, email, password, phone, designation, cnic };

        try {
            const res = await axios.post('http://localhost:8800/addStaff', {data:obj});
            
            if (res.data.status === 200) {
                message.success("Account Added Successfully");
                done();
                handleClose();
                setEmail('');
                setPassword('');
                setName('');
                setPhone('');
                setDesignation('');
                setCnic('');
            } else {
                message.error(res.data.message || "Something went wrong");
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Server error, try again later");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add account
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column gap-3">
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            fullWidth
                            onChange={(e) => setName(e.target.value)}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            label="Phone"
                            type="tel"
                            variant="outlined"
                            value={phone}
                            fullWidth
                            onChange={(e) => setPhone(e.target.value)}
                            error={!!errors.phone}
                            helperText={errors.phone}
                        />
                        <FormControl fullWidth error={!!errors.designation}>
                            <InputLabel>Designation</InputLabel>
                            <Select
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            >
                                <MenuItem value="Manager">Manager</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Staff">Staff</MenuItem>
                            </Select>
                            {errors.designation && <FormHelperText>{errors.designation}</FormHelperText>}
                        </FormControl>
                        <TextField
                            label="CNIC"
                            variant="outlined"
                            value={cnic}
                            fullWidth
                            onChange={(e) => setCnic(e.target.value)}
                            error={!!errors.cnic}
                            helperText={errors.cnic}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={loading} onClick={handle}>
                        {loading ? <CircularProgress size={24} /> : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DashboardAddAccount;
