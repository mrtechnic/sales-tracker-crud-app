const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const productsRoute = require('./routes/product.route');
const salesRoute = require('./routes/sale.route');
const usersRoute = require('./routes/user.route');
const branchRoute = require('./routes/branch.route');

const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/sales', salesRoute);
app.use('/api/users', usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/branches', branchRoute)



// app.get('/api/products', async (req, res) => {
//   try {
//     const products = await Product.find();  
//     return res.status(200).json({
//       message: 'Products fetched successfully',
//       products: products, 
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// });


// app.put('/api/products/:productId', async (req, res) => {
//   try {
//     const {productId} = req.params;
//     const {title, description, category, initialStock, remainingStock, price} = req.body;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({error: 'Invalid product ID'});
//     }

//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({message: 'Product not found'});
//     }

//     product.title = title || product.title;
//     product.description = description || product.description;
//     product.category = category || product.category;
//     product.initialStock = initialStock || product.initialStock;
//     product.remainingStock = remainingStock || product.remainingStock;
//     product.price = price || product.price;

//     await product.save();

//     return res.status(200).json({
//       message: 'Product updated successfully',
//       product,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// })

// app.delete('/api/products/:productId', async (req, res) => {
//   try {
//     const {productId} = req.params;

//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res.status(400).json({error: 'Invalid product ID'});
//     }

//     const product = await Product.findByIdAndDelete(productId);
//     if (!product) {
//       return res.status(404).json({message: 'Product not found'});
//     }

//     return res.status(200).json({
//       message: 'Product deleted successfully',
//       product,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal server error',
//     });
//   }
// });

async function main() {
  await mongoose.connect(process.env.DB_URL)
}

main().then(() => {
  console.log('MongoDB is connected!')

  app.listen(5000, () => {
    console.log('Server is running on port 5000!')
  } )
})
.catch(err => {
  console.log('MongoDB connection error:')
})

