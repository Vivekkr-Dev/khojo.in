//const mongoose = require('mongoose');
//
//const userSchema = new mongoose.Schema({
//    username: { type: String, required: true },
//    address: { type: String, required: true },
//    mobile: { type: String, required: true, unique: true },
//    otp: { type: String },
//    otpExpires: { type: Date },
//});
//
//module.exports = mongoose.model('User', userSchema);


// D:\backend\models\User.js
//import { model, Schema } from "mongoose";
//
//const userSchema = new Schema({
//  name: String,
//  email: String,
//});
//
//export default model("User", userSchema);



import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});

const User = model('User', userSchema);

export default User;


