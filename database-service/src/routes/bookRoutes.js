const express = require('express');
const Book = require('../models/bookModel');
const router = express.Router();

// Obține toate cărțile
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books)
    } catch (err) {
        res.status(500).send('Error fetching books');
    }
});

// Obține o carte
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).send('Book not found');
        res.send('Book deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting book');
    }
});

// Adaugă o carte nouă
router.post('/', async (req, res) => {
    try {
        const { title, author, price, stock } = req.body;
        const book = new Book({ title, author, price, stock });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(500).send('Error adding book');
    }
});

// Actualizare stoc
router.put('/:id/stock', async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (typeof stock !== 'number' || stock < 0) {
            return res.status(400).send('Invalid stock value');
        }

        const book = await Book.findByIdAndUpdate(id, { stock }, { new: true });
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send('Error updating stock');
    }
});

// Actualizare preț
router.put('/:id/price', async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;

        if (typeof price !== 'number' || price < 0) {
            return res.status(400).send('Invalid price value');
        }

        const book = await Book.findByIdAndUpdate(id, { price }, { new: true });
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send('Error updating price');
    }
});

// Ștergere carte
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) return res.status(404).send('Book not found');
        res.send('Book deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting book');
    }
});

module.exports = router;
