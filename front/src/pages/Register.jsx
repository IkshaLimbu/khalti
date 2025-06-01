import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../assets/Logo.png';
import axios from 'axios';

function Register() {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        address: '',
        password: '',
    });
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!values.firstName || !values.lastName || !values.email || !values.contact || !values.address || !values.password) {
            setMessage("Please fill in all fields.");
            return;
        }

        if (values.password.length < 8) {
            setMessage("Password should be at least 8 characters long");
        }
        const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*"'()+,-./:;<=>?[\]^_`{|}~])(?=.{8,})/;
        if (!passwordStrengthRegex.test(values.password)) {
            setMessage("Weak password");
        }
        console.log('Form values:', values);
        axios.post('http://localhost:4000/api/auth/register', values)
            .then(res => {
                console.log('Response:', res.data);
                if (res.data.Status === "Success") {
                    navigate('/login');
                } else {
                    setMessage(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                setMessage(err.response?.data?.message || "An error occurred. Please try again.");
            });
    };


    return (
        <div className="registerformcontainer">
            <div className='containers'>
                <div className='box'>
                    <div className="form-box">

                        <h1>Register to <span className='highlight'>LinkRelief</span></h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName"><strong>First Name</strong></label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={e => setValues({ ...values, firstName: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName"><strong>Last Name</strong></label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={e => setValues({ ...values, lastName: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"><strong>Email</strong></label>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={e => setValues({ ...values, email: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact"><strong>Contact</strong></label>
                                <input
                                    type="text"
                                    placeholder="Contact"
                                    name="contact"
                                    onChange={e => setValues({ ...values, contact: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address"><strong>Address</strong></label>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    onChange={e => setValues({ ...values, address: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"><strong>Password</strong></label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    onChange={e => setValues({ ...values, password: e.target.value })}
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    className="form-input"
                                />
                            </div>
                            {message && <p className="error-message">{message}</p>}
                            <button type="submit" className="submit-btn">Sign Up</button>
                            <p className="login-link">Already have an account?  <a href="/login" className="login-btn">Login</a></p>
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

export default Register;
