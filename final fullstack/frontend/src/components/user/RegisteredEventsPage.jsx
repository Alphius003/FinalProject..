import React, { useState, useEffect } from 'react';
import NavigationBar from './Nav';
import './CompletedEvents.css';
const RegisteredEvents = () => {
 const [events, setEvents] = useState([]);

 useEffect(() => {
    fetch(`http://localhost:4000/register-events/${localStorage.getItem('id')}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Data received is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching registered events:', error));
 }, []);

 return (
  <div><NavigationBar/>
  <div className="event-container-1">
      
      <h2>Registered Events</h2>
      {events && events.map((event, index) => (
        <div key={index} className="event-card-1">
        <h3>{event.name}</h3>
        <p><strong>Start Date:</strong> {event.startDate}</p>
        <p><strong>End Date:</strong> {event.endDate}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Pre Requisites:</strong> {event.prerequisite}</p>
        <p><strong>Mode of Course:</strong> {event.mode}</p>
        {event.mode === "online" && <p><strong>Meeting Link:</strong> {event.meetingLink}</p>}
        {event.mode === "offline" && <p><strong>Venue:</strong> {event.venue}</p>}
        </div>
      ))}
    </div>
    </div>
 );
};

export default RegisteredEvents;
