const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
    get: function (value) {
      return value.toISOString().split('T')[0];
    }
  },
  endDate: {
    type: Date,
    required: true,
    get: function (value) {
      return value.toISOString().split('T')[0];
    }
  },
  description: { type: String, required: true },
  prerequisite: { type: String, required: true  },
  mode: { type: String, required: true },
  meetingLink: { type: String },
  venue: { type: String },
  capacity: { type: Number, required: true }
//   uploads: { type: String }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
