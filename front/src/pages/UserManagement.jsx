import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavLinks from '../components/NavLinks';
import TopLink from '../components/TopLink';
import Logo from '../assets/Logo.png';
import { BsPlusCircle, BsPencil, BsFillTrashFill } from 'react-icons/bs';

function UserManagement() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [userType, setType] = useState('');
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:4000/api/auth/users')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setUsers(res.data.users || []);
                    setType(res.data.userType)
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                setMessage('Failed to fetch users');
                console.log(err);
            });
    }, []);

    const handleUserUpdate = (id) => {
        navigate(`/Update/${id}`);
    };

    const handleUserDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`http://localhost:4000/api/auth/users/${id}`)
                .then(result => {
                    setUsers(users.filter(user => user.id !== id));
                })
                .catch(err => {
                    setMessage('Failed to delete user');
                    console.log(err);
                });
        }
    };

    const handleUserDeactivate = (id) => {
        const user = users.find(user => user.id === id);
        const isActivate = user.isActive === 'active' ? 'deactive' : 'active';  // Toggle the string value

        axios.put(`http://localhost:4000/api/auth/active/${id}`, { isActivate })
            .then(result => {
                // Update the users state based on the response
                setUsers(users.map(user => user.id === id ? { ...user, isActive: result.data.isActive } : user));
            })
            .catch(err => {
                setMessage('Failed to deactivate/activate user');
                console.log(err);
            });
    };





    return (
        <div className='container'>
            <TopLink auth={auth} />
            <div className='contentContainer'>
                <div className='content'>
                    <div className='bodys'>
                        <div>
                            <NavLinks auth={auth} userType={userType} />
                        </div>
                        <div className='contentContainer'>
                            {auth ? (
                                <div>
                                    <h2>User Management</h2>
                                    {/* Table to display users */}
                                    <table className="user-table">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                <th>Address</th>
                                                <th>Joined on</th>
                                                <th>isActive</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map(user => (
                                                <tr key={user.id}>
                                                    <td>{user.firstName}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.contact}</td>
                                                    <td>{user.address}</td>
                                                    <td>{user.createdAt}</td>
                                                    <td>{user.isActive ? 'Active' : 'Deactive'}</td>
                                                    <td>
                                                        <button onClick={() => handleUserUpdate(user.id)}><BsPencil /></button>
                                                        {user.isActive
                                                            ? <button onClick={() => handleUserDeactivate(user.id)}>Deactivate</button>
                                                            : <button onClick={() => handleUserDeactivate(user.id)}>Activate</button>
                                                        }

                                                        <button onClick={() => handleUserDelete(user.id)}><BsFillTrashFill /></button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div>{message}</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default UserManagement;
