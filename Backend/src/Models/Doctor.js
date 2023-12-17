const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },

    Password: {
      type: String,
      required: true,
    },

    DOB: {
      type: Date,
      required: true,
    },

    Name: {
      type: String,
      required: true,
    },

    Email: {
      type: String,
      required: true,
      unique: true,
    },

    Hourlyrate: {
      type: Number,
      required: true,
    },

    Affiliation: {
      type: String,
      required: true,
    },

    Education: {
      type: String,
      required: true,
    },

    Patients: {
      type: Array,
      required: false,
    },
    Speciality: {
      type: String, 
      required: true
    },

    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Waiting"],
      required: true,
    },
    
    FileNames:{
      type: Array,
      required: false,
    },
    Wallet: {
      type: Number,
      required: false,
    }
  },
  { timestamps: true },
);

const Doctor = mongoose.model("doctor", doctorSchema);
module.exports = Doctor;