const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
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

    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
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
    EmergencyContact: {
      FullnameEC: {
        type: String,
      },
      phoneNumberEC: {
        type: String,
      },
    },
    Relations: {
      type: Array,
      required: false,
    },
    FileNames: {
      type: Array,
      required: false,
    },

    HealthRecords: {
      type: Array,
    },
    Wallet: {
      type: Number,
      required: false,
    },
    HealthPackageflag: {
      type: Boolean,
      required: false,
      default: false,
    },
    Linked: {
      type: Boolean,
      required: false,
      default: false,
    },
    Cart: {
      type: Array,
      required: false
    },
    Orders: {
      type: Array,
      required: false
    },
    Sales: {
      type: Array,
      required: false
    },
    Address: {
      type: Array,
      required: false
    },

  },
  { timestamps: true },
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;