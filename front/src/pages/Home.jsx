import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NavLinks from '../components/NavLinks';
import backgroundImage from '../assets/Hands.avif';
import TopLink from '../components/TopLink';
import Logo from '../assets/Logo.png';
import './Home.css';

function Home() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [userType, setType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/auth')
      .then(res => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.firstName);
          setType(res.data.userType);
        } else {
          setAuth(false);
          setMessage(res.data.Error || 'An error occurred');
        }
        setLoading(false); // Set loading to false once the request completes
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can customize the loading UI
  }

  return (
    <div className='container'>
      <TopLink auth={auth} />
      <div className='contentContainer'>
        <div className='content'>
          {auth ? (
              <div className='bodys'>
                <div>
                  <NavLinks auth={auth} userType={userType} />
                </div>
                <h3>You are authorized --- {name}</h3>
                {userType === "admin" ? (
                  <div>
                    <p>This is usertype {userType}</p>
                  </div>
                ) : (
                  <div>
                    <p>This is user Type {userType}</p>
                  </div>
                )}
              </div>
          ) : (
            <div>
              <div className="home-container">
                <div className="hero-section" style={{
                  backgroundImage: `url(${backgroundImage})`
                }}>
                  <div className="hero-overlay">
                    <h1>Welcome to LinkRelief</h1>
                    <p>Your platform to help and support disaster victims in Nepal.</p>
                  </div>
                </div>

                <div className="cta-boxes">
                  <div className="cta-box">
                    <Link to="/seek-relief" className="cta-link">Seek Relief</Link>
                  </div>
                  <div className="cta-box">
                    <Link to="/help-survivors" className="cta-link">Help Survivors</Link>
                  </div>
                  <div className="cta-box">
                    <Link to="/disaster-alerts" className="cta-link">Disaster Alerts</Link>
                  </div>
                </div>

                <section className="victim-requests">
                  <h2>Recent Victim Requests</h2>
                  <div className="request-boxes">
                    <div className="request-box">
                      <h3>Food Supplies Needed</h3>
                      <p>Location: Kathmandu</p>
                      <p>Status: Urgent</p>
                    </div>
                    <div className="request-box">
                      <h3>Shelter Needed</h3>
                      <p>Location: Bhaktapur</p>
                      <p>Status: Immediate</p>
                    </div>
                    <div className="request-box">
                      <h3>Clothing Donations</h3>
                      <p>Location: Lalitpur</p>
                      <p>Status: High Priority</p>
                    </div>
                  </div>
                </section>

                <footer className="home-footer">
                  <p>&copy; 2025 LinkRelief. All rights reserved.</p>
                </footer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
