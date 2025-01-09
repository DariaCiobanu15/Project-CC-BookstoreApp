const express = require('express');
const axios = require('axios');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Adăugare carte
router.post('/books', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const response = await axios.post('http://database-service:3002/api/books', req.body);
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(500).send('Error adding book');
    }
});

// Actualizare stoc
router.put('/books/:id/stock', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (typeof stock !== 'number' || stock < 0) {
            return res.status(400).send('Invalid stock value');
        }

        const response = await axios.put(`http://database-service:3002/api/books/${id}`, { stock });
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(500).send('Error updating stock');
    }
});

// Actualizare preț
router.put('/books/:id/price', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;

        if (typeof price !== 'number' || price < 0) {
            return res.status(400).send('Invalid price value');
        }

        const response = await axios.put(`http://database-service:3003/api/books/${id}`, { price });
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(500).send('Error updating price');
    }
});

// Ștergere carte
router.delete('/books/:id', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const response = await axios.delete(`http://database-service:3003/api/books/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (err) {
        res.status(500).send('Error deleting book');
    }
});

// Vizualizează comenzile
router.get('/orders', authenticate, authorize(['admin']), async (req, res) => {
    try {
        const response = await axios.get('http://database-service:3003/api/orders');
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(500).send('Error fetching orders');
    }
});

module.exports = router;
