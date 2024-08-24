const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

router.post('/', async (req, res) => {
  const { name, description, price, category, image } = req.body;
  const product = new Product({ name, description, price, category, image });
  await product.save();
  res.send(product);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.send(product);
});

module.exports = router;
