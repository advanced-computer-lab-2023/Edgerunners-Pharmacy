const Admin = require("../Models/Admin");
const { default: mongoose } = require("mongoose");

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