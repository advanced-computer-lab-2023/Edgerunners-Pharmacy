const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
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

const getCart = async (req, res) => {
  const username = "abdo";
  const user = await Patient.findOne({Username:username});
  const cart = user.Cart;
  // for(let i=0; i<cart.length; i++){
  // }
  res.status(200).json({total:200,cart:cart});
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
  try {
    const orderName = req.body.medicinename;
    const orderQuantity = req.body.quantity;
    const orderPrice = req.body.price;
    const username = "abdo"; // Replace with the actual username
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingCartItemIndex = cart.findIndex(item => item.medicineName === orderName);
    if (existingCartItemIndex !== -1) {
      // If the medicine is already in the cart, update the quantity and price
      cart[existingCartItemIndex].count += orderQuantity;
      cart[existingCartItemIndex].price = orderPrice * cart[existingCartItemIndex].count;
    } else {
      // If the medicine is not in the cart, add a new entry
      cart.push({ medicineName: orderName, count: orderQuantity, price: orderPrice * orderQuantity });
    }
    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Updated cart successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not update Patient!!");
  }
};

const incrementQuantity = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const username = "abdo";
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(item => item.medicineName === orderName);

    if (existingMedicineIndex !== -1) {
      cart[existingMedicineIndex].count += 1;
      cart[existingCartItemIndex].price = orderPrice * cart[existingCartItemIndex].count;
    } else {
      return res.status(404).send("Medicine not found in the cart");
    }

    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Incremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not increment quantity");
  }
};

const decrementQuantity = async (req, res) => {
  try {
    const orderName = req.body.medicinename;
    const username = req.body.username; // Assuming you pass the username in the request

    const user = await Patient.findOne({ Username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }

    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(item => item.medicineName === orderName);

    if (existingMedicineIndex !== -1) {
      // If the medicine is found in the cart
      if (cart[existingMedicineIndex].count > 1) {
        // If the count is greater than 1, decrement the quantity
        cart[existingMedicineIndex].count -= 1;
        cart[existingCartItemIndex].price = orderPrice * cart[existingCartItemIndex].count;
      } else {
        // If the count is 1, remove the medicine from the cart
        cart.splice(existingMedicineIndex, 1);
      }
    } else {
      // If the medicine is not in the cart, you may want to handle this case
      return res.status(404).send("Medicine not found in the cart");
    }

    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not decrement quantity");
  }
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

module.exports = { createPatient, getPatients, updatePatient, getCart, incrementQuantity, decrementQuantity, deletePatient, ResetPass };