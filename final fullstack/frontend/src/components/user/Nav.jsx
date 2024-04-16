import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
//frontend\src\components\assets\logo.png
const NavigationBar = ({ userID }) => {
    const navigate = useNavigate(); 
const handleLogout = () => {
    navigate('/'); 
  };
  const handlehome = (e) => {
    e.preventDefault()
    navigate(`/Home/${localStorage.getItem('id')}`); 
  };
  const handleRegister = (e) => {
    e.preventDefault()
    console.log()
    navigate(`/user/${localStorage.getItem('id')}/registered-events/`);
  };
  const handleComplete = () => {
    navigate(`/completed-events/${localStorage.getItem('id')}`);
  };
    return (
<div className="navbar-container">
            <nav className="navbar">
            <div className="navbar-left">
                    <img src={logo} alt="KnowleEDGE Logo" className="navbar-logo" />
                    <h3  style={{ color: 'white' }}>KnowleEdge</h3>
                </div>
                <div className="navbar-right">
                    <button onClick={(e) => handlehome(e)} className="nav-link">Home</button>
                    <button onClick={(e) => handleRegister(e)} className="nav-link">Registered Events</button>
                    <button onClick={(e) => handleComplete(e)} className="nav-link">Completed Events</button>
                    <Link to={`/profile/${localStorage.getItem('id')}`}>
                        <button className="nav-link">Profile</button>
                    </Link>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
                
            </nav>
        </div>

    );
};

export default NavigationBar;
