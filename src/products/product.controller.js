const Product = require('./product.model');
const mongoose = require('mongoose');

const createProduct = async (req, res) => {
  try {
    const { title, description, category, initialStock, remainingStock, price } = req.body;

    if (!title || !description || !category || !initialStock || !remainingStock || !price) {
      return res.status(400).json({ message: 'All fields except remainingStock are required' });
    }

    const product = new Product({
      title,
      description,
      category,
      initialStock,
      remainingStock,
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
    const { title, description, category, initialStock, remainingStock, price } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        title,
        description,
        category,
        initialStock,
        remainingStock,
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
