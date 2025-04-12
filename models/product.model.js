const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    initialStock: { type: Number, required: true },  
    remainingStock: { type: Number, required: false, default: 0 },  
    price: { type: Number, required: true },
    branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true},
  },
  { timestamps: true }
);


productSchema.methods.updateStockAfterSale = async function (soldQuantity) {
  if (this.remainingStock >= soldQuantity) {
    this.remainingStock -= soldQuantity;
    await this.save();
  } else {
    throw new Error('Not enough stock to complete the sale');
  }
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
