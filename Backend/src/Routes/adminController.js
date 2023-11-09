const Admin = require("../Models/Admin");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const createAdmin = async (req, res) => {
  try {
    await Admin.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Role: "Admin",
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Admin !!");
  }
};

const createAdmin1 = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(Password, salt);
    const user = await Admin.create({ Username: Username, Password: hashedPassword, Role: "Admin" });
    const token = createToken(user.Username);

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Admin !!");
  }
};

const loginAdmin = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    // Check if the user with the given username exists in the database
    const user = await Admin.findOne({ Username });

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

const logoutAdmin = async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
}

const getAdmins = async (req, res) => {
  try {
    const Admins = await Admin.find();
    res.status(200).send({ data: Admins });
  } catch (e) {
    res.status(400).send("Error could not get Admins !!");
  }
};

const updateAdmin = async (req, res) => {
  //update a Doctor in the database
};

const deleteAdmin = async (req, res) => {
  //delete a Doctor from the database
  try {
    if ((await Admin.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Admin.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Admin !!");
  }
};

module.exports = { createAdmin, getAdmins, updateAdmin, deleteAdmin };
// module.exports = { createAdmin1, loginAdmin, logoutAdmin, getAdmins, updateAdmin, deleteAdmin };