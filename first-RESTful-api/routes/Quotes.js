const express = require('express');
const router = express.Router();

const Quote = require('../models/Quotes');

// GET all quotes
router.get('/', async (req, res) => {
    const Quotes = await Quote.find();
    res.json(Quotes);
});

// POST new quote
router.post('/new', async (req, res) => {
    
    const newQuote = new Quote(req.body);

    const savedQuote = await newQuote.save();

    res.json(savedQuote);
});

// Get specific quote
router.get('/get/:id', async (req, res) => {

    const quote = await Quote.findById({ _id: req.params.id })

    res.json(quote);

});

// Delete specific quote
router.delete('/delete/:id', async (req, res) => {

    const result = await Quote.findByIdAndDelete({ _id: req.params.id })

    res.json(result);

});

// Udpdate specific quote
router.patch('/update/:id', async (req, res) => {

    const updatedQuote = await Quote.updateOne({ _id: req.params.id }, {$set: req.body});

    res.json(updatedQuote);
});

// Get random quote
router.get('/random', async (req, res) => {

    const count = await Quote.countDocuments();

    const random = Math.floor(Math.random() * count);

    const quote = await Quote.findOne().skip(random);

    res.json(quote);
});

module.exports = router;