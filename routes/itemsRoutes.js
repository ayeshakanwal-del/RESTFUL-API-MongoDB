const express = require('express');
const Item = require('../models/schema');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add an item
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        price: req.body.price,
    });
    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an item
router.patch('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (req.body.name != null) item.name = req.body.name;
        if (req.body.price != null) item.price = req.body.price;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Update an item
router.put('/:id', async (req, res) => {
    try {
        
        const item = await Item.findById(req.params.id);
        
        if (!item) return res.status(404).json({ message: 'Item not found' });

        
        item.name = req.body.name;
        item.price = req.body.price;

       
        const updatedItem = await item.save();
        
        res.json(updatedItem); 
    } catch (err) {
        res.status(400).json({ message: err.message }); 
    }
});


// Delete an item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Test route
router.get('/test', (req, res) => {
    res.send('API is working and connected to MongoDB!');
});



module.exports = router;
