const Patient = require("../Models/Patient.js");
const Admin = require("../Models/Admin.js");
const Pharmacist = require("../Models/Pharmacist.js");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPatient = async (req, res) => {
  let adminUsername = await Admin.findOne({ Username: req.body.Username });
  let pharmacistUsername = await Pharmacist.findOne({ Username: req.body.Username });
  let adminEmail = await Admin.findOne({ Email: req.body.Email });
  let pharmacistEmail = await Pharmacist.findOne({ Email: req.body.Email });

  const wallet = 1000;
  if (adminUsername || pharmacistUsername) {
    res.status(401).send("Username already exists");
  } else if (adminEmail || pharmacistEmail) {
    res.status(401).send("Email already exists");
  } else {
    if (req.body.EmergencyContact) {
      await Patient.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        Gender: req.body.Gender,
        Name: req.body.Name,
        Email: req.body.Email,
        phoneNumber: req.body.phoneNumber,
        DOB: req.body.DOB,
        Wallet: wallet,
        EmergencyContact: {
          FullnameEC: req.body.EmergencyContact.FullnameEC,
          phoneNumberEC: req.body.EmergencyContact.phoneNumberEC,
          Relations: req.body.EmergencyContact.Relations,
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
        Wallet: wallet,
      });
    }
    res.status(200).send("Created successfully");
  }
};

const getCart = async (req, res) => {
  const user = await Patient.findOne({ Username: req.query.username });

  let cart = [];
  if (user.Cart) {
    cart = user.Cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price;
    }
  }
  // console.log(user.Cart);
  res.status(200).send({ cart });
};

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
    const username = req.body.username;
    const user = await Patient.findOne({ Username: username });
    if (!user) {
      return res.status(404).send("User not found");
    }
    let cart = user.Cart || [];
    const existingCartItemIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );
    if (existingCartItemIndex !== -1) {
      // If the medicine is already in the cart, update the quantity and price
      cart[existingCartItemIndex].count += orderQuantity;
      cart[existingCartItemIndex].price = orderPrice;
      cart[existingCartItemIndex].totalprice =
        orderPrice * cart[existingCartItemIndex].count;
    } else {
      // If the medicine is not in the cart, add a new entry
      cart.push({
        medicineName: orderName,
        count: orderQuantity,
        price: orderPrice,
        totalprice: orderPrice,
      });
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
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );

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
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );

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
    const existingMedicineIndex = cart.findIndex(
      (item) => item.medicineName === orderName
    );

    if (existingMedicineIndex !== -1) {
      cart.splice(existingMedicineIndex, 1);
    } else {
      // If the medicine is not in the cart
      return res.status(404).send("Medicine not found in the cart");
    }
    await Patient.updateOne({ Username: username }, { $set: { Cart: cart } });
    res.status(200).send("Decremented quantity successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not remove medicine");
  }
};

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
    address.push({
      state: state,
      city: city,
      street: street,
      apartment: apartment,
    });
    await Patient.updateOne(
      { Username: username },
      { $set: { Address: address } }
    );
    res.status(200).send("Updated address successfully!");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error could not update Patient's address!!");
  }
};

const getAddress = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  //const address = user.Address;
  // console.log(user);
  let address = [];
  if (user.Address) {
    address = user.Address;
  }
  res.status(200).send(address);
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

const getOrder = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  // console.log(user);
  let orders = [];
  if (user.Orders) {
    orders = user.Orders;
  }
  // console.log(orders);
  res.status(200).send(orders);
};

const addOrder = async (req, res) => {
  try {
    const orderAddress = req.body.orderaddress;
    const paymentMethod = req.body.paymentmethod;
    const orderStatus = "Accepted";
    const username = req.body.username; // Replace with the actual username
    const user = await Patient.findOne({ Username: username });
    let wallet = user.Wallet;
    if (!user) {
      return res.status(404).send("User not found");
    }
    let order = user.Orders || [];
    let orderid = order.length;
    order.push({
      orderid,
      cartItems: [...user.Cart],
      orderAddress,
      paymentMethod,
      orderStatus,
    });
    let sales = user.Sales || [];
    let salesid = sales.length;
    for (let i = 0; i < user.Cart.length; i++) {
      salesid = sales.length;
      sales.push({
        salesid,
        medicineName: user.Cart[i].medicineName,
        quantity: user.Cart[i].count,
        price: user.Cart[i].totalprice,
        date: req.body.date,
        month: req.body.month,
        orderid,
      });
    }
    const totalpricepaid = user.Cart.reduce(
      (acc, item) => acc + item.totalprice,
      0
    );
    if (wallet >= totalpricepaid && paymentMethod == "Wallet") {
      wallet -= totalpricepaid;
    }
    user.Cart = [];
    await Patient.updateOne(
      { Username: username },
      { $set: { Orders: order, Sales: sales, Cart: [], Wallet: wallet } }
    );
    res.status(200).send("Added order successfully!");
  } catch (e) {
    res.status(400).send("Error could not add order !!");
  }
};
const cancelOrder = async (req, res) => {
  try {
    const username = req.body.username;
    const orderid = req.body.orderid;
    const totalprice = req.body.totalprice;

    const user = await Patient.findOne({ Username: username });
    const wallet = user.Wallet;
    if (!user) {
      return res.status(404).send("User not found");
    }
    let sales = user.Sales || [];
    let order = user.Orders || [];
    const existingOrderIndex = order.findIndex(
      (item) => item.orderid === orderid
    );
    if (existingOrderIndex !== -1) {
      sales = sales.filter(item => item.orderid !== orderid);
      order[existingOrderIndex].orderStatus = "Cancelled";
      await Patient.updateOne(
        { Username: username },
        { $set: { Orders: order, Sales: sales, Wallet: (wallet + totalprice) } }
      );
    } else {
      res.status(400).send("Order not found");
    }
    res.status(200).send("Order status changed successfully!");
  } catch (e) {
    res.status(400).send("Error could not change order status !!");
  }
};

