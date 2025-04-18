const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true }, 
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, 
  role: { type: String, enum: ['admin', 'staff'], required: true }, 
}, 
{
  timestamps: true
});



userSchema.pre('save', async function (next){
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});



const User = mongoose.model('User', userSchema);

module.exports = User;
