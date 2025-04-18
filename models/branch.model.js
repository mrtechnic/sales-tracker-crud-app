const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: String,
}, { timestamps: true});




module.exports = mongoose.model('Branch', branchSchema);