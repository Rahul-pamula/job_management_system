const mongoose = require('mongoose');

let memoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // 1. Try connecting to MongoDB Atlas first
  try {
    if (uri && !uri.includes('localhost') && !uri.includes('127.0.0.1')) {
      console.log('Attempting connection to MongoDB Atlas...');
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3500 });
      console.log('✅ Connected to MongoDB Atlas successfully');
      return;
    }
  } catch (atlasErr) {
    console.warn(`⚠️ MongoDB Atlas connection notice: ${atlasErr.message}`);
    console.warn('Note: To connect to MongoDB Atlas directly, whitelist your public IP in the Atlas dashboard.');
  }

  // 2. Try connecting to already running local MongoDB (e.g. port 27018 or 27017)
  const localUris = ['mongodb://127.0.0.1:27018/job_management', 'mongodb://127.0.0.1:27017/job_management'];
  for (const localUri of localUris) {
    try {
      await mongoose.connect(localUri, { serverSelectionTimeoutMS: 1500 });
      console.log(`✅ Connected to active local MongoDB instance at ${localUri}`);
      return;
    } catch (e) {
      // continue to next attempt
    }
  }

  // 3. Fallback to starting a dedicated in-memory MongoDB instance
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create({
      instance: {
        dbName: 'job_management',
        port: 27018,
      },
    });
    const fallbackUri = memoryServer.getUri();
    await mongoose.connect(fallbackUri);
    console.log(`✅ Started and connected to local MongoDB instance at ${fallbackUri}`);
  } catch (err) {
    console.error('❌ Failed to connect to any MongoDB instance:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
