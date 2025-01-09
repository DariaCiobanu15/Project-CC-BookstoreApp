const express = require('express');
const axios = require('axios');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

// Vizualizare cărți
router.get('/books', authenticate, async (req, res) => {
    try {
        // Apelează database-service pentru a obține lista cărților
        const response = await axios.get('http://database-service:3002/api/books');
        res.json(response.data);
    } catch (err) {
        res.status(500).send('Error fetching books');
    }
});


router.post('/orders', authenticate, async (req, res) => {
    try {
        const { items } = req.body;

        // Verificare stoc (apel API database-service)
        for (const item of items) {
            const bookResponse = await axios.get(`http://database-service:3002/api/books/${item.book}`);
            const book = bookResponse.data;
            if (book.stock < item.quantity) {
                return res.status(400).send(`Not enough stock for book: ${book.title}`);
            }
        }

        // Creare comandă
        const response = await axios.post('http://database-service:3002/api/orders', {
            user: req.user.username,
            items,
            totalPrice: req.body.totalPrice,
        });
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(500).send('Error creating order');
    }
});

module.exports = router;
