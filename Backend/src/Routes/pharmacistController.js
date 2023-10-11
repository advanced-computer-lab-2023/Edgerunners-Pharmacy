const Pharmacist = require("../Models/Pharmacist");
const { default: mongoose } = require("mongoose");

const createPharmacist = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age
  try {
    await Pharmacist.create({
      Username: req.body.Username,
      Password: req.body.Password,
      DOB: req.body.DOB,
      Name: req.body.Name,
      Email: req.body.Email,
      Hourlyrate: req.body.Hourlyrate,
      Affiliation: req.body.Affiliation,
      Education: req.body.Education,
    });
    res.status(200).send("Created successfully");
  } catch (e) {
    res.status(400).send("Failed to Create Pharmacist");
  }
};

const getPharmacists = async (req, res) => {
  try {
    const Pharmacists = await Pharmacist.find();
    res.status(200).send( Pharmacists);
  } catch (e) {
    res.status(400).send("Error could not get Pharmacists !!");
  }
};

const updatePharmacist = async (req, res) => {
  //update a Pharmacist in the database
  const user = req.body.Username;
  if (req.body.Email) {
    Pharmacist.updateOne({ Username: user }, { $set: { Email: req.body.Email } });
  }
  if (req.body.Hourlyrate) {
    Pharmacist.updateOne(
      { Username: user },
      { $set: { Hourlyrate: req.body.Hourlyrate } },
    );
  }
  if (req.body.Affiliation) {
    Pharmacist.updateOne(
      { Username: user },
      { $set: { Affiliation: req.body.Affiliation } },
    );
  }
};
const findPharmacist = async (req, res) => {
  if ((await Pharmacist.findOne({ Username: req.body.Username }).length) === 0) {
    res.status(300).send("User Not Found");
  } else {
    const Pharmacist = await Pharmacist.findOne({ Username: req.body.Username });
    res.status(200).send({ data: Pharmacist });
  }
};
const deletePharmacist = async (req, res) => {
  //delete a Doctor from the database
  try {
    if ((await Pharmacist.find({ Username: req.body.Username }).length) == 0) {
      res.status(300).send("User Not Found");
    } else {
      await Pharmacist.deleteOne({ Username: req.body.Username });
      res.status(200).send("Deleted successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not delete Doctor !!");
  }
};

module.exports = {
  createPharmacist,
  getPharmacists,
  updatePharmacist,
  deletePharmacist,
  findPharmacist,
};