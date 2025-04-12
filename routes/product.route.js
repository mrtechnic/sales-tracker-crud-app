const express = require('express');
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,} = require('../controllers/product.controller');
const router = express.Router();

router.post('/products', createProduct);

router.get('/products', getAllProducts);

router.get('/products/:productId', getProductById);

router.put('/products/:productId', updateProduct);

router.delete('/products/:productId', deleteProduct);

module.exports = router;