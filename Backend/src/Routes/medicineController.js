const Medicine = require("../Models/Medicine");
const { default: mongoose } = require("mongoose");

const createMedicine = async (req, res) => {
  try {
    await Medicine.create({
      Picture: req.body.Picture,
      Name: req.body.Name,
      Description: req.body.Description,
      Price: req.body.Price,
      Quantity: req.body.Quantity,
      Sales: req.body.Sales,
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Failed to Create Medicine");
  }
};

const getMedicines = async (req, res) => {
  try {
    const Medicines = await Medicine.find();
    res.status(200).send({ data: Medicines });
  } catch (e) {
    res.status(400).send("Error could not get Medicines !!");
  }
};

const updateMedicine = async (req, res) => {
  //update a Medicine in the database
  const medicine = req.body.Name;

  if (req.body.Description) {
    Pharmacist.updateOne({ Name: medicine }, { $set: { Description: req.body.Description } });
  }
  if (req.body.Price) {
    Pharmacist.updateOne(
      { Name: medicine },
      { $set: { Price: req.body.Price } },
    );
  }
};
const findMedicine = async (req, res) => {
  if ((await Medicine.findOne({ Name: req.body.Name }).length) === 0) {
    res.status(300).send("Medicine Not Found");
  } else {
    const Medicine = await Medicine.findOne({ Name: req.body.Name });
    res.status(200).send({ data: Medicine });
  }
};
const deleteMedicine = async (req, res) => {
  //delete a Medicine from the database
  try {
    if ((await Medicine.find({ Name: req.body.Name }).length) == 0) {
      res.status(300).send("Medicine Not Found");
    } else {
      await Medicine.deleteOne({ Name: req.body.Name });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Medicine !!");
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
  findMedicine,
};