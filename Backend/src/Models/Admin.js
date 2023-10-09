const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchemaP = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },

    Password: {
      type: String,
      required: true,
    },
    Role: {
      type: String,
    },
  },
  { timestamps: true },
);

const AdminP = mongoose.model("admin", adminSchemaP);
module.exports = AdminP;