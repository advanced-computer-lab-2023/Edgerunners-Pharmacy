const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
  //add a new Patient to the database with
  //Name, Email and Age
  if (req.body.EmergencyContact) {
    await Patient.create({
      Username: req.body.Username,
      Password: await hashPassword(req.body.Password),
      Gender: req.body.Gender,
      Name: req.body.Name,
      Email: req.body.Email,
      phoneNumber: req.body.phoneNumber,
      DOB: req.body.DOB,
      EmergencyContact: {
        FullnameEC: req.body.EmergencyContact.FullnameEC,
        phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
        Relations: req.body.EmergencyContact.Relations
      },
    });
  } else {
    await Patient.create({
      Username: req.body.Username,
      Password: await hashPassword(req.body.Password),
      Gender: req.body.Gender,
      Name: req.body.Name,
      Email: req.body.Email,
      phoneNumber: req.body.phoneNumber,
      DOB: req.body.DOB,
    });
  }

  res.status(200).send("Created successfully");
};

const createPatient1 = async (req, res) => {
  const Password = req.body.Password;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    if (req.body.EmergencyContact) {
      const user = await Patient.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        DOB: req.body.DOB,
        EmergencyContact: {
          FullnameEC: req.body.EmergencyContact.FullnameEC,
          phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
          Relations: req.body.EmergencyContact.Relations
        },
      });
    } else {
      const user = await Patient.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        DOB: req.body.DOB,
      });
    }
    const token = createToken(user.Username);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Patient !!");
  }
};

const loginPatient = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    // Check if the user with the given username exists in the database
    const user = await Patient.findOne({ Username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If credentials are valid, create and send a new token
    const token = createToken(user.Username);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const logoutPatient = async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
}

const getPatients = async (req, res) => {
  try {
    const Patients = await Patient.find();
    res.status(200).send(Patients);
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

const ResetPass = async (req, res) => {
  const newPassword = req.query.Password;
  const email = req.params.Email;
  await Patient.updateOne(
    { Email: email },
    { $set: { Password: newPassword } },
  ).catch("An error occured");
  res.status(200).send("Password updated");
};

module.exports = { createPatient, getPatients, updatePatient, deletePatient, ResetPass };
// module.exports = { createPatient1, loginPatient, logoutPatient, getPatients, updatePatient, deletePatient };