import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; 
import './CreateEvent.css';
import logo from './logo.png';
const CreateEventForm = () => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    duration: '',
    startDate: '',
    endDate: '',
    description: '',
    prerequisite:'',
    mode: 'Select',
    meetingLink: '',
    venue: '',
    capacity:30
    // uploads: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Generate unique ID using uuidv4()
      const id = uuidv4();
      const eventWithId = { ...newEvent, id }; // Attach ID to the event object
      const response = await fetch('http://localhost:4000/CreateEventForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventWithId) // Send event with ID to the server
        
      });
  
      if (response.ok) {
        console.log('Event created successfully');
        // Handle success (e.g., redirect to dashboard)
      } else {
        console.error('Failed to create event');
        // Handle failure
      }
      
      setTimeout(() => {
        navigate('/Dashboard'); 
      }, 500);
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error
    }
  };

  // const [events] = useState([]);
  const navigate = useNavigate(); 

  const handleAddUser = () => {
    navigate('/User'); 
  };
  const handlehome = () => {
    navigate('/Dashboard');
  };

  const handleCourseClick = () => {
    navigate('/Courses'); 
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  const handleCreateEventClick = () => {
    navigate('/Create'); // Navigate to the CreateEvent page
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
  
      <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
        <div className="form-group">
           <label>Name:</label>
           <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} />
        </div>
         <div className="form-group">
           <label>Start Date:</label>
           <input type="date" name="startDate" value={newEvent.startDate} onChange={handleInputChange} />
         </div>
         <div className="form-group">
           <label>End Date:</label>
           <input type="date" name="endDate" value={newEvent.endDate} onChange={handleInputChange} />
         </div>
         <div className="form-group">
           <label>Duration:</label>
           <input type="text" name="duration" value={newEvent.duration} onChange={handleInputChange} />
         </div>
         <div className="form-group">
           <label>Description:</label>
           <textarea name="description" value={newEvent.description} onChange={handleInputChange}></textarea>
         </div>
         <div className="form-group"> 
          <label>Prerequisite:</label>
          <input type="text" name="prerequisite" value={newEvent.prerequisite} onChange={handleInputChange} />
        </div>
         <div className="form-group">
           <label>Mode of Course:</label>
          <select name="mode" value={newEvent.mode} onChange={handleInputChange}>
             <option>Select</option>
             <option value="online">Online</option>
             <option value="offline">Offline</option>
           </select>
         </div>
         {newEvent.mode === "online" && (
          <div className="form-group">
            <label>Meeting Link:</label>
            <input type="text" name="meetingLink" value={newEvent.meetingLink} onChange={handleInputChange} />
          </div>
        )}
         {newEvent.mode === "offline" && (
          <div className="form-group">
            <label>Venue:</label>
            <input type="text" name="venue" value={newEvent.venue} onChange={handleInputChange} />
          </div>
        )}
         <div className="form-group">
          <h3>Capacity: {newEvent.capacity}</h3>
      </div>
        <button className="form-group" type="submit">Create</button>
      </form>
    </div>
  );
};

export { CreateEventForm };
