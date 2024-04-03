const express = require('express');
const router = express.Router();
const Product = require('../models/products');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(`/:id`, async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = req.body;
  
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
  
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    res.json({ message: "Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
  
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
  
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