const popOrder = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await Patient.findOne({ Username: username });

    if (!user) {
      return res.status(404).send("User not found");
    }
    let sales = user.Sales || [];
    let order = user.Orders || [];
    const existingOrderIndex = order.length - 1;

    if (existingOrderIndex >= 0) {
      const canceledOrder = order[existingOrderIndex];
      sales = sales.filter(item => item.orderid !== canceledOrder);
      const cart = user.Cart || [];

      // Merge items from canceled order back into the cart
      canceledOrder.cartItems.forEach((item) => {
        const existingCartItemIndex = cart.findIndex(
          (cartItem) => cartItem.medicineName === item.medicineName
        );

        if (existingCartItemIndex !== -1) {
          // If the medicine is already in the cart, update the quantity
          cart[existingCartItemIndex].count += item.count;
          cart[existingCartItemIndex].totalprice += item.totalprice;
        } else {
          // If the medicine is not in the cart, add a new entry
          cart.push({ ...item });
        }
      });

      // Remove the canceled order from the order history
      order.pop();

      await Patient.updateOne(
        { Username: username },
        { $set: { Orders: order, Sales: sales, Cart: cart } }
      );
      res.status(200).send("Order status changed successfully!");
    } else {
      res.status(404).send("No order found to pop");
    }
  } catch (e) {
    res.status(400).send("Error could not change order status !!");
  }
};

const getWallet = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  // console.log(user);
  wallet = user.Wallet;
  res.status(200).json(wallet);
};

const getSales = async (req, res) => {
  try {
    const users = await Patient.find();
    let sales = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users[i].Sales.length; j++) {
        sales.push(users[i].Sales[j]);
      }
    }

    let selected = req.query.month;
    if (selected !== '')
      sales = sales.filter(item => item.month == selected);

    let name = req.query.medicinename;
    if (name !== '')
      sales = sales.filter(item => item.medicineName == name);

    let date = req.query.dateoffilter;
    if (date !== '')
      sales = sales.filter(item => item.date == date);

    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const ResetPass = async (req, res) => {
  const newPassword = req.body.Password;
  const email = req.body.Email;
  console.log(email);
  let user = await Pharmacist.findOne({ Email:email});
  if (user) {
    await Pharmacist.updateOne(
      { Email: email, ReqStatus: "Accepted" },
      { $set: { Password: await hashPassword(newPassword) } }
    ).catch("An error happened");
    res.status(200).send("all good");
        return;
  } else {
    user = await Patient.findOne({ Email: email });
    if (user) {
      await Patient.updateOne(
        { Email: email },
        { $set: { Password: await hashPassword(newPassword) } }
      ).catch("An error happened");
      res.status(200).send("all good");
        return;
    } else {
      user = await Admin.findOne({ Email: email });
      if (user) {
        await Admin.updateOne(
          { Email: email },
          { $set: { Password: await hashPassword(newPassword) } }
        ).catch("An error happened");
        res.status(200).send("all good");
        return;
      } else {
        res.status(200).send("Email not found");
        return;
      }
    }
  }
  res.status(200).send("all good");
};

const getOnePatient = async (req, res) => {
  const username = req.query.username;
  const user = await Patient.findOne({ Username: username });
  res.status(200).json(user);
};

module.exports = {
  createPatient,
  getPatients,
  updatePatient,
  getCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateAddress,
  getAddress,
  deletePatient,
  getOrder,
  addOrder,
  cancelOrder,
  popOrder,
  getWallet,
  getSales,
  ResetPass,
  getOnePatient,
};
