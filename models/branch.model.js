const branchSchema = new mongoose.schema({
  name: { type: String, required: true, unique: true },
  location: String,
}, { timestamps: true});




module.exports = mongoose.model('Branch', branchSchema);