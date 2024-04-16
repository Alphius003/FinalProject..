
const { Router } = require("express");

const router = Router();
const EventControl=require("../controllers/eventController")

router.put(`/EditEventForm/:eventId`,EventControl.EditForm)


  
  
  // Backend Route for resetting password
  router.post('/CreateEventForm',EventControl.createForm)

  
router.get("/events",EventControl.getEvents)
  
  
  router.get('/event/:eventId', EventControl.getSpecificEvent);


module.exports = router;