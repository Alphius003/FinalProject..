
const express = require("express");
const router = express.Router();
const UserDetails=require("../models/UserDetails")
const LoginDetail=require("../models/Login")
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'alphiyapaul003@gmail.com', 
      pass: 'cpnk qtmb kllq tjoy' 
    }
  });
const register = async (req, res) => {
    try {
      const { userID, firstName, lastName, dob, mailID, gender, skills,experience, designation, role } = req.body;
      const existingUser = await UserDetails.findOne({ userID });
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
  }

  const Logintothepage=async (req, res) => {
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
  }

  const ForgetPassword=async (req, res) => {
    const { userID } = req.body;
      console.log("forgot password",req.body, userID);
    try {    
      const newOTP = Math.floor(100000 + Math.random() * 900000);
      await LoginDetail.updateOne({ userID }, { otp: newOTP });
      const userDetails = await UserDetails.findOne({ userID });
      if (!userDetails) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Send email with new OTP
      const mailOptions = {
        from: 'alphiyapaul003@gmail.com',
        to: userDetails.mailID,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${newOTP}. Click on the following link to reset your password: http://localhost:3000/ResetPassword/${userID}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ error: 'Failed to send OTP email' });
        }
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'OTP sent successfully' });
      });
    } catch (error) {
      console.error('Error generating OTP:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  const ResetPassword=async (req, res) => {
  
    console.log("reset password", req.body)
    try {
      const { userID, otp, newPassword } = req.body;
      const user = await LoginDetail.findOne({userID: userID });
      if (!user) {
        console.log(user)
        return res.status(404).json({ error: 'User not found' });
      }
      // Check if the provided OTP matches the stored OTP
      const otp2=parseInt(otp,10)
      if (user.otp !== otp2) {
        console.log(user.otp,otp2)
        return res.status(400).json({ error: 'Incorrect OTP' });
      }
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports = {
    register,Logintothepage,ForgetPassword,ResetPassword
  };