import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function DashboardPhysicalAccess({done}) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handle = async () => {
        handleClose()
        if (email && password) {
            try {
                // name, email, password, phone
                axios.post('http://localhost:4040/addPhysicalClassDashboardAccessData', { name: name, email: email, password: password, phone: phone })
                    .then((res) => {
                        console.log(res)
                        if (res.data.status === 200) {
                            message.success("Account Add Successfully")
                            done()
                        }
                    }).catch(error => {
                        console.log(error)
                    })
                setEmail("")
                setPassword("")
            } catch (error) {
                console.log("ERROR", error.message)
            }
        } else {
            message.error('Empty Feild')
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add account
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="" style={{ gap: "30px 30px" }}>
                        <div className="">
                            <p>Name</p>
                            <input type="text" placeholder='Enter Name' value={name} className='form-control py-3' onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="">
                            <p>Email</p>
                            <input type="email" placeholder='example@gmail.com' value={email} className='form-control py-3' onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className="">
                            <p>passowrd</p>
                            <input type="password" placeholder='***********' value={password} className='form-control py-3 mt-3' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <div className="">
                            <p>Phone</p>
                            <input type="number" placeholder='+92 000000000' value={phone} className='form-control py-3' onChange={(e) => { setPhone(e.target.value) }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handle}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DashboardPhysicalAccess