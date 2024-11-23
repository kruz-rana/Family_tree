const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    photo: { type: String },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
});

personSchema.virtual('children', {
    ref: 'Person',
    localField: '_id',
    foreignField: 'parentId',
});

personSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('person', personSchema);
