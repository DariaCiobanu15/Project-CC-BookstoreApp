const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log('Business service running on port 3003'));
