// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//     password: { type: String, required: true }, // NOTE: select:false mat lagana abhi
//     role: { type: String, enum: ["admin", "user", "view"], default: "user" },
//     profileImage: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user", "view"], default: "user" },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
