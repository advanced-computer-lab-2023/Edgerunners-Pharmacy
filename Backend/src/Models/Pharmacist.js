const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema(
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
  },
  { timestamps: true }
);

const Pharmacist = mongoose.model("pharmacist", pharmacistSchema);
module.exports = Pharmacist;