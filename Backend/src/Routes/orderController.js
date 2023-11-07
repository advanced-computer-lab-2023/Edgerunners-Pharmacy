const Order = require("../Models/Order");
const { default: mongoose } = require("mongoose");

const createOrder = async (req, res) => {
  try {
    await Order.create({
      id: req.body.id,
      address: req.body.address,
      payment: req.body.payment,
      status: req.body.status,
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Error could not create Order !!");
  }
};

const getOrders = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).send({ data: Orders });
  } catch (e) {
    res.status(400).send("Error could not get Orders !!");
  }
};

const updateOrder = async (req, res) => {
  //update an Order in the database
  const order = req.body.id;
  try {
    await Medicine.updateOne(
      { id: order },
      {
        $set: {
          status: req.body.status,
        },
      }
    );
    res.status(200).send("Updated Successfully");
  } catch (e) {
    res.status(400).send("Error could not update Order !!");
  }
};

const deleteOrder = async (req, res) => {
  //delete an Order from the database
  try {
    if ((await Order.find({ id: req.body.id }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Order.deleteOne({ id: req.body.id });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Order !!");
  }
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };