const Admin = require("../Models/Admin");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createAdmin = async (req, res) => {
  try {
    await Admin.create({
      Username: req.body.Username,
      Password: await hashPassword(req.body.Password),
      Role: "Admin",
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Admin !!");
  }
};

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
  try {
    const username = req.body.Username;
    const email = req.body.Email;
    if ((await Admin.find({ Username: username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Admin.updateOne({ Username: username }, { $set: { Email: email} });
      res.status(200).send("Email updated successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not update email !!");
  }
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