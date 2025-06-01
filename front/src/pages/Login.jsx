import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!values.email || !values.password) {
            setMessage("Please fill all the fields");
        }
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', values);
            if (response.data.Status === "Success") {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate('/', { replace: true });
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className='registerformcontainer'>
            <div className='containers'>
                <div className='box'>
                    <div className='form-box'>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor='email'><strong>Email</strong></label>
                                <input
                                    type='email'
                                    placeholder='Enter Email'
                                    name='email'
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                    className='form-control rounded-0'
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'><strong>Password</strong></label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                                        placeholder='Enter Password'
                                        name='password'
                                        onChange={e => setValues({ ...values, password: e.target.value })}
                                        className='form-control rounded-0'
                                    />
                                    <span className="form-group" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {message && <p className='error-message'>{message}</p>}
                                <p></p>
                                <button type='submit' className='submit-btn'>Login</button>
                                <p>Don't have an account? <a href="/register" className="login-btn">Register</a></p>
                            </div>

                        </form>
                    </div>
                </div>

                <div className='logoContainer'>
                    <div>
                        <img src={Logo} alt="logo" style={{ width: '150px', height: '80px' }} />
                    </div>
                    <div>
                        <h1>Give a <span className='highlight'>Hand</span>,</h1>
                        <h1>Spread <span className='highlight'>Hope</span></h1>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;
