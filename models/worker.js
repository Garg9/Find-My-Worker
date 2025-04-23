const mongoose = require('mongoose');

const categorySubSchema = new mongoose.Schema({
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true },
    experience: { type: Number, required: true },
});

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    highestQualification: { type: String, required: true },
    jobCategory: { type: String, required: true },
    categories: [categorySubSchema],
    isVerify: { type: Boolean, default: false },
});

module.exports = mongoose.model('Worker', workerSchema);