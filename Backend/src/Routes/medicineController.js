const Medicine = require("../Models/Medicine");
const { default: mongoose } = require("mongoose");
const stripe = require('stripe')('sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw');

const createMedicine = async (req, res) => {
  try {
    const { Name, Description, MedicinalUse, Price, Quantity, Sales } = req.body;

    const medicineData = {
      Name,
      Description,
      MedicinalUse,
      Price,
      Quantity,
      Sales,
    };

    if (req.files && req.files.Picture) {
      const pictureFile = req.files.Picture;
      const picturePath = `./uploadMedicine/${Name}-Picture.jpg`;

      await pictureFile.mv(picturePath);
      medicineData.Picture = picturePath;
    }

    await Medicine.create(medicineData);

    const price = parseInt(req.body.Price * 100);
    await stripe.products.create({
      name: req.body.Name,
      default_price_data: {
        currency: 'egp',
        unit_amount: price
      }
      , description: "Medicine"
    })
    res.status(200).send("Created successfully");
  } catch (e) {
    console.error("Failed to create Medicine", e);
    res.status(400).send("Failed to Create Medicine");
  }
};



const getMedicines = async (req, res) => {
  try {
    const { MedicinalUse, Name } = req.query;
    const filter = {};
    if (MedicinalUse) {
      filter.MedicinalUse = MedicinalUse;
    }
    if (Name) {
      filter.Name = Name;
    }
    const Medicines = await Medicine.find(filter);
    res.status(200).send(Medicines);
  } catch (e) {
    res.status(400).send("Error could not get Medicines !!");
  }
};

const updateMedicine = async (req, res) => {
  //update a Medicine in the database
  const medicine = req.body.Name;
  try {
    await Medicine.updateOne(
      { Name: medicine },
      {
        $set: {
          Description: req.body.Description,
          Price: req.body.Price,
          MedicinalUse: req.body.MedicinalUse,
          Picture: req.body.Picture,
        },
      }
    );
    res.status(200).send("Updated Successfully");
  } catch (e) {
    res.status(400).send("Error could not update Medicine !!");
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