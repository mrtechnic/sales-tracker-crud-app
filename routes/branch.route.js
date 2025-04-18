const express = require('express');
const router = express.Router();
const Branch = require('../models/branch.model');

router.post('/', async (req, res) => {
  try {
    const { name, location } = req.body;

    const existing = await Branch.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Branch already exists'});

    const newBranch = new Branch({ name, location });
    await newBranch.save();

    res.status(201).json(newBranch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;