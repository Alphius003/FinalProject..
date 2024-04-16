const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();
const Event = require('./models/Event');
const LoginRoute=require("./routes/routes")
const UserDetails=require("./models/UserDetails")
const app = express();
const EventRegistration = require('./models/eventRegistration'); 
const LoginDetail=require("./models/Login")
const EventDetail=require("./routes/eventRouter")
const WishlistItem=require("./models/wishListItem");
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'alphiyapaul003@gmail.com', 
    pass: 'cpnk qtmb kllq tjoy' 
  }
});
app.use('/',LoginRoute)
app.use('/',EventDetail)

app.post('/user', async (req, res) => {
  try {
    const { userID, firstName, lastName, dob, mailID, gender, skills,experience, designation, role } = req.body;
    // Check if the user already exists
    const existingUser = await UserDetails.findOne({ userID:userID });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    let defaultPassword = '0000'; 
    const otp = Math.floor(100000 + Math.random() * 900000);
    const newUser = new UserDetails({ userID, firstName, lastName, dob, mailID, gender, skills, experience, designation, role });
    await newUser.save();
    const newLoginDetail = new LoginDetail({ userID, password: defaultPassword, otp });
    await newLoginDetail.save();
    const mailOptions = {
      from: 'alphiyapaul003@gmail.com', 
      to: mailID,
      subject: 'Change your password',
      text: `Your OTP is: ${newLoginDetail.otp}. Click on the following link to reset your password: http://localhost:3000/ResetPassword/${userID}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    res.status(200).json({ message: 'User added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/', async (req, res) => {
  try {
    const { userID, password } = req.body;
    const user = await LoginDetail.findOne({ userID, password });
    if (user) {
      const userDetails = await UserDetails.findOne({ userID });
      if (userDetails) {
        const { role } = userDetails;
        res.status(200).json({ message: 'Login successful', role });
        
      } else {
        res.status(401).json({ error: 'User details not found' });
      }
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get user details by user ID
app.get('/user/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const userDetails = await UserDetails.findOne({ userID });
    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const sendEmail = async (recipientEmail, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'alphiyapaul003@gmail.com', 
      to: recipientEmail,
      subject: subject,
      text: text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
// Endpoint to register an event
app.post("/register-events/:eventID/:userID", async (req, res) => {
  const { eventID, userID } = req.params;
  try {
    const event = await Event.findById(eventID);
    if (!event || event.capacity <= 0) {
      return res.status(400).send('No available seats for this event');
    }
    event.capacity -= 1;
    await event.save();
    // Checking if the user is already registered for the event
    const existingRegistration = await EventRegistration.findOne({ eventID, userID });
    if (existingRegistration) {
      return res.status(400).send('User already registered for this event');
    }
    const newEventRegistration = new EventRegistration({
      eventID,
      userID
    });
    const user = await UserDetails.findOne({ userID }); 
    const recipientEmail = user.mailID;

    await sendEmail(recipientEmail, 'Event Registration Confirmation', `You have successfully registered for the event "${event.name}"`);
    // Saving the event registration to the database
    await newEventRegistration.save();
    res.status(200).send('Event registered successfully');    
  } catch (error) {
    console.error('Error registering event:', error);
    res.status(500).send('Error registering event');
  }});
// Endpoint to unregister an event
app.delete("/unregister-event/:eventID/:userID", async (req, res) => {
  const { eventID, userID } = req.params;
  try {
    const deletedRegistration = await EventRegistration.findOneAndDelete({ eventID, userID });
    if (!deletedRegistration) {
      return res.status(404).send('No registration found for the user and event');
    }
    const user = await UserDetails.findOne({ userID }); 
    const recipientEmail = user.mailID;
    const data = await sendEmail(recipientEmail, 'Event Unregistration Confirmation', 'You have successfully unregistered from the event.');
    res.status(200).send('Event unregistered successfully');
  } catch (error) {
    console.error('Error unregistering event:', error);
    res.status(500).send('Error unregistering event');
  }
});
app.get('/register-events/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
     // Find all event registrations for the user
     const registrations = await EventRegistration.find({ userID });
     if (!registrations || registrations.length === 0) {
       return res.status(404).json({ error: 'No registered events found for this user' });
     }
      const eventIDs = registrations.map(registration => registration.eventID);
 
     // Fetch details of each event
     const events = await Event.find({ _id: { $in: eventIDs } });
 
     // Return the registered events
     res.status(200).json(events);
  } catch (error) {
     console.error('Error fetching registered events:', error);
     res.status(500).json({ error: 'Internal server error' });
  }
 });
// Endpoint to fetch registered events by a user
app.get('/registered-events/:userID', async (req, res) => {
  const { userID } = req.params;
  try {
    const registrations = await EventRegistration.find({ userID });
    if (!registrations || registrations.length === 0) {
      return res.status(404).json({ error: 'No registered events found for this user' });
    }
    const eventIDs = registrations.map(registration => registration.eventID);

    // Return the event IDs as an array
    res.status(200).json({ eventIDs });
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 app.get('/completed-events/', async (req, res) => {
  try {
     const currentDate = new Date();
     const completedEvents = await Event.find({
       endDate: { $lt: currentDate } // Events with endDate less than currentDate are considered completed
     });
     res.status(200).json(completedEvents);
  } catch (error) {
     console.error('Error fetching completed events:', error);
     res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/registrations/:eventID', async (req, res) => {
  try {
     const eventID = req.params.eventID;
     const registrations = await EventRegistration.find({ eventID });
     const userIDs = registrations.map(registration => registration.userID);
     res.status(200).json(registrations);
  } catch (error) {
     console.error('Error fetching registrations:', error);
     res.status(500).json({ error: 'Internal server error' });
  }
 });
app.use(bodyParser.json());
app.post('/wishlist', async (req, res) => {
  const { userID, eventID } = req.body;

  try {
    const wishlistItem = new WishlistItem({ userID, eventID });
    const data = await wishlistItem.save(); // Initialize data here
    console.log("success----", data); // Log data after initialization
    res.status(201).json({ message: 'Event added to wishlist successfully' });
  } catch (error) {
    console.error('Error adding event to wishlist:', error);
    res.status(500).json({ message: 'Failed to add event to wishlist' });
  }
});
app.delete('/wishlist/:eventID', async (req, res) => {
  const { eventID } = req.params;
  const { userID } = req.body; 

  try {
    await WishlistItem.deleteOne({ userID, eventID });
    res.json({ message: 'Event removed from wishlist successfully' });
  } catch (error) {
    console.error('Error removing event from wishlist:', error);
    res.status(500).json({ message: 'Failed to remove event from wishlist' });
  }
});
app.get('/wishlist/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const wishlistItems = await WishlistItem.find({ userID: userID });

    res.json(wishlistItems);
  } catch (error) {
    console.error('Error fetching wishlisted events:', error);
    res.status(500).send('Error fetching wishlisted events');
  }
});
// 
const findUserIDsForEvent = async (eventID) => {
  try {
    const registrations = await EventRegistration.find({ eventID });
    console.log("-----",registrations)
    // Extract user IDs from registrations
    const userIDs = registrations.map(registration => registration.userID);
    return userIDs;
  } catch (error) {
    console.error('Error finding user IDs for event:', error);
    return [];
  }
};

app.get('/event/users/:eventID', async (req, res) => {
  const { eventID } = req.params;
  console.log(req.params);
  try {
    const userIDs = await findUserIDsForEvent(eventID);
    console.log("User IDs:", userIDs);
    res.json(userIDs);
  } catch (error) {
    console.error('Error fetching user IDs for event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
