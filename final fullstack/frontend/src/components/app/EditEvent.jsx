import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateEvent.css';

const EditEventForm = () => {
  const navigate = useNavigate();
  
  const [eventData, setEventData] = useState({
    name: '',
    duration: '',
    startDate: '',
    endDate: '',
    description: '',
    prerequisite:'',
    mode: 'Select',
    meetingLink: '',
    venue: ''
  });
  const eventId = useParams();

  useEffect(() => {
    
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/event/${eventId.eventID}`);
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setEventData(data);
        } else {
          console.error('Failed to fetch event data');
        }
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/EditEventForm/${eventId.eventID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      if (response.ok) {
        console.log('Event edited successfully');
        navigate('/Dashboard');
      } else {
        console.error('Failed to edit event');
      }
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  return (
    <div>
      <div className="navbar-container">
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Event</h2>
        <div className="form-group">
           <label>Name:</label>
           <input type="text" name="name" value={eventData.name} onChange={handleInputChange} />
        </div>
         <div className="form-group">
           <label>Start Date:</label>
           <input type="date" name="startDate" value={eventData.startDate} onChange={handleInputChange} />
         </div>
         <div className="form-group">
           <label>End Date:</label>
           <input type="date" name="endDate" value={eventData.endDate} onChange={handleInputChange} />
         </div>
         <div className="form-group">
           <label>Duration:</label>
           <input type="text" name="duration" value={eventData.duration} onChange={handleInputChange} />
         </div>
         <div className="form-group">
           <label>Description:</label>
           <textarea name="description" value={eventData.description} onChange={handleInputChange}></textarea>
         </div>
         <div className="form-group">
           <label>Pre Requisites:</label>
           <textarea name="prerequisite" value={eventData.prerequisite} onChange={handleInputChange}></textarea>
         </div>
         <div className="form-group">
           <label>Mode of Course:</label>
          <select name="mode" value={eventData.mode} onChange={handleInputChange}>
             <option>Select</option>
             <option value="online">Online</option>
             <option value="offline">Offline</option>
           </select>
         </div>
         {eventData.mode === "online" && (
          <div className="form-group">
            <label>Meeting Link:</label>
            <input type="text" name="meetingLink" value={eventData.meetingLink} onChange={handleInputChange} />
          </div>
        )}
         {eventData.mode === "offline" && (
          <div className="form-group">
            <label>Venue:</label>
            <input type="text" name="venue" value={eventData.venue} onChange={handleInputChange} />
          </div>
        )}
     
        <button type="submit"  className="form-group">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEventForm ;
