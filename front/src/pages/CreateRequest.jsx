import React, { useState } from "react";
import axios from "axios";
import TopLink from "../components/TopLink";
import NavLinks from "../components/NavLinks";
import { Link } from 'react-router-dom';
import './CreateRequest.css';

function CreateRequest() {
    const [auth] = useState(true);
    const [values, setValues] = useState({
        requestType: '',
        description: '',
        location: '',
        urgency: '',
        duration: '',
    });
    const [message, setMessage] = useState("");
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!values.requestType || !values.description || !values.location || !values.urgency || !values.duration) {
            setMessage("Please fill all the fields.");
            return;
        }
        console.log("Form values ", values);

        axios.post('http://localhost:4000/api/auth/createRequest', values,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(res => {
                console.log('Response: ', res.data);
                if (res.data.satus === "Success") {
                    const token = res.data.token;
                    localStorage.setItem('token', token);
                    setMessage(res.data.message);
                }
                else {
                    setMessage(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
                setMessage(err.response?.data?.message || "An error occurred. Please try again.");
            });
    }

    return (
        <div className="container">
            <TopLink auth={auth} />
            <div className="contentContainer">
                <div className="content">
                    <div className="bodys" >
                        <div>
                            <NavLinks auth={auth} />
                        </div>
                        <div className='contentContainer'>
                            <form >
                                <div className="form-group">
                                    <label htmlFor="requestType">Request Type</label>
                                    <select
                                        id="requestType"
                                        name="requestType"
                                        value={values.requestType}
                                        onChange={e => setValues({ ...values, requestType: e.target.value })}
                                        className="form-control"
                                    >
                                        <option value="">Select Request Type</option>
                                        <option value="food">Food</option>
                                        <option value="clothes">Clothes</option>
                                        <option value="money">Money</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={values.description}
                                        onChange={e => setValues({ ...values, description: e.target.value })}
                                        className="form-control"
                                        placeholder="Describe your request here..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="location">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={values.location}
                                        onChange={e => setValues({ ...values, location: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter your location"
                                    />
                                </div>

                                {/* Urgency Dropdown */}
                                <div className="form-group">
                                    <label htmlFor="urgency">Urgency</label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={values.urgency}
                                        onChange={e => setValues({ ...values, urgency: e.target.value })}
                                        className="form-control"
                                    >
                                        <option value="">Select Urgency Level</option>
                                        <option value="urgent">Urgent</option>
                                        <option value="not_urgent">Not Urgent</option>
                                    </select>
                                </div>

                                {/* Duration Input (in days) */}
                                <div className="form-group">
                                    <label htmlFor="duration">Duration (in days)</label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={values.duration}
                                        onChange={e => setValues({ ...values, duration: e.target.value })}
                                        className="form-control"
                                        placeholder="Enter duration in days"
                                    />
                                </div>

                                {message && <p className='text-danger'>{message}</p>}
                                <button type="submit" className="submit-btn">Submit</button>
                            </form>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CreateRequest;
