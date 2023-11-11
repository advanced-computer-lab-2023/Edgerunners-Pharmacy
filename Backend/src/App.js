// External variables
const express = require("express");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
//var fileUpload = require("express-fileupload");
mongoose.set("strictQuery", false);
require("dotenv").config();
const { requireAuth } = require('./Middleware/authMiddleware');

//const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
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
const { protectA, protectPH, protectP, signin } = require("./Models/auth");

app.use(cors());
// app.use(
//   fileUpload({
//     createParentPath: true,
//     defCharset: "utf8",
//     defParamCharset: "utf8",
//   }),
// );

app.post("/signin", signin);
app.put("/ResetPass", ResetPass);

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
    const user = await Patient.findOne({ Username: req.body.Username });
    console.log(user);
    const storeItems = user.Cart;
    const products = await stripe.products.list({
      active: true,
    });
    
    let myPrices = [];
    for(let i =0; i< products.data.length ; i++ ){
      for(let j = 0 ; j < storeItems.length; j++){
        if(products.data[i].name === storeItems[j].medicineName){
          myPrices.push({Price :products.data[i].default_price , quantity : storeItems[j].count});
          break;
        }
      }
    }
    line_items = myPrices.map(item => {
      //const storeItem = storeItems.get(item.id)
      return {
        price :item.Price,
        quantity: item.quantity
      }
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // line_items: //req.body.items.map(item => {
      //   storeItems.map(item => {
      //   //const storeItem = storeItems.get(item.id)
      //   return {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: item.name,
      //       },
      //       unit_amount: item.priceInCents,
      //     },
      //     quantity: item.quantity,
      //   }
      // })
      line_items : line_items ,
      success_url: 'http://localhost:3000/PaymentSuccess',
      cancel_url: 'http://localhost:3000/PaymentCanceled',
    })
    res.send({ url: session.url })
  } catch (e) {
    console.log(e);
  }


  // const products = await stripe.products.list({
  //   active: true,
  // });
  // //console.log(products.data);
  // let price = null;
  // for(let i =0; i< products.data.length ; i++ ){
  //   //console.log(products.data[i]);
  //   console.log(req.body.name.name)
  //   if(products.data[i].name === req.body.name.name ){
  //     price = products.data[i].default_price; 
  //     break;
  //   }
  // }
  //   console.log(price);
  //   const session = await stripe.checkout.sessions.create({
  //     payment_method_types:["card"],
  //     mode: "payment",
  //     line_items:[{
  //       price :price,
  //       quantity: 1,
  //   }],
  //     success_url: 'http://localhost:5173/Success',
  //     cancel_url: 'http://localhost:5173/Cancel',
  //   });
  //   res.send({url: session.url})
});

/*
                                                    End of your code
*/
