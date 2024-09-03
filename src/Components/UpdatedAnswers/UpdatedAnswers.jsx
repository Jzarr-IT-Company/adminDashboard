// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// function UpdatedAnswers({ id }) {
//     const [show, setShow] = useState(false);
//     const [getAnswer, setGetAnswer] = useState('')

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//     const handle = async () => {
//         try {

//             axios.post('http://localhost:4040/updateAnswer', {
//                 id: id,
//                 answer: getAnswer
//             })
//                 .then((response) => {
//                     console.log(response.data)

//                 }).catch((error)=>{
//                     console.log("ERROR MESSAGE FROM FAQS ANSWER",error.message)
//                 })
//             handleClose()
//         } catch (error) {
//             console.log("ERROR", error.message)
//         }
//     }
//     return (
//         <>
//             <Button variant="success" onClick={handleShow}>
//                 Anwers
//             </Button>

//             <Modal
//                 show={show}
//                 onHide={handleClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Enter FAQS Answers</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <input type="text" placeholder='Enter your answer' className='form-control' onChange={(e) => { setGetAnswer(e.target.value) }} />
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handle}>Understood</Button>
//                 </Modal.Footer>
//             </Modal>        </>
//     )
// }

// export default UpdatedAnswers


import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function UpdatedAnswers({ id, onUpdate }) {
    const [show, setShow] = useState(false);
    const [getAnswer, setGetAnswer] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handle = async () => {
        try {
            const response = await axios.post('https://admin-portal-server.vercel.app/updateAnswer', {
                id: id,
                answer: getAnswer
            });

            if (response.status === 200) {
                onUpdate(id, getAnswer); // Update the answer in the parent component
                console.log(response.data);
            }
        } catch (error) {
            console.log("ERROR MESSAGE FROM FAQS ANSWER", error.message);
        } finally {
            handleClose();
        }
    };

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Answers
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Enter FAQS Answers</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        placeholder='Enter your answer'
                        className='form-control'
                        onChange={(e) => { setGetAnswer(e.target.value) }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handle}>
                        Answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdatedAnswers;
