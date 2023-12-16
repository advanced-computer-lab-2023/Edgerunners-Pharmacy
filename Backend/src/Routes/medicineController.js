const Medicine = require("../Models/Medicine");
const { default: mongoose } = require("mongoose");
const stripe = require('stripe')('sk_test_51OAYarCTaVksTfn04m2fjCWyIUscrRLMD57NmZ58DTz0O2ljqL8P42WLklVXPUZGPvmUD4hlxEkbit9nfpSPCWEB00UWnsTWUw');

const createMedicine = async (req, res) => {
  try {
    const { Name, Description, MedicinalUse, Price, Quantity, ActiveIngredient, OverTheCounter } = req.body;
    const Sales = 0;
    const Status = "Not";
    let overcounter = true;

    if (OverTheCounter === "Prescription") {
      overcounter = false;
    } else {
      overcounter = true;
    }

    const medicineData = {
      Name,
      Description,
      MedicinalUse,
      Price,
      Quantity,
      Sales,
      Status,
      ActiveIngredient,
      OverTheCounter: overcounter,
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
    const { MedicinalUse, Name, OverTheCounter } = req.query;
    const filter = {};
    if (MedicinalUse) {
      filter.MedicinalUse = MedicinalUse;
    }
    if (Name) {
      filter.Name = Name;
    }

    if (OverTheCounter !== undefined) {
      filter.OverTheCounter = OverTheCounter;
    }

    filter.Status = "Not";

    const Medicines = await Medicine.find(filter);
    res.status(200).send(Medicines);
  } catch (e) {
    res.status(400).send("Error could not get Medicines !!");
  }
};

const getMedicinesPharm = async (req, res) => {
  try {
    const Medicines = await Medicine.find();
    res.status(200).send(Medicines);
  } catch (e) {
    res.status(400).send("Error could not get Medicines !!");
  }
};

const getMedicinalUse = async (req, res) => {
  try {
    let filteruses = [];
    const medicine = await Medicine.find();

    if (medicine && medicine.length > 0) {
      filteruses = medicine[0].ArrayMedicineUse;
      res.status(200).send(filteruses);
    } else {
      res.status(404).send("No medicinal uses found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

const getActiveIngredient = async (req, res) => {
  try {
    let filteractive = [];
    const medicine = await Medicine.find();

    if (medicine && medicine.length > 0) {
      filteractive = medicine[0].ArrayActiveIngredient;
      res.status(200).send(filteractive);
    } else {
      res.status(404).send("No active ingredients found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

const setMedicinalUse = async (req, res) => {
  try {
    let filteruses = [];
    const medicine = await Medicine.find();

    if (medicine && medicine.length > 0) {
      filteruses = medicine[0].ArrayMedicineUse;
      filteruses.push(req.body);
      for (let i = 0; i < medicine.length; i++) {
        await Medicine.updateOne({ Name: medicine[i].Name }, { $set: { ArrayMedicineUse: filteruses } });
      }
      res.status(200).send(filteruses);
    } else {
      res.status(404).send("No medicinal uses found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};

const setActiveIngredient = async (req, res) => {
  try {
    let filteractive = [];
    const medicine = await Medicine.find();

    if (medicine && medicine.length > 0) {
      filteractive = medicine[0].ArrayActiveIngredient;
      filteractive.push(req.body);
      for (let i = 0; i < medicine.length; i++) {
        await Medicine.updateOne({ Name: medicine[i].Name }, { $set: { ArrayActiveIngredient: filteractive } });
      }
      res.status(200).send(filteractive);
    } else {
      res.status(404).send("No active ingredients found");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
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
    const products = await stripe.products.list({
      active: true, limit: 1000
    });
    let med = Medicine.findOne({ Name: req.body.Name });

    const product = products.data.find((p) => p.name === req.body.Name);

    const price = parseInt(req.body.Price * 100);
    if (req.body.Price !== med.Price) {
      const newPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: price,
        currency: "egp",
      });
      await stripe.products.update(product.id, {
        default_price: newPrice.id,
      });
      await stripe.prices.update(product.default_price, {
        active: false,
      });
    }
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
const archiveMedicine = async (req, res) => {
  //archive Medicine
  try {
    if ((await Medicine.find({ Name: req.body.Name })).length == 0) {
      res.status(300).send("Medicine Not Found");
    } else {
      await Medicine.updateOne({ Name: req.body.Name }, { $set: { Status: "Archived" } });
      const products = await stripe.products.list({
        active: true, limit: 1000,
      });
      const product = products.data.find((p) => p.name === req.body.Name);
      await stripe.products.update(product.id, {
        active: false,
      });
      res.status(200).send("Archived successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not archive Medicine !!");
  }
};

const unarchiveMedicine = async (req, res) => {
  //unarchive Medicine
  try {
    if ((await Medicine.find({ Name: req.body.Name })).length == 0) {
      res.status(300).send("Medicine Not Found");
    } else {
      await Medicine.updateOne({ Name: req.body.Name }, { $set: { Status: "Not" } });
      const products = await stripe.products.list({
        active: true, limit: 1000,
      });
      const product = products.data.find((p) => p.name === req.body.Name);
      await stripe.products.update(product.id, {
        active: true,
      });
      res.status(200).send("Unarchived successfully");
    }
  } catch (e) {
    res.status(400).send("Error could not unarchive Medicine !!");
  }
};

const updateQuantity = async (req, res) => {
  const name = req.body.Name;
  const taken = req.body.taken;

  try {
    const medicine = await Medicine.findOne({ Name: name });

    if (!medicine) {
      return res.status(404).send("Medicine Not Found");
    }

    let available = medicine.Quantity - taken;

    if (available >= 0) {
      const sales = (medicine.Sales || 0) + taken;

      await Medicine.updateOne(
        { Name: name },
        { Quantity: available, Sales: sales }
      );

      if (available === 0) {
        res.status(200).send("Quantity is now zero");
      } else {
        res.status(200).send("Updated successfully");
      }

    } else {
      res.status(400).send("Not enough quantity available");
    }
  } catch (e) {
    console.error(e);
    res.status(400).send("Error could not update Medicine !!");
  }
};

const reverseQuantity = async (req, res) => {
  const name = req.body.Name;
  const taken = req.body.taken;

  try {
    const medicine = await Medicine.findOne({ Name: name });

    if (!medicine) {
      return res.status(404).send("Medicine Not Found");
    }

    const available = medicine.Quantity + taken;

    let sales = medicine.Sales
    if (sales > 0) {
      sales -= taken;
    }

    await Medicine.updateOne(
      { Name: name },
      { Quantity: available, Sales: sales }
    );

    res.status(200).send("Updated successfully");

  } catch (e) {
    console.error(e);
    res.status(400).send("Error could not update Medicine !!");
  }
};

const getOneMedicine = async (req, res) => {
  const name = req.query.medicinename;
  const user = await Medicine.findOne({ Name: name });
  let overthecounter = user.OverTheCounter;
  res.status(200).json(overthecounter);
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicinesPharm,
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
};