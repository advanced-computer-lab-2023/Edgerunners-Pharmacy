const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchemaP = new Schema(
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
      Relations: {
        type: String,
      },
    },
    Cart: {
      type: Array,
      CartItems: {
        medicineName: String,
        count: Number,
      },
    },
    Orders: {
      type: Array,
      Status: {
        type: String,
        enum: ["Shipped", "Delievered", "Processing", "Pending"],
      },
      Cart: {
        type: Array,
      }
    }
  },
  { timestamps: true }
);

const PatientP = mongoose.model("Patient", patientSchemaP);
module.exports = PatientP;
