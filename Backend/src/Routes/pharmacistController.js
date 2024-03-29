const Pharmacist = require("../Models/Pharmacist");
const Admin = require("../Models/Admin");
const Patient = require("../Models/Patient");
const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createPharmacist = async (req, res) => {

  try {
    let adminUsername = await Admin.findOne({ Username: req.body.Username });
    let patientUsername = await Patient.findOne({ Username: req.body.Username });
    let adminEmail = await Admin.findOne({ Email: req.body.Email });
    let patientEmail = await Patient.findOne({ Email: req.body.Email });

    const wallet = 1000;
    if (adminUsername || patientUsername) {
      res.status(401).send("Username already exists");
    } else if (adminEmail || patientEmail) {
      res.status(401).send("Email already exists");
    } else {
      await Pharmacist.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        DOB: req.body.DOB,
        Name: req.body.Name,
        Email: req.body.Email,
        Hourlyrate: req.body.Hourlyrate,
        Affiliation: req.body.Affiliation,
        Education: req.body.Education,
        ReqStatus: "Pending",
        WalletValue: wallet,
      });
      res.status(200).send("Created successfully");
    }
  } catch (e) {
    res.status(400).send("Failed to Create Pharmacist");
  }
};

const uploadFile = async (req, res) => {
  try {
    const username = req.body.Username;
    let adminUsername = await Admin.findOne({ Username: req.body.Username });
    let patientUsername = await Patient.findOne({ Username: req.body.Username });
    let adminEmail = await Admin.findOne({ Email: req.body.Email });
    let patientEmail = await Patient.findOne({ Email: req.body.Email });
    let files = []
    const wallet = 1000;
    if (req.files) {
      if (req.files.idFile) {
        const idFile = req.files.idFile;
        const idFilename = `${username}-ID.pdf`;
        const idFilePath = `./uploadPharmacist/${idFilename}`;
        idFile.mv(idFilePath);
        files.push(idFilename);
      }
      if (req.files.degreeFile) {
        const degreeFile = req.files.degreeFile;
        const degreeFilename = `${username}-Degree.pdf`;
        const degreeFilePath = `./uploadPharmacist/${degreeFilename}`;
        degreeFile.mv(degreeFilePath);
        files.push(degreeFilename);
      }
      if (req.files.licenseFile) {
        const licenseFile = req.files.licenseFile;
        const licenseFilename = `${username}-License.pdf`;
        const licenseFilePath = `./uploadPharmacist/${licenseFilename}`;
        licenseFile.mv(licenseFilePath);
        files.push(licenseFilename);
      }
    }

    if (adminUsername || patientUsername) {
      res.status(401).send("Username already exists");
    } else if (adminEmail || patientEmail) {
      res.status(401).send("Email already exists");
    } else {
      await Pharmacist.create({
        Username: username,
        Password: await hashPassword(req.body.Password),
        DOB: req.body.DOB,
        Name: req.body.Name,
        Email: req.body.Email,
        Hourlyrate: req.body.Hourlyrate,
        Affiliation: req.body.Affiliation,
        Education: req.body.Education,
        ReqStatus: "Pending",
        FileNames: [files],
        WalletValue: wallet,
        // FileNames: [idFilename, degreeFilename, licenseFilename],
      });

      res.status(200).send("Created successfully");
    }

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

const getPharmacists = async (req, res) => {
  try {
    const Pharmacists = await Pharmacist.find();
    res.status(200).send(Pharmacists);
  } catch (e) {
    res.status(400).send("Error could not get Pharmacists !!");
  }
};

const updatePharmacist = async (req, res) => {
  try {
    const user = req.body.Username;
    if (req.body.Email) {
      await Pharmacist.updateOne(
        { Username: user },
        { $set: { Email: req.body.Email } }
      );
    }
    if (req.body.Hourlyrate) {
      await Pharmacist.updateOne(
        { Username: user },
        { $set: { Hourlyrate: req.body.Hourlyrate } }
      );
    }
    if (req.body.Affiliation) {
      await Pharmacist.updateOne(
        { Username: user },
        { $set: { Affiliation: req.body.Affiliation } }
      );
    }
    if (req.body.ReqStatus) {
      if (req.body.ReqStatus === "Rejected") {
        await Pharmacist.deleteOne({ Username: req.body.Username });
      } else {
        await Pharmacist.updateOne(
          { Username: user },
          { $set: { ReqStatus: req.body.ReqStatus } }
        );
      }
    }
    res.status(200).send("Updated Successfully");
  } catch (e) {
    res.status(400).send("Error could not update package !!");
  }
};

const findPharmacist = async (req, res) => {
  if (
    (await Pharmacist.findOne({ Username: req.body.Username }).length) === 0
  ) {
    res.status(300).send("User Not Found");
  } else {
    const Pharmacist = await Pharmacist.findOne({
      Username: req.body.Username,
    });
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
    res.status(400).send("Error could not delete Pharmacist !!");
  }
};

const uploadDocument = async (req, res) => {
  const username = req.body.Username;
  console.log(username);
  const filter = {};
  filter.Username = username;
  const pharm = await Pharmacist.findOne({ Username: username });
  console.log(pharm);
  const size = pharm.FileNames.length + 1;
  const filename = username + "-" + size + ".pdf";
  const file = req.files.file;
  var filePath = "./uploadPharmacist/" + filename;
  file.mv(filePath);
  await Pharmacist.updateOne(
    { Username: username },
    { $push: { FileNames: filename } },
  );
  res.status(200);
};

const viewFiles = async (req, res) => {
  try {
    const filename = req.params.filename;
    res.status(200).download("./uploadPharmacist/" + filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOnePharmacist = async (req, res) => {
  const username = req.query.username;
  const user = await Pharmacist.findOne({ Username: username });
  res.status(200).json(user);
};

const notifyOutOfStock = async (req, res) => {
  try {
    const users = await Pharmacist.find({ ReqStatus: "Accepted" });

    // Use Promise.all to wait for all promises to resolve
    await Promise.all(users.map(async (user) => {
      let notification = user.Notifications || [];
      notification.push(req.body.notifications);
      await Pharmacist.updateOne(
        { Username: user.Username },
        { $set: { Notifications: notification } },
      );
    }));

    res.status(200).send("Updated successfully");
  } catch (error) {
    res.status(400).send("Error: Could not update Pharmacist!!");
  }
};

module.exports = {
  createPharmacist,
  getPharmacists,
  updatePharmacist,
  deletePharmacist,
  findPharmacist,
  uploadDocument,
  viewFiles,
  uploadFile,
  getOnePharmacist,
  notifyOutOfStock,
};