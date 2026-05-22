const mongoose = require("mongoose");
const tableStructure = new mongoose.Schema({
    fullname: { type: String, required: true },
    mobile: { type: String, required: true },
    city: { type: String, required: false },
    address: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
module.exports = mongoose.model("Myuser", tableStructure);