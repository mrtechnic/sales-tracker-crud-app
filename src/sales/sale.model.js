const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
  uploadedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  soldQuantity: { type: Number, required: true }, 
  date: { type: Date, default: Date.now }, 
  totalPrice: { type: Number, required: true } 
},
  {timestamps: true}
);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
