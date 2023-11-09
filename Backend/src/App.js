// External variables
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
//var fileUpload = require("express-fileupload");
mongoose.set("strictQuery", false);
require("dotenv").config();
const { requireAuth } = require('./Middleware/authMiddleware');

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const {
  createPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("./Routes/patientController");

const {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} = require("./Routes/medicineController");

const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
} = require("./Routes/adminController");

const {
  createPharmacist,
  getPharmacists,
  updatePharmacist,
  deletePharmacist,
  //uploadDocument,
} = require("./Routes/pharmacistController");

const MongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://Test1:Test1@cluster0.xo5a1to.mongodb.net/Pharmacy?retryWrites=true&w=majority";

//App variables
const app = express();
const port = process.env.PORT || 3001;
const Patient = require("./Models/Patient.js");
const Pharmacist = require("./Models/Pharmacist.js");
const Admin = require("./Models/Admin.js");
const Medicine = require("./Models/Medicine.js");
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
const cors = require("cors");
//const { protectA, protectPH, protectP, signin } = require("./Models/auth");

app.use(cors());
// app.use(
//   fileUpload({
//     createParentPath: true,
//     defCharset: "utf8",
//     defParamCharset: "utf8",
//   }),
// );

// app.post('/loginAdmin', loginAdmin)
// app.post('/loginPharm', loginPharm)
// app.post('/loginPatient', loginPatient)
// app.get('/logoutAdmin', logoutAdmin);
// app.get('/logoutPharm', logoutPharm);
// app.get('/logoutPatient', logoutPatient);

app.post("/addPatient", createPatient);
app.get("/getPatient", getPatients);
app.put("/updatePatient", updatePatient);
app.delete("/deletePatient", deletePatient);

// app.get("/getPatient", requireAuth, getPatients);
// app.delete("/deletePatient", requireAuth, deletePatient);

app.post("/addPharmacist", createPharmacist);
app.get("/getPharmacist", getPharmacists);
app.put("/updatePharmacist", updatePharmacist);
app.delete("/deletePharmacist", deletePharmacist);
//app.post("/uploadDocument", uploadDocument);

// app.get("/getPharmacist", requireAuth, getPharmacists);
// app.delete("/deletePharmacist", requireAuth, deletePharmacist);
//app.post("/uploadDocument", requireAuth, uploadDocument);

app.post("/addMedicine", createMedicine);
app.get("/getMedicine", getMedicines);
app.put("/updateMedicine", updateMedicine);
app.delete("/deleteMedicine", deleteMedicine);

// app.post("/addMedicine", requireAuth, createMedicine);
// app.get("/getMedicine", requireAuth, getMedicines);
// app.put("/updateMedicine", requireAuth, updateMedicine);
// app.delete("/deleteMedicine", requireAuth, deleteMedicine);

app.post("/addAdmin", createAdmin);
app.get("/getAdmin", getAdmins);
app.put("/updateAdmin", updateAdmin);
app.delete("/deleteAdmin", deleteAdmin);

// app.post("/addAdmin", requireAuth, createAdmin);
// app.get("/getAdmin", requireAuth, getAdmins);
// app.delete("/deleteAdmin", requireAuth, deleteAdmin);

//STRIPE ------------------------------------------------------------------------

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.SERVER_URL}/PaymentSuccess`,
      cancel_url: `${process.env.SERVER_URL}/PaymentCanceled`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

/*
                                                    End of your code
*/
