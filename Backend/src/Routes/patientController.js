// #Task route solution
const Patient = require("../Models/Patient.js");
var bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  await Patient.create({
    Username: req.body.Username,
    Password: await hashPassword(req.body.Password),
    Gender: req.body.Gender,
    Name: req.body.Name,
    Email: req.body.Email,
    phoneNumber: req.body.phoneNumber,
    DOB: req.body.DOB,
    EmergencyContact: {
      FullnameEC: req.body.FullnameEC,
      phoneNumberEC: req.body.phoneNumberEC,
      Relations : req.body.Relations
    },
  });
  res.status(200).send("Created successfully");
};

const getPatients = async (req, res) => {
  try {
    const Patients = await Patient.find();
    res.status(200).send( Patients );
  } catch (e) {
    res.status(400).send("Error could not get Patients !!");
  }
};

const updatePatient = async (req, res) => {
  //update a Patient in the database
};

const deletePatient = async (req, res) => {
  //delete a Patient from the database
  try {
    if ((await Patient.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Patient.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete patient !!");
  }
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient };