// External variables
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("./Routes/patientController");
const MongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://Abdo486A:Boody2002@aclapibackend.xla3vza.mongodb.net/";

//App variables
const app = express();
const port = process.env.PORT || 3001;
const Patient = require("./Models/Patient.js");
// #Importing the patientController

// configurations
// Mongo DB

mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// #Routing to PatientController here

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/addPatient", createPatient);
app.get("/getPatient", getPatients);
app.put("/updatePatient", updatePatient);
app.delete("/deletePatient", deletePatient);

// app.post("/addDoctor", createDoctor);
// app.get("/getDoctor", getDoctors);
// app.put("/updateDoctor", updateDoctor);
// app.delete("/deleteDoctor", deleteDoctor);

/*
                                                    End of your code
*/
