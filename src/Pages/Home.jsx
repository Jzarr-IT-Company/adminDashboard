import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar/Navbar"
import axios from "axios"
import PaymnetDetail from "../Components/PaymnetDetail/PaymnetDetail"
import { Image } from "antd"
import AccessBtn from "../Components/AccessBtn/AccessBtn"

function Home() {
    const [getPaymentDetails, setGetPaymentDetails] = useState([])
    useEffect(() => {
        axios('http://localhost:8888/getPaymentDetail')
            .then(async (res) => {
                setGetPaymentDetails(res.data.response)
                console.log("PAYMENT DATA", res.data.response)
            })
    }, [])
    const [modalImage, setModalImage] = useState('');

    const handleImageClick = (imageSrc) => {
        setModalImage(imageSrc); // Set the image source for the modal
    };
    return (
        <>
            <div className="sticky-top">
                <Navbar />
            </div>
            <div className="container bordre mt-5">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-border">
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>Courses</th>
                                    <th>Ammount</th>
                                    <th>payment Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getPaymentDetails.map((data, index) => {
                                        console.log(data)
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.coursesname}</td>
                                                    <td>{data.amount}</td>
                                                    <td>
                                                        <Image.PreviewGroup
                                                            preview={{
                                                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                                            }}
                                                        >
                                                            <Image width={70} src={data.image} />
                                                        </Image.PreviewGroup>
                                                        {/* <img src={data.image} width={40} alt="" /> */}
                                                    </td>
                                                    <td style={{ gap: "10px" }}>
                                                        <PaymnetDetail data={data} />
                                                        {/* <AccessBtn data={data} /> */}
                                                        <button className="btn btn-danger">Denied</button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home