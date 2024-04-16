
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './viewreg.css';
import logo from './logo.png';
const EventDetails = () => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);
  const {eventID} = useParams(); // Destructuring eventID from useParams()
  const navigate = useNavigate(); 
  useEffect(() => {
    console.log("Hello", eventID);
    const fetchUserIDs = async () => {
      try {
        console.log("frontend-------", eventID);
        const response = await fetch(`http://localhost:4000/event/users/${eventID}`);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to fetch user IDs for event: ${response.status} ${response.statusText}`);
        }
 
        const userIDs = await response.json();
 
        const userDetailsPromises = userIDs.map(userID =>
          fetch(`http://localhost:4000/user/${userID}`).then(res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch user details for user ID ${userID}: ${res.status} ${res.statusText}`);
            }
            return res.json();
          })
        );
 
        const userDetails = await Promise.all(userDetailsPromises);
 
        setRegistrations(userDetails);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };
 
   
      fetchUserIDs();
    
  }, []);
 
  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleAddUser = () => {
    navigate('/User'); 
  };
    const handleCourseClick = () => {
    navigate('/Courses'); 
  };
  const handleCreateEventClick = () => {
    navigate('/Create'); 
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const handlehome = () => {
    navigate('/Dashboard'); 
  };

  return (
    <div>
      <div className="navbar-container">
            <nav className="navbar">
            <div className="navbar-left">
                    <img src={logo} alt="KnowleEDGE Logo" className="navbar-logo" />
                    <h3  style={{ color: 'white' }}>KnowleEdge</h3>
                </div>
                <div className="navbar-right">
                    <button href="#" className="nav-link" onClick={handlehome}>Home</button>
                    <button className="nav-link" onClick={handleAddUser}>Add User</button>
                    <button onClick={handleCreateEventClick} className="nav-link">Create Event</button>
                    <button className="nav-link" onClick={handleCourseClick}>Course</button>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
                
            </nav>
        </div>
     
      <form>
  <table>
    <thead>
      <tr>
        <th>Registrations on this event</th>
      </tr>
    </thead>
    <tbody>
      {registrations.map((user, index) => (
        <tr key={index}>
          <td>{`${user.firstName} ${user.lastName}`}</td>
        </tr>
      ))}
    </tbody>
  </table>
</form>


    </div>
  );
};
 
export default EventDetails;