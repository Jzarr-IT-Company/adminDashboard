import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AccessBtn from '../AccessBtn/AccessBtn';
function PaymnetDetail({ data }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log("DATA",data)

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                View Detail
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={data.image} className='img-fluid' alt="" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleClose}>
                        <AccessBtn id={data.id} coursesname={data.coursesname} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PaymnetDetail