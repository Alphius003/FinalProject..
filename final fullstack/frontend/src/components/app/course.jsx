import React, { useState, useEffect } from 'react';
import './course.css';
import logo from './logo.png';
import { useNavigate, Link } from 'react-router-dom';

const Event = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  const handleAddUser = () => {
    navigate('/User');
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleCreateEventClick = () => {
    navigate('/Create');
  };

  const handlehome = () => {
    navigate('/Dashboard');
  };
  const handleViewRegistrations = (eventID) => {
    // console.log(eventID);
    navigate(`/event/registrations/${eventID}`);
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
                    <button className="nav-link">Course</button>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
                
            </nav>
        </div>
      <div className="event-container">
        {events.map((event, index) => (
          <div key={event._id} className="event-card">
            <h3>{event.name}</h3>
            <p><strong>Start Date:</strong> {event.startDate}</p>
            <p><strong>End Date:</strong> {event.endDate}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <p><strong>Pre Requisites:</strong> {event.prerequisite}</p>
            <p><strong>Mode of Course:</strong> {event.mode}</p>
            {event.mode === "online" && <p><strong>Meeting Link:</strong> {event.meetingLink}</p>}
            {event.mode === "offline" && <p><strong>Venue:</strong> {event.venue}</p>}
            <p><strong>Remaining Seats:</strong> {event.capacity}</p>
            <div>
              <button onClick={() => handleViewRegistrations(event._id)}>View Registrations</button>

              <Link to={`/EditEventForm/${event._id}`}>
                <button className="btn" type="submit">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
