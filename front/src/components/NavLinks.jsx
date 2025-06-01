// NavLinks.js
import React from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './NavLink.css'

function NavLinks({ auth, userType }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        axios.get('http://localhost:4000/api/auth/logout')
            .then(() => {
                navigate('/login');
            }).catch(err => console.log(err));
    };

    if (!auth) {
        return null;
    }

    return (
        <nav class='navBar'>
            <ul className="nav">
                {userType === "admin" ? (
                    <>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/userManagement' ? 'active' : ''}`} to="/userManagement">User Management</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/userRequests' ? 'active' : ''}`} to="/userRequests">Users Request</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/donationTracking' ? 'active' : ''}`} to="/donationTracking">Track Donations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/disasterAlerts' ? 'active' : ''}`} to="/disasterAlerts">Disaster Alerts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/contentModeration' ? 'active' : ''}`} to="/contentModeration">Content Moderation</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/notifyAuthority' ? 'active' : ''}`} to="/notifyAuthority">Notify Authority</Link>
                        </li>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    // Non-admin navigation (for regular users)
                    <>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/createRequest' ? 'active' : ''}`} to="/createRequest">Seek Help</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/myRequests' ? 'active' : ''}`} to="/myRequests">My Requests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/myDonations' ? 'active' : ''}`} to="/myDonations">My Donations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/alertPerimeter' ? 'active' : ''}`} to="/alertPerimeter">Alert Perimeter</Link>
                        </li>
                        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavLinks;
