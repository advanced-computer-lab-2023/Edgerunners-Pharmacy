const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  PatientUsername: {
    type: String,
  },
  DoctorUsername: {
    type: String,
    required: true,
  },
  Messages: {
    type: Array,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

chatSchema.index(
  {
    DoctorUsername: 1,
    PatientUsername: 1,
  },
  {
    unique: true,
  },
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;