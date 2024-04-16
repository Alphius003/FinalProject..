const mongoose = require('mongoose');
const eventRegistrationSchema = new mongoose.Schema({
  eventID: { type: String, required: true },
  userID: { type: String, required: true }
});
const EventRegistration = mongoose.model('EventRegistration', eventRegistrationSchema);

module.exports = EventRegistration;
