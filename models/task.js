const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    intrestedWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }],
    status: { type: String, default: 'open', enum: ['open' , 'ongoing', 'completed'] },
    createdAt: { type: Date, default: Date.now },
    // service: { name: String, price: Number}
});

module.exports = mongoose.model('Task', taskSchema);

// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true },
//   clientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
//   interestedWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }],
//   status: { type: String, default: 'open', enum: ['open', 'ongoing', 'completed'] },
//   createdAt: { type: Date, default: Date.now },
//   service: { name: String, price: Number } // Store selected service details
// });

// module.exports = mongoose.model('Task', taskSchema);
