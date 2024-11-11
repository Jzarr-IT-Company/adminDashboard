import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../Context/Context';

function Login() {
    const {userToken, setUserToken,
        userId, setUserId}=useGlobalState()
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:4040/dashboardLoginPasswordCheck', { password:password, email:email });
            
            if (response.data.status === 200) {
                alert("SUUCESSFULLY")
                setUserToken( response.data.token)
                Cookies.set('dashId', response.data.id);
                Cookies.set('dashToken', response.data.token);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data.status === 404) {
                console.error("ERROR FROM ADMIN DASHBOARD", error.response.data.message);
            } else {
                console.error("An error occurred while logging in", error);
            }
        }
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center border" style={{ height: "100vh" }}>
                <div className="col-lg-5 col-md-7 col-sm-12">
                    <div className='mb-5 d-flex justify-content-center align-items-center'>
                        <img src={logo} width={200} alt="Logo" />
                    </div>
                    <div>
                        <label htmlFor="email" className="visually-hidden">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Enter Email'
                            className='form-control py-3 mb-5'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password" className="visually-hidden">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter Password'
                            className='form-control py-3 mb-5'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='btn btn-success w-100' onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
