const { MongoClient } = require('mongodb');

// IMPORTANT: Replace these parts with your actual values from MongoDB Atlas
// Your connection string should look like this:
// mongodb+srv://USERNAME:PASSWORD@CLUSTERNAME.abc123.mongodb.net/DATABASE?retryWrites=true&w=majority&appName=YourAppName

const uri = "mongodb+srv://ABC:97KPBFYBbdtqdka3@alphabusinessconsulting.b0xj8yf.mongodb.net/?retryWrites=true&w=majority&appName=AlphaBusinessConsultingHostingWebsites";

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Make sure you have:');
    console.log('1. Correct username (ABC)');
    console.log('2. Correct password');
    console.log('3. Correct cluster name (NOT alphabusines)');
    console.log('4. Correct database name');
    console.log('');
    
    const client = new MongoClient(uri);
    
    await client.connect();
    console.log('✅ Connection successful!');
    
    const db = client.db();
    console.log('Database name:', db.databaseName);
    
    await client.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.log('');
    console.log('To fix this:');
    console.log('1. Go to MongoDB Atlas');
    console.log('2. Click "Connect" on your cluster');
    console.log('3. Copy the EXACT connection string shown');
    console.log('4. Replace the URI variable above');
  }
}

testConnection(); 