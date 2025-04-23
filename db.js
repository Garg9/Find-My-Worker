const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://findmyworker_user:<findmyworker>@findmyworker.jzy1yrs.mongodb.net/?retryWrites=true&w=majority&appName=findmyworker';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    return client.db('findmyworker_user'); // name of your database
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
