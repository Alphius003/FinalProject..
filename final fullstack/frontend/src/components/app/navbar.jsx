
import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
const NavBar = () => {
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null); // State to keep track of the hovered event
  const navigate = useNavigate(); 

  useEffect(() => {
    // Fetch events when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:4000/events');
        if (response.ok) {
          const eventData = await response.json();
          setEvents(eventData);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

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

  // Function to handle hovering over an event
  const handleEventHover = (event) => {
    setHoveredEvent(event);
  };

  // Function to handle leaving an event
  const handleEventLeave = () => {
    setHoveredEvent(null);
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
      <div className="event-container">
        {events.map(event => (
          <div
            key={event._id}
            className="event-box"
            onMouseEnter={() => handleEventHover(event)} // Handle hover over event
            onMouseLeave={handleEventLeave} // Handle leaving event
            onClick={handleCourseClick} // Handle click event
          >
            {event.name}
            {(hoveredEvent && hoveredEvent._id === event._id) && (
              <div className="overlay">
                <div className="overlay-content">
                  <h3>{event.name}</h3>
                  <p> {event.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
