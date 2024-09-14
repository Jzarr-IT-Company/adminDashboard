import { message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from "js-cookie"

function DashboardChangeEmail() {
    const [password, setPassword] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = Cookies.get('dashId')
    const handle = async () => {
        handleClose()
        if (password) {
            try {
                axios.post('https://admin-portal-server.vercel.app/changeDahsEmail', { id, email:password })
                    .then((res) => {
                        console.log(res)
                        if (res.data.status === 200) {
                            message.success("Account Add Successfully")
                        }
                    }).catch(error => {
                        console.log(error)
                    })
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
                Change Email
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="" style={{ gap: "30px 30px" }}>
                        <div className="">
                            <p>Change Email</p>
                            <input type="email" placeholder='example@gmail.com' value={password} className='form-control py-3 mt-3' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handle}>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DashboardChangeEmail