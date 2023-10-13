const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema(
    {
        Picture: {
            type: String,
            // unique: true,
            // required: true,
        },
        Name: {
            type: String,
            required: true,
            unique: true,
        },
        Description: {
            type: String,
            required: true,
        },
        MedicinalUse: {
            type: String,
            required: true,
        },
        Price: {
            type: Number,
            required: true,
        },
        Quantity: {
            type: Number,
            required: true,
        },
        Sales: {
            type: Number,
            // required: true,
        }

    },
    { timestamps: true }
);

const Medicine = mongoose.model("medicine", medicineSchema);
module.exports = Medicine;
