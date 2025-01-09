const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();

// Creare comandă
router.post('/orders', async (req, res) => {
    try {
        const { user, items, totalPrice } = req.body;
        const order = new Order({ user, items, totalPrice });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).send('Error creating order');
    }
});

// Obținere comenzi
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('items.book');
        res.json(orders);
    } catch (err) {
        res.status(500).send('Error fetching orders');
    }
});

module.exports = router;
