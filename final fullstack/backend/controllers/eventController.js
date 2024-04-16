
const express = require("express");
const router = express.Router();

const Event=require("../models/Event");
const EditForm=async (req,res)=>{
    const { eventId } = req.params;
    const dataToUpdate = req.body;
   
    try {
      const response = await Event.findByIdAndUpdate(eventId, dataToUpdate, {
        new: true,
      });
      return res.send(response);
    } catch (error) {
      return res.status(500).send({ error: "Internal server error" });
    }
  }
  
  
  // Backend Route for resetting password
  
const createForm= async (req, res) => {
    try {
      console.log("new event to be saved",req.body)
      const newEvent = new Event(req.body);
      console.log(newEvent);
      newEvent.capacity = 30;
      await newEvent.save();
      res.status(201).send('Event created successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating event');
    }
  }
  const getEvents=async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching events');
    }
  }
  
const getSpecificEvent= async (req, res) => {
    const {eventId}=req.params;
    console.log("eventidvvvvvvv", eventId)
    try {
      const event = await Event.findById(eventId);
  console.log("eventtttttttttt",event)
      return res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching events');
    }
  }

  module.exports = {
    getSpecificEvent,getEvents,createForm,EditForm
  };