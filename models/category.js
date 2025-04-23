const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Category', categorySchema);



// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   name: String,
//   price: Number
// });

// const categorySchema = new mongoose.Schema({
//   name: String, // e.g., Plumbing
//   services: [serviceSchema] // e.g., [{ name: "Tap Change", price: 150 }]
// });

// module.exports = mongoose.model('Category', categorySchema);

// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true }
// });

// const categorySchema = new mongoose.Schema({
//   name: { type: String, required: true }, // e.g., Plumbing
//   services: [serviceSchema] // e.g., [{ name: "Tap Change", price: 150 }]
// });

// module.exports = mongoose.model('Category', categorySchema);
