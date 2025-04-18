const express = require('express');
const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct,} = require('../controllers/product.controller');
const router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:productId', getProductById);

router.put('/:productId', updateProduct);

router.delete('/:productId', deleteProduct);

module.exports = router;