import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import User from './components/user';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/app/navbar';
import { CreateEventForm as CreateEvent } from './components/app/CreateEvent';
import EventList from './components/user/Home';

import Event from './components/app/course';
import ProfileOverlay from './components/user/profile';
import RegisteredEvents from './components/user/RegisteredEventsPage';
import CompletedEvents from './components/user/CompletedEvents';
import EditEventForm from './components/app/EditEvent';
import EventDetails from './components/app/viewreg';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/ResetPassword/:userID" element={<ResetPassword />}/>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Create" element={<CreateEvent />}/>
        <Route path="/Home/:userID" element={<EventList />}/>
        <Route path="/Courses" element={<Event />}/>
        <Route path="/profile/:userID" element={<ProfileOverlay />}/>
        <Route path="/completed-events/:userID" element={<CompletedEvents />} />
        <Route path="/EditEventForm/:eventID" element={<EditEventForm />} />
        <Route path="/user/:userID/registered-events" element={<RegisteredEvents />} />
        <Route path="/event/registrations/:eventID" element={<EventDetails />} />
        
      </Routes>
    </Router>
  );
}
export default App;
