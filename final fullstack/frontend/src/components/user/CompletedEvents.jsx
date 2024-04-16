import React, { useState, useEffect } from 'react';
import './CompletedEvents.css';
import NavigationBar from './Nav';

const CompletedEvents = ({ userID }) => {
 const [completedEvents, setCompletedEvents] = useState([]);

 useEffect(() => {
    fetch(`http://localhost:4000/completed-events/`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCompletedEvents(data);
        } else {
          console.error('Error: Data is not an array');
        }
      })
      .catch(error => console.error('Error fetching completed events:', error));
 }, [userID]);

 return (
  <div><NavigationBar/>
  <div className="event-container-1">
      <h2>Completed Events</h2>
      
      {completedEvents.map((event, index) => (
        
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

export default CompletedEvents;
