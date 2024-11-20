const express = require('express');
const multer = require('multer');
const Person = require('../models/Person');
const path = require('path');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Add a new family member
router.post('/add', upload.single('photo'), async (req, res) => {
    try {
        const { name, dob, parentId } = req.body;
        const photo = req.file ? req.file.filename : null;

        const newPerson = new Person({ name, dob, photo, parentId });
        await newPerson.save();

        res.status(201).json({ message: 'Person added successfully', person: newPerson });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a family member
router.post('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        // Check if person has children
        const children = await Person.find({ parentId: id });
        if (children.length > 0) {
            return res.status(400).json({ message: 'Cannot delete a person with children' });
        }

        await Person.findByIdAndDelete(id);
        res.json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a person and their family tree
router.get('/view/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id).populate('children');
        if (!person) return res.status(404).json({ message: 'Person not found' });

        res.json(person);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all root members
router.get('/', async (req, res) => {
    try {
        const members = await Person.find({ parentId: null });
        res.json(members);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
