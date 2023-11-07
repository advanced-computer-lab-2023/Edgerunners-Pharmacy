const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchemaP = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        
        address: {
            type: String,
            required: true,
        },
        payment: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered"],
            required: true,
        },
    },
    { timestamps: true },
);

const OrderP = mongoose.model("admin", orderSchemaP);
module.exports = OrderP;