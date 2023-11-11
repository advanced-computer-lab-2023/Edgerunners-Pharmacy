const Patient = require("../Models/Patient.js");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
  const wallet = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  if (req.body.EmergencyContact) {
    await Patient.create({
      Username: req.body.Username,
      Password: await hashPassword(req.body.Password),
      Gender: req.body.Gender,
      Name: req.body.Name,
      Email: req.body.Email,
      phoneNumber: req.body.phoneNumber,
      DOB: req.body.DOB,
      WalletValue: wallet,
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
      WalletValue: wallet,
    });
  }

  res.status(200).send("Created successfully");
};

const getCart = async (req, res) => {
  //const username = "abdo";
  //console.log(req.query.username);
  //console.log(req.body);
  const user = await Patient.findOne({ Username: req.query.username });

  let cart = [];
  if (user.Cart) {
    cart = user.Cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
  }
  console.log(user.Cart);
  res.status(200).send({ cart });
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
    const username = req.body.username; // Replace with the actual username
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingCartItemIndex = cart.findIndex(item => item.medicineName === orderName);
    if (existingCartItemIndex !== -1) {
      // If the medicine is already in the cart, update the quantity and price
      cart[existingCartItemIndex].count += orderQuantity;
      cart[existingCartItemIndex].price = orderPrice;
      cart[existingCartItemIndex].totalprice = orderPrice * cart[existingCartItemIndex].count;
    } else {
      // If the medicine is not in the cart, add a new entry
      cart.push({ medicineName: orderName, count: orderQuantity, price: orderPrice, totalprice: orderPrice });
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
    const orderPrice = req.body.price;
    const username = req.body.username;
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingMedicineIndex = cart.findIndex(item => item.medicineName === orderName);

    if (existingMedicineIndex !== -1) {
      cart[existingMedicineIndex].count += 1;
      cart[existingMedicineIndex].totalprice += orderPrice;
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
    const orderPrice = req.body.price;
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
        cart[existingMedicineIndex].totalprice -= orderPrice;
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

const removeFromCart = async (req, res) => {
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
      cart.splice(existingMedicineIndex, 1);
    }
    else {
      // If the medicine is not in the cart
      return res.status(404).send("Medicine not found in the cart");
    }
    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not remove medicine");
  }
}

const updateAddress = async (req, res) => {
  try {
    const username = req.body.username; // Assuming you pass the username in the request
    const state = req.body.state;
    const city = req.body.city;
    const street = req.body.street;
    const apartment = req.body.apartment;
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let address = user.Address;
    address.push({ state: state, city: city, street: street, apartment: apartment });
    await Patient.updateOne({ Username: username }, { $set: { Address: address } });
    res.status(200).send("Updated address successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not update Patient's address!!");
  }
}

const getAddress = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  //const address = user.Address;
  console.log(user);
  let address = [];
  if (user.Address) {
    address = user.Address;
  }
  res.status(200).send(address);
}

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

const getOrder = async (req,res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  console.log(user);
  let orders = [];
  if (user.Orders) {
    orders = user.Orders;
  }
  // console.log(orders);
  res.status(200).send(orders);
}

const addOrder = async (req, res) => {
  try {
    const orderAddress = req.body.orderaddress;
    const paymentMethod = req.body.paymentmethod;
    const orderStatus = "Accepted";
    const username = req.body.username; // Replace with the actual username
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let order = user.Orders || [];
    let orderid = order.length;
    order.push({ 
      orderid, cartItems: [...user.Cart], orderAddress, paymentMethod, orderStatus 
    });
    user.Cart = [];
    await Patient.updateOne({ Username: username }, { $set: { Orders: order, Cart: [] } });
    res.status(200).send("Added order successfully!");
  } catch (e) {
    res.status(400).send("Error could not add order !!");
  }
}
const cancelOrder = async (req, res) => {
  try {
    const username = req.body.username;
    const orderid = req.body.orderid;
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let order = user.Orders || [];
    const existingOrderIndex = order.findIndex(item => item.orderid === orderid);
    if(existingOrderIndex !== -1){
      order[existingOrderIndex].orderStatus = "Cancelled";
      await Patient.updateOne({ Username: username }, { $set: { Orders: order } });
    } else{
      res.status(400).send("Order not found");
    }
    res.status(200).send("Order status changed successfully!");
  } catch (e) {
    res.status(400).send("Error could not change order status !!");
  }
}

const ResetPass = async (req, res) => {
  const newPassword = req.query.Password;
  const email = req.params.Email;
  await Patient.updateOne(
    { Email: email },
    { $set: { Password: newPassword } },
  ).catch("An error occured");
  res.status(200).send("Password updated");
};

module.exports = { createPatient, getPatients, updatePatient, getCart, incrementQuantity, decrementQuantity, removeFromCart, updateAddress, getAddress, deletePatient, getOrder, addOrder, cancelOrder, ResetPass };