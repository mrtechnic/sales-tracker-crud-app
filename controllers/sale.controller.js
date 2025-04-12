const Sale = require("../models/sale.model");
const Product = require("../models/product.model");

exports.createSale = async (req, res) => {
  try {
    const user = req.user;
    const { productId, soldQuantity } = req.body;

    if (!productId || !soldQuantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }


 
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    if (product.remainingStock < soldQuantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

   
    product.remainingStock -= soldQuantity;
    await product.save();

    
    const totalPrice = product.price * soldQuantity;

    
    const newSale = new Sale({
      productId,
      uploadedBy: user._id,
      soldQuantity,
      totalPrice, 
    });

    
    await newSale.save();

    
    return res.status(201).json({
      message: "Sale created successfully",
      sale: newSale,
    });
  } catch (error) {
    console.error(error);  
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getAllsales = async (req, res) => {
  try {
    const sales = await Sale.find().populate(['productId','uploadedBy' ])
    return res.status(200).json({message: 'Success', sales})
  } catch (error) {
    console.error(error);  
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
