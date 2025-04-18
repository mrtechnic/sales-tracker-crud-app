const Product = require('../models/product.model');
const Branch = require('../models/branch.model');
const mongoose = require('mongoose');

const createProduct = async (req, res) => {
  try {

    const { title, description, category, initialStock, remainingStock, branch, price } = req.body;


    if ( title == null || description == null || category == null || initialStock == null || branch == null || price == null) {
      return res.status(400).json({ message: 'All fields except remainingStock are required' });
    }

    const existingBranch = await Branch.findById(branch);
    if (!existingBranch) {
      return res.status(400).json({ message: 'Invalid branch ID' });
    }
    console.log(existingBranch);


    
    
    const product = new Product({
      title,
      description,
      category,
      initialStock,
      remainingStock,
      branch,
      price
    });

    
    const savedProduct = await product.save();

    return res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct, 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, description, category, initialStock, remainingStock, branch, price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    if (branch) {
      const existingBranch = await Branch.findById(branch);
      if (!existingBranch) {
        return res.status(400).json({ message: 'Invalid branch' });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        category,
        initialStock,
        remainingStock,
        branch,
        price,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product deleted successfully',
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
