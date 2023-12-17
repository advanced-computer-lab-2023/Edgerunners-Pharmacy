const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const prescriptionsSchema = new Schema(
    {
        Patient: {
            type: String,
            required: true,
        },
        Status: {
            type: String,
            required: true,
            enum: ["Filled", "Unfilled"],
        },
        Doctor: {
            type: String,
            required: true,
        },
        Date: {
            type: Date,
            required: true,
        },
        Submitted: {
            type: Boolean,
            required: true,
            default: false,
        },
        RequiredMedicines: {
            type: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    dose: {
                        type: String,
                        required: true,
                    },
                }
            ],
        }
    },
    { timestamps: true }
);

const prescriptions = mongoose.model("prescriptions", prescriptionsSchema);
module.exports = prescriptions;