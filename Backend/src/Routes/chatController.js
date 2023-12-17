const Chat = require("../Models/Chat.js");
const Doctor = require("../Models/Pharmacist.js");
const Patient = require("../Models/Patient.js");
const DDoctor = require("../Models/Doctor.js");
const { default: mongoose } = require("mongoose");

const getDoctorsChat = async (req, res) => {
  try {
    const doctors = await Doctor.find({ReqStatus:"Accepted"}).select("Username");
    console.log(doctors);
    res.status(200).send({ success: true, data: doctors });
  } catch (e) {
    res.status(400).send({ success: false });
  }
};

const getDDoctorsChat = async (req, res) => {
  try {
    const doctors = await DDoctor.find({Status:"Accepted"}).select("Username");
    console.log(doctors);
    res.status(200).send({ success: true, data: doctors });
  } catch (e) {
    res.status(400).send({ success: false });
  }
};

const getPatientsChat = async (req, res) => {
  try {
    const patients = await Patient.find().select("Username");
    res.status(200).send({ success: true, data: patients });
  } catch (e) {
    res.status(400).send({ success: false });
  }
};

const createChat = async (req, res) => {
  try {
    const DoctorUsername = req.body.DoctorUsername;
    const PatientUsername = req.body.PatientUsername;
    await Chat.create({
      DoctorUsername: DoctorUsername,
      PatientUsername: PatientUsername,
    });
    res.status(200).send({ success: true, data: messages });
  } catch (e) {
    console.log(e);
  }
};

const getChat = async (req, res) => {
  try {
    const { DoctorUsername, PatientUsername } = req.query;
    let messages = await Chat.findOne({
      DoctorUsername: DoctorUsername,
      PatientUsername: PatientUsername,
    });
    if (!messages) {
      await Chat.create({
        DoctorUsername: DoctorUsername,
        PatientUsername: PatientUsername,
      });
    }
    messages = await Chat.findOne({
      DoctorUsername: DoctorUsername,
      PatientUsername: PatientUsername,
    })
      .select("Messages")
      .sort({ timestamp: 1 });
    res.status(200).send({ success: true, data: messages });
  } catch (e) {
    console.log(e);
  }
};

const sendChatPatient = async (req, res) => {
  try {
    //const { DoctorUsername, PatientUsername, message } = req.body;
    const DoctorUsername = req.body.DoctorUsername;
    const PatientUsername = req.body.PatientUsername;
    const message = req.body.message;
    const messages = await Chat.findOne({
      DoctorUsername: DoctorUsername,
      PatientUsername: PatientUsername,
    });
    console.log(messages.Messages);
    const r = [];
    for (let i = 0; i < messages.Messages.length; ++i) {
      r.push(messages.Messages[i]);
    }
    r.push(PatientUsername + ": " + message);
    //console.log(r);
    await Chat.updateOne(
      {
        DoctorUsername: DoctorUsername,
        PatientUsername: PatientUsername,
      },
      {
        $set: {
          Messages: r,
        },
      },
    );
    res.status(200).send({ data: messages });
  } catch (e) {
    console.log(e);
  }
};

const sendChatDoctor = async (req, res) => {
  try {
    //const { DoctorUsername, PatientUsername, message } = req.body;
    const DoctorUsername = req.body.DoctorUsername;
    const PatientUsername = req.body.PatientUsername;
    const message = req.body.message;
    const messages = await Chat.findOne({
      DoctorUsername: DoctorUsername,
      PatientUsername: PatientUsername,
    });
    console.log(messages.Messages);
    const r = [];
    for (let i = 0; i < messages.Messages.length; ++i) {
      r.push(messages.Messages[i]);
    }
    r.push(DoctorUsername + ": " + message);
    //console.log(r);
    await Chat.updateOne(
      {
        DoctorUsername: DoctorUsername,
        PatientUsername: PatientUsername,
      },
      {
        $set: {
          Messages: r,
        },
      },
    );
    res.status(200).send({ data: messages });
  } catch (e) {
    console.log(e);
  }
};

const getAllChat = async (req, res) => {
  let messages = await Chat.find();
  res.status(200).send({ data: messages });
};

module.exports = {
  createChat,
  getChat,
  getPatientsChat,
  sendChatPatient,
  sendChatDoctor,
  getDoctorsChat,
  getAllChat,
  getDDoctorsChat
};