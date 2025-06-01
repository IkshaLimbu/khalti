import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { FaUser } from 'react-icons/fa'; 
import './TopLink.css';

function TopLink({ auth }) {

    return (
        <div className='top-content'>
            {auth ? (
                <div className='top'>
                    <div className='image'>
                        <img src={Logo} alt="logo" style={{ width: '150px', height: '80px' }} />
                    </div>

                    <div className='navigation'>
                        <Link to='/profile'>
                            <i className="fa-regular fa-user" style={{ fontSize: '30px', color: '#0F7A6E' }}><FaUser /></i>
                        </Link>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='image'>
                        <img src={Logo} alt="logo" style={{ width: '150px', height: '80px' }} />
                    </div>

                    <div className='navigation'>
                        <Link to="/" className='link' >Home</Link>
                        <Link to='/about' className='link' >About</Link>
                        <Link to='/contact' className='link'>Contact Us</Link>
                        <Link to='/login' className='link'>Login</Link>
                    </div>
                </div>
            )}
        </div>

    )
}

export default TopLink
