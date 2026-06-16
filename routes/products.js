const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataFile = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  try {
    if (fs.existsSync(dataFile)) {
      return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
  } catch {}
  return [];
}

function writeProducts(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all products
router.get('/', (req, res) => {
  res.json(readProducts());
});

// GET single product by id
router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST create product
router.post('/', (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    ...req.body
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT update product
router.put('/:id', (req, res) => {
  const products = readProducts();
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { ...products[index], ...req.body };
  writeProducts(products);
  res.json(products[index]);
});

// PUT bulk update all products
router.put('/', (req, res) => {
  if (Array.isArray(req.body)) {
    writeProducts(req.body);
    res.json(req.body);
  } else {
    res.status(400).json({ error: 'Expected array of products' });
  }
});

// DELETE product
router.delete('/:id', (req, res) => {
  let products = readProducts();
  products = products.filter(p => p.id !== req.params.id);
  writeProducts(products);
  res.json({ success: true });
});

module.exports = router;
