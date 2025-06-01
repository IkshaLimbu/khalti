import React, { useState } from 'react';
import './UserRequests.css';
import ConfirmationModal from '../components/ConfirmationModal'; // Make sure you're importing correctly
import TopLink from '../components/TopLink';
import NavLinks from '../components/NavLinks';
import { NavLink } from 'react-router-dom';

function UserRequests() {
    const [auth, setAuth] = useState(true);
    const [userType, setUserType] = useState("admin");
    const [showModal, setShowModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const openModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedRequest(null);
        setShowModal(false);
    };

    const requests = [
        {
            id: 1,
            userName: "name 1",
            title: 'First Post',
            description: 'Lorem ipsum dolor sit amet...',
            status: "pending",
            createdAt: "2025/01/01",
            duration: "within 1 day",
            urgency: "very urgent",
            type: "Food",
            location: "Kerabari, 10 morang"
        },
        {
            id: 2,
            userName: "name 1",
            title: 'First Post',
            description: 'Lorem ipsum dolor sit amet...',
            status: "pending",
            createdAt: "2025/01/01",
            duration: "within 1 day",
            urgency: "very urgent",
            type: "Food",
            location: "Kerabari, 10 morang"
        },
        {
            id: 3,
            userName: "name 1",
            title: 'First Post',
            description: 'Lorem ipsum dolor sit amet...',
            status: "pending",
            createdAt: "2025/01/01",
            duration: "within 1 day",
            urgency: "very urgent",
            type: "Food",
            location: "Kerabari, 10 morang"
        },

    ];

    return (
        <div className='container'>
            <TopLink auth={auth} />
            <div className='contentContainer'>
                <div className='bodys'>
                    <div>
                        <NavLinks auth={auth} userType={userType} />
                    </div>
                    <div className='contentContainer'>
                        <div className="requests-list">
                            <h1 className="requests-list-title">Donation Requests</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Created At</th>
                                        <th>Need</th>
                                        <th>Urgency</th>
                                        <th>Status</th>
                                        <th>Location</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request.id}>
                                            <td>{request.title}</td>
                                            <td>{request.createdAt}</td>
                                            <td>{request.type}</td>
                                            <td>{request.urgency}</td>
                                            <td>{request.status}</td>
                                            <td className="description">{request.location}</td>
                                            <td>
                                                <button onClick={() => openModal(request)}>Accept</button>
                                                <button>Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Modal for confirmation */}
                            {selectedRequest && (
                                <ConfirmationModal showModal={showModal} closeModal={closeModal}>
                                    <h2>Are you sure you want to accept the request: {selectedRequest.title}?</h2>
                                    <button onClick={closeModal}>Cancel</button>
                                    <button onClick={() => {
                                        // Perform accept action here
                                        closeModal();
                                    }}>
                                        Confirm
                                    </button>
                                </ConfirmationModal>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRequests;
