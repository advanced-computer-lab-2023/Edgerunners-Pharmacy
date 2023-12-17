const Doctor = require("../Models/Doctor.js");
const Patient = require("../Models/Patient.js");
const Admin = require("../Models/Admin.js");
const { default: mongoose } = require("mongoose");
var bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

const createDoctor = async (req, res) => {
  //add a new Doctor to the database with
  //Name, Email and Age
  try {
    let doctorUsername = await Patient.findOne({ Username: req.body.Username });
    const doctorMail = await Patient.findOne({ Email: req.body.Email });
    const adminMail = await Admin.findOne({ Email: req.body.Email });
    if (!doctorUsername) {
      doctorUsername = await Admin.findOne({ Username: req.body.Username });
    }
    if (!doctorUsername && !doctorMail && !adminMail) {
      console.log(await hashPassword(req.body.Password));
      await Doctor.create({
        Username: req.body.Username,
        Password: await hashPassword(req.body.Password),
        DOB: req.body.DOB,
        Name: req.body.Name,
        Email: req.body.Email,
        Hourlyrate: req.body.Hourlyrate,
        Affiliation: req.body.Affiliation,
        Education: req.body.Education,
        Speciality: req.body.Speciality,
        Wallet: 0,
        Status: "Pending",
      });
      res.status(200).send("Created successfully");
    } else {
      if (doctorMail || adminMail) {
        res.status(401).send("e-mail already exists");
      } else {
        res.status(401).send("username already exists");
      }
    }
  } catch (e) {
    res.status(400).send("Failed to Create Doctor");
  }
};
const updateStatus = async (req, res) => {
  let user = await Doctor.updateOne(
    { Username: req.body.Username },
    { $set: { Status: req.body.Status } },
  );
  res.status(200).send("Updateed Status");
};
const viewFilesDoctor = async (req, res) => {
  try {
    const filename = req.params.filename;
    // Read the contents of the uploadDirectory
    res.status(200).download("./uploadDoctor/" + filename);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const doctorUploadFile = async (req, res) => {
  const filename = req.body.Username + "-" + ".pdf";
  console.log(req.body);
  console.log(req.files);
  const file = req.files.file;
  var filePath = "./uploadDoctor/" + filename;
  file.mv(filePath);
  let doctorUsername = await Patient.findOne({ Username: req.body.Username });
  const doctorMail = await Patient.findOne({ Email: req.body.Email });
  const adminMail = await Admin.findOne({ Email: req.body.Email });
  if (!doctorUsername) {
    doctorUsername = await Admin.findOne({ Username: req.body.Username });
  }
  console.log("I am in create");
  if (!doctorUsername && !doctorMail && !adminMail) {
    //console.log(await hashPassword(req.body.Password));
    console.log("I am in create");
    await Doctor.create({
      Username: req.body.Username,
      Password: await hashPassword(req.body.Password),
      DOB: req.body.DOB,
      Name: req.body.Name,
      Email: req.body.Email,
      Hourlyrate: req.body.Hourlyrate,
      Affiliation: req.body.Affiliation,
      Education: req.body.Education,
      Speciality: req.body.Speciality,
      Wallet: 0,
      Status: "Pending",
      FileNames: [filename],
    });
    res.status(200).send("Created successfully");
  } else {
    if (doctorMail || adminMail) {
      res.status(401).send("e-mail already exists");
    } else {
      res.status(401).send("username already exists");
    }
  }
  // res.status(400).send("Failed to Create Doctor");
  // const username = req.body.Username;
  // console.log(username);
  // const filter = {};
  // filter.Username = username;
  // const doctor = await Doctor.findOne({Username: username});
  // console.log(doctor);
};

const getPatientNames = async (req, res) => {
  try {
    const all = await Doctor.findOne({ Username: req.params.Username });
    let Patients = all.Patients;
    const tmp = [];
    for (let i = 0; i < Patients.length; ++i) {
      tmp.push({
        name: Patients[i].patient.Name,
        username: Patients[i].patient.Username,
      });
    }
    res.status(200).send(tmp);
  } catch (e) {
    res.status(400).send("Could not get patients");
  }
};

const GetWalletD = async (req, res) => {
  const user = await Doctor.findOne({ Username: req.params.username });
  const wallet = user.Wallet;
  res.status(200).json(wallet);
};

const getDoctors = async (req, res) => {
  try {
    const { Name, Speciality, Status } = req.query;
    const filter = {};
    if (Name) {
      filter.Name = Name;
    }
    if (Speciality) {
      filter.Speciality = Speciality;
    }
    if (Status) {
      filter.Status = Status;
    }
    const Doctors = await Doctor.find(filter);
    res.status(200).send(Doctors);
  } catch (e) {
    res.status(400).send("Error could not get Doctors !!");
  }
};


// const getPrescriptions = async (req, res) => {
//   try {
//     const { Date, Doctor, Status } = req.query;
//     const filter = {};
//     filter.username = req.body.username;
//     if (Date) {
//       console.log("hi");
//       filter.Date = Date + "T22:00:00.000Z";
//     }
//     if (Doctor) {
//       filter.Doctor = Doctor;
//     }
//     if (Status) {
//       filter.Status = Status;
//     }
//     const Prescription = await prescriptions.find(filter);
//     res.status(200).send(Prescription);
//   } catch (e) {
//     res.status(400).send("Error could not get Patients !!");
//   }
// };

const updateDoctor = async (req, res) => {
  //update a Doctor in the database
  const user = req.body.Username;
  console.log(req.body.Username);
  if (req.body.Email) {
    await Doctor.updateOne(
      { Username: user },
      { $set: { Email: req.body.Email } },
    );
  }
  if (req.body.Hourlyrate) {
    await Doctor.updateOne(
      { Username: user },
      { $set: { Hourlyrate: req.body.Hourlyrate } },
    );
  }
  if (req.body.Affiliation) {
    await Doctor.updateOne(
      { Username: user },
      { $set: { Affiliation: req.body.Affiliation } },
    );
  }
  if (req.body.Status) {
    if (req.body.Status === "Rejected") {
      await Doctor.deleteOne({ Username: req.body.Username });
    } else {
      await Doctor.updateOne(
        { Username: user },
        { $set: { Status: req.body.Status } },
      );
    }
  }
  res.status(200).send("Done");
};
const findDoctor = async (req, res) => {
  console.log(req.query.Username);
  const doc = await Doctor.findOne({ Username: req.query.Username });
  res.status(200).send(doc);
};


module.exports = {
  createDoctor,
  getDoctors,
  updateDoctor,
  findDoctor,
  doctorUploadFile,
  getPatientNames,
  updateStatus,
  GetWalletD,
  viewFilesDoctor,
};