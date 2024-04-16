
const mongoose = require('mongoose');
const loginDetailSchema = new mongoose.Schema({
    userID: String,
    password: String,
    otp: Number 
  });
  const LoginDetail = mongoose.model('login_details', loginDetailSchema);
  module.exports=LoginDetail