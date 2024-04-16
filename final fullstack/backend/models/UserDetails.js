const mongoose = require('mongoose');



const userDetailSchema = new mongoose.Schema({
    userID: String,
    firstName: String,
    lastName: String,
    dob: String,
    mailID: String,
    gender: String,
    skills: String,
    experience: String,
    designation: String,
    role: String
  });
  // Model for user_details collection
  const UserDetails = mongoose.model('user_details', userDetailSchema);

  module.exports=UserDetails