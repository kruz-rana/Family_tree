const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const personRoutes = require('./routes/personRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/person', personRoutes);

module.exports = app;
