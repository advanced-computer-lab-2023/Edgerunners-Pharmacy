// #Task route solution
const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age

  await Patient.create({
    Username: req.body.username,
    Password: req.body.password,
    Gender: req.body.gender,
    Name: req.body.name,
    Email: req.body.email,
    phoneNumber: req.body.phonenumber,
    DOB: req.body.dob,
    EmergencyContact: {
      FullnameEC: req.body.fullnameec,
      phoneNumberEC: req.body.phonenumberec,
    },
  });
  res.status(200).send("Created successfully");
};

const getPatients = async (req, res) => {
  const Patients = await Patient.find();
  res.status(200).send({ data: Patients });
};

const updatePatient = async (req, res) => {
  //update a Patient in the database
};

const deletePatient = async (req, res) => {
  //delete a Patient from the database
  await Patient.deleteMany();
  res.status(200).send("Deleted successfully");
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient };
