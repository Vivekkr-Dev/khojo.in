//const express = require('express');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const User = require('../models/User');
//const router = express.Router();
//const nodemailer = require('nodemailer');
//
//// Send OTP
//router.post('/send-otp', async (req, res) => {
//    const { mobile } = req.body;
//
//    // Generate OTP and send via email/SMS (placeholder logic)
//    const otp = Math.floor(100000 + Math.random() * 900000).toString();
//    
//    const user = await User.findOneAndUpdate(
//        { mobile },
//        { otp, otpExpires: Date.now() + 300000 }, // OTP valid for 5 minutes
//        { new: true, upsert: true }
//    );
//
//    // Placeholder for sending OTP
//    console.log(`Sending OTP ${otp} to ${mobile}`);
//
//    res.status(200).json({ message: 'OTP sent successfully!' });
//});
//
//// Verify OTP
//router.post('/verify-otp', async (req, res) => {
//    const { mobile, otp } = req.body;
//
//    const user = await User.findOne({ mobile });
//    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
//        return res.status(400).json({ message: 'Invalid or expired OTP.' });
//    }
//
//    // OTP is valid
//    user.otp = null; // Clear OTP
//    await user.save();
//
//    res.status(200).json({ message: 'Mobile number verified successfully!' });
//});
//
//module.exports = router;


// routes/auths.js
//import express from 'express';
//
//const router = express.Router();
//
//// Define your routes here
//router.get('/', (req, res) => {
//  res.send('User routes');
//});
//
//// Export the router as the default export
//export default router
 

//backend/routes/auths.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { mobile, location } = req.body;

  try {
    const newUser = new User({ mobile, location });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// Add more routes as needed (e.g., GET, PUT, DELETE)

export default router;


