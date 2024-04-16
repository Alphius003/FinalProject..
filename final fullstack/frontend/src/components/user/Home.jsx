import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './Nav';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const { userID } = useParams();
  const [wishlistedEvents, setWishlistedEvents] = useState([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlistedEvents');
    if (storedWishlist) {
      setWishlistedEvents(JSON.parse(storedWishlist));
    }
  }, []);
  const addToWishlist = async (eventID) => {
    try {
      const response = await fetch(`http://localhost:4000/wishlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: userID, eventID: eventID })
      });
  
      if (response.ok) {
        const updatedWishlistedEvents = [...wishlistedEvents, eventID];
        setWishlistedEvents(updatedWishlistedEvents);
        localStorage.setItem('wishlistedEvents', JSON.stringify(updatedWishlistedEvents));
        toast.success('Event added to wishlist successfully');
      } else {
        throw new Error('Failed to add event to wishlist');
      }
    } catch (error) {
      console.error('Error adding event to wishlist:', error);
      toast.error('Failed to add event to wishlist');
    }
  };
  
  const removeFromWishlist = async (eventID) => {
    try {
      const response = await fetch(`http://localhost:4000/wishlist/${eventID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: userID })
      });
  
      if (response.ok) {
        const updatedWishlistedEvents = wishlistedEvents.filter(id => id !== eventID);
        setWishlistedEvents(updatedWishlistedEvents);
        localStorage.setItem('wishlistedEvents', JSON.stringify(updatedWishlistedEvents));
        toast.success('Event removed from wishlist successfully');
      } else {
        throw new Error('Failed to remove event from wishlist');
      }
    } catch (error) {
      console.error('Error removing event from wishlist:', error);
      toast.error('Failed to remove event from wishlist');
    }
  };
  
  

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
  const fetchRegisteredEvents = async () => {
    try {
      const response = await fetch(`http://localhost:4000/registered-events/${userID}`);
      if (response.ok) {
        const data = await response.json();
        setRegisteredEvents(data.eventIDs);
        localStorage.setItem('registeredEvents', JSON.stringify(data.eventIDs));
      } else if (response.status === 404) {
        setRegisteredEvents([]); 
        localStorage.removeItem('registeredEvents'); 
      } else {
        console.error('Failed to fetch registered events');
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
    }
    console.log("abc:", registeredEvents)
  };
  useEffect(() => {
    
      fetchRegisteredEvents();
    }, [userID]);
   useEffect(() => {
    const storedEvents = localStorage.getItem('registeredEvents');
    if (storedEvents) {
       setRegisteredEvents(JSON.parse(storedEvents));
    }
    
   }, []);
      
   const handleEventAction = async (eventID) => {
    try {
       const isRegistered = registeredEvents.includes(eventID);
      
       const response = await fetch(`http://localhost:4000/${isRegistered ? 'unregister-event' : 'register-events'}/${eventID}/${userID}`, {
         method: isRegistered ? 'DELETE' : 'POST',
       });
   
       if (response.ok) {
         let updatedRegisteredEvents;
         if (isRegistered) {
           updatedRegisteredEvents = registeredEvents.filter(id => id !== eventID);
           toast.success('Event unregistered successfully');
         } else {
           updatedRegisteredEvents = [...registeredEvents, eventID];
           toast.success('Event registered successfully');
         }
         setRegisteredEvents(updatedRegisteredEvents);
         localStorage.setItem('registeredEvents', JSON.stringify(updatedRegisteredEvents));
       } else {
         throw new Error(isRegistered ? 'Failed to unregister event' : 'Failed to register event');
       }
    } catch (error) {
       console.error('Error handling event action:', error);
       toast.error('You already Registered!');
    }
   };
   
  return (
    <div>
      <NavigationBar userID={userID} registeredEvents={registeredEvents} />
      <div className="event-container">
        {events.map((event, index) => (
          <div key={index} className="event-card">
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
            <button 
            className={`form-group ${registeredEvents.includes(event._id) ? 'unregister-button' : 'register-button'}`}
            type="submit" onClick={() => handleEventAction(event._id)}>
                {registeredEvents && registeredEvents.includes(event._id) ? 'Unregister' : 'Register'}
            </button>
            <button
  className={`form-group ${wishlistedEvents.includes(event._id) ? 'wishlisted-button' : 'wishlist-button'}`}
  type="button"
  onClick={() => {
    if (wishlistedEvents.includes(event._id)) {
      removeFromWishlist(event._id);
    } else {
      addToWishlist(event._id);
    }
  }}>
  {wishlistedEvents.includes(event._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
</button>


            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EventList;
