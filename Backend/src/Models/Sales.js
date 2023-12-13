const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchemaP = new Schema(
  {
    ID: {
        type: Number,
        required: true,
        unique: true,
    },
    MedicineRecord: {
        MedicineName: {
            type: Array,
        },
        SalesForMedicine: {
            type: Array,
        },
    },
    Month: {
      type: Number,
    },
  },
  { timestamps: true },
);

const SalesP = mongoose.model("sales", SalesSchemaP);
module.exports = SalesP;