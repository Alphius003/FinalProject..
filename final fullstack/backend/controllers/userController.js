
// const express = require("express");
// const router = express.Router();
// const UserDetails=require("../models/UserDetails");
// const EventRegistration=require("../models/eventRegistration");
// const WishlistItem=require("../models/wishListItem");
// const Event=require("../models/Event");
// const nodemailer = require('nodemailer');
// const specificUserId=
//  async (req, res) => {
//     try {
//       const userID = req.params.userID;
//       const userDetails = await UserDetails.findOne({ userID });
//       if (!userDetails) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.status(200).json(userDetails);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', 
//     auth: {
//       user: 'alphiyapaul003@gmail.com', 
//       pass: 'cpnk qtmb kllq tjoy' 
//     }
//   });
//   const sendEmail = async (recipientEmail, subject, text) => {
//     try {
//       await transporter.sendMail({
//         from: 'alphiyapaul003@gmail.com', 
//         to: recipientEmail,
//         subject: subject,
//         text: text
//       });
//       console.log('Email sent successfully');
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   };
//   // Endpoint to register an event
// const  registerEventsUserIdEventId=async(req, res) => {
//     const { eventID, userID } = req.params;
//     try {
//       const event = await Event.findById(eventID);
//       if (!event || event.capacity <= 0) {
//         return res.status(400).send('No available seats for this event');
//       }
//       event.capacity -= 1;
//       await event.save();
//       // Checking if the user is already registered for the event
//       const existingRegistration = await EventRegistration.findOne({ eventID, userID });
//       if (existingRegistration) {
//         return res.status(400).send('User already registered for this event');
//       }
//       const newEventRegistration = new EventRegistration({
//         eventID,
//         userID
//       });
//       const user = await UserDetails.findOne({ userID }); 
//       const recipientEmail = user.mailID;
  
//       await sendEmail(recipientEmail, 'Event Registration Confirmation', `You have successfully registered for the event "${event.name}"`);
//       // Saving the event registration to the database
//       await newEventRegistration.save();
//       res.status(200).send('Event registered successfully');    
//     } catch (error) {
//       console.error('Error registering event:', error);
//       res.status(500).send('Error registering event');
//     }};
//   // Endpoint to unregister an event
//  const deleteevent= async (req, res) => {
//     const { eventID, userID } = req.params;
//     try {
//       const deletedRegistration = await EventRegistration.findOneAndDelete({ eventID, userID });
//       if (!deletedRegistration) {
//         return res.status(404).send('No registration found for the user and event');
//       }
//       // event.capacity += 1;
//       const user = await UserDetails.findOne({ userID }); 
//       const recipientEmail = user.mailID;
//       const data = await sendEmail(recipientEmail, 'Event Unregistration Confirmation', 'You have successfully unregistered from the event.');
//       res.status(200).send('Event unregistered successfully');
//     } catch (error) {
//       console.error('Error unregistering event:', error);
//       res.status(500).send('Error unregistering event');
//     }
//   };

//  const registerEvents=async (req, res) => {
//     const { userID } = req.params;
//     try {
//        // Find all event registrations for the user
//        const registrations = await EventRegistration.find({ userID });
//        if (!registrations || registrations.length === 0) {
//          return res.status(404).json({ error: 'No registered events found for this user' });
//        }
   
//        // Extract event IDs from the registrations
//        const eventIDs = registrations.map(registration => registration.eventID);
   
//        // Fetch details of each event
//        const events = await Event.find({ _id: { $in: eventIDs } });
   
//        // Return the registered events
//        res.status(200).json(events);
//     } catch (error) {
//        console.error('Error fetching registered events:', error);
//        res.status(500).json({ error: 'Internal server error' });
//     }
//    };
//   // Endpoint to fetch registered events by a user
//   const fetcheventsbyuser=
//  async (req, res) => {
//     const { userID } = req.params;
//     try {
//       const registrations = await EventRegistration.find({ userID });
//       if (!registrations || registrations.length === 0) {
//         return res.status(404).json({ error: 'No registered events found for this user' });
//       }
//       const eventIDs = registrations.map(registration => registration.eventID);
  
//       // Return the event IDs as an array
//       res.status(200).json({ eventIDs });
//     } catch (error) {
//       console.error('Error fetching registered events:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
//  const completedevents=async (req, res) => {
//     try {
//        const currentDate = new Date();
//        const completedEvents = await Event.find({
//          endDate: { $lt: currentDate } // Events with endDate less than currentDate are considered completed
//        });
//        res.status(200).json(completedEvents);
//     } catch (error) {
//        console.error('Error fetching completed events:', error);
//        res.status(500).json({ error: 'Internal server error' });
//     }
//   };
//   const registrations = async (req, res) => {
//     try {
//        const eventID = req.params.eventID;
//        const registrations = await EventRegistration.find({ eventID });
//        const userIDs = registrations.map(registration => registration.userID);
//        res.status(200).json(registrations);
//     } catch (error) {
//        console.error('Error fetching registrations:', error);
//        res.status(500).json({ error: 'Internal server error' });
//     }
//    };
// //   app.use(bodyParser.json());
//   const wishlist = async (req, res) => {
//     const { userID, eventID } = req.body;
  
//     try {
//       const wishlistItem = new WishlistItem({ userID, eventID });
//       const data = await wishlistItem.save(); // Initialize data here
//       console.log("success----", data); // Log data after initialization
//       res.status(201).json({ message: 'Event added to wishlist successfully' });
//     } catch (error) {
//       console.error('Error adding event to wishlist:', error);
//       res.status(500).json({ message: 'Failed to add event to wishlist' });
//     }
//   };
//   const delwishlist = async (req, res) => {
//     const { eventID } = req.params;
//     const { userID } = req.body; 
  
//     try {
//       await WishlistItem.deleteOne({ userID, eventID });
//       res.json({ message: 'Event removed from wishlist successfully' });
//     } catch (error) {
//       console.error('Error removing event from wishlist:', error);
//       res.status(500).json({ message: 'Failed to remove event from wishlist' });
//     }
//   };
// //   app.get('/wishlist/:userID', async (req, res) => {
// //     try {
// //       const userID = req.params.userID;
// //       const wishlistItems = await WishlistItem.find({ userID: userID });
  
// //       res.json(wishlistItems);
// //     } catch (error) {
// //       console.error('Error fetching wishlisted events:', error);
// //       res.status(500).send('Error fetching wishlisted events');
// //     }
// //   });
  
//   const findUserIDsForEvent = async (eventID) => {
//     try {
//       const registrations = await EventRegistration.find({ eventID });
//       console.log("-----",registrations)
//       // Extract user IDs from registrations
//       const userIDs = registrations.map(registration => registration.userID);
//       return userIDs;
//     } catch (error) {
//       console.error('Error finding user IDs for event:', error);
//       return [];
//     }
//   };
  
//   const findID = async (req, res) => {
//     const { eventID } = req.params;
//     console.log(req.params);
//     try {
//       const userIDs = await findUserIDsForEvent(eventID);
//       console.log("User IDs:", userIDs);
//       res.json(userIDs);
//     } catch (error) {
//       console.error('Error fetching user IDs for event:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
//   module.exports={
//     specificUserId,registerEventsUserIdEventId,deleteevent,registerEvents,fetcheventsbyuser,completedevents,registrations,wishlist,delwishlist,findUserIDsForEvent,findID
//   }