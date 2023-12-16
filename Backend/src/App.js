// External variables
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
var fileUpload = require("express-fileupload");
mongoose.set("strictQuery", false);
require("dotenv").config();
// const { requireAuth } = require('./Middleware/authMiddleware');

const stripe = require('stripe')('sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw');

const {
  createPatient,
  getPatients,
  updatePatient,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  updateAddress,
  getAddress,
  deletePatient,
  ResetPass,
  getCart,
  getOrder,
  addOrder,
  cancelOrder,
  getWallet,
  getSales,
  popOrder,
  getOnePatient,
} = require("./Routes/patientController");

const {
  createMedicine,
  getMedicines,
  getMedicinalUse,
  updateMedicine,
  archiveMedicine,
  unarchiveMedicine,
  findMedicine,
  updateQuantity,
  reverseQuantity,
  getActiveIngredient,
  setMedicinalUse,
  setActiveIngredient,
  getOneMedicine,
  getMedicinesPharm,
} = require("./Routes/medicineController");

const {
  createAdmin,
  getAdmins,
  updateAdmin,
  deleteAdmin,
  getOneAdmin,
} = require("./Routes/adminController");

const {
  createPharmacist,
  getPharmacists,
  updatePharmacist,
  deletePharmacist,
  uploadDocument,
  viewFiles,
  uploadFile,
  getOnePharmacist,
  notifyOutOfStock,
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

app.use('/uploads', express.static('./uploadMedicine'));

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
const { protectA, protectPH, protectP, signin, changePassword } = require("./Models/auth");

app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
    defCharset: "utf8",
    defParamCharset: "utf8",
  }),
);

app.post("/signin", signin);
app.put("/ResetPass", ResetPass);
app.put("/changePassword", changePassword);

app.post("/addPatient", createPatient);
app.get("/getPatient", getPatients);
app.put("/updatePatient", updatePatient);
app.put("/incrementQuantity", incrementQuantity);
app.put("/removeFromCart", removeFromCart);
app.get("/getcart", getCart);
app.put('/decrementQuantity', decrementQuantity);
app.put('/updateAddress', updateAddress);
app.get('/getAddress', getAddress);
app.delete("/deletePatient", deletePatient);
app.get("/getOrder", getOrder);
app.put("/addOrder", addOrder);
app.put("/cancelOrder", cancelOrder);
app.get("/getWallet", getWallet);
app.get("/getSales", getSales);
app.put("/popOrder", popOrder);
app.get("/getOnePatient", getOnePatient);

app.post("/addPharmacist", createPharmacist);
app.post("/uploadFile", uploadFile);
app.get("/getPharmacist", getPharmacists);
app.put("/updatePharmacist", updatePharmacist);
app.put("/deletePharmacist", deletePharmacist);
app.post("/uploadDocument", uploadDocument);
app.get("/viewFiles/:filename", viewFiles);
app.get("/getOnePharmacist", getOnePharmacist);
app.put("/notifyOutOfStock", notifyOutOfStock);
app.get("/getBoolean", getOneMedicine);

app.post("/addMedicine", createMedicine);
app.get("/getMedicine", getMedicines);
app.get("/getMedicinePharm", getMedicinesPharm);
app.get("/getMedicinalUse", getMedicinalUse);
app.get("/getActiveIngredient", getActiveIngredient);
app.put("/setMedicinalUse", setMedicinalUse);
app.put("/setActiveIngredient", setActiveIngredient);
app.put("/updateMedicine", updateMedicine);
app.put("/archiveMedicine", archiveMedicine);
app.put("/unarchiveMedicine", unarchiveMedicine);
app.put("/updateQuantity", updateQuantity);
app.put("/reverseQuantity", reverseQuantity);

app.post("/addAdmin", createAdmin);
app.get("/getAdmin", getAdmins);
app.put("/updateAdmin", updateAdmin);
app.delete("/deleteAdmin", deleteAdmin);
app.get("/getOneAdmin", getOneAdmin);


//STRIPE ------------------------------------------------------------------------

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  try {
    const user = await Patient.findOne({ Username: req.body.Username });
    console.log(user);
    const storeItems = user.Cart;
    const products = await stripe.products.list({
      active: true, limit: 1000
    });

    let myPrices = [];
    for (let i = 0; i < products.data.length; i++) {
      for (let j = 0; j < storeItems.length; j++) {
        if (products.data[i].name === storeItems[j].medicineName) {
          myPrices.push({ Price: products.data[i].default_price, quantity: storeItems[j].count });
          break;
        }
      }
    }
    line_items = myPrices.map(item => {
      //const storeItem = storeItems.get(item.id)
      return {
        price: item.Price,
        quantity: item.quantity
      }
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: line_items,
      success_url: 'http://localhost:3000/PaymentSuccess',
      cancel_url: 'http://localhost:3000/PaymentCanceled',
    })
    res.send({ url: session.url })
  } catch (e) {
    console.log(e);
  }
});
