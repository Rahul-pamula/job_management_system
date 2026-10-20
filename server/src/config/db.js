const mongoose = require('mongoose');

let memoryServer = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production';

  // 1. Connect to MongoDB Atlas (Production or configured remote URI)
  if (uri && !uri.includes('localhost') && !uri.includes('127.0.0.1')) {
    try {
      console.log('Connecting to MongoDB Atlas...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000, // 10s timeout for cloud environments
      });
      console.log('✅ Connected to MongoDB Atlas successfully');
      return;
    } catch (atlasErr) {
      console.error(`❌ MongoDB Atlas connection error: ${atlasErr.message}`);
      console.error('⚠️ Make sure 0.0.0.0/0 is added to your MongoDB Atlas Network Access IP Whitelist.');
      if (isProduction) {
        // In production on Render, do not attempt to load devDependencies like mongodb-memory-server
        return;
      }
      console.warn('Falling back to local development database...');
    }
  }

  // 2. Development fallback only (running on local machine)
  if (!isProduction) {
    const localUris = [
      'mongodb://127.0.0.1:27018/job_management',
      'mongodb://127.0.0.1:27017/job_management',
    ];

    for (const localUri of localUris) {
      try {
        await mongoose.connect(localUri, { serverSelectionTimeoutMS: 1500 });
        console.log(`✅ Connected to active local MongoDB instance at ${localUri}`);
        return;
      } catch (e) {
        // continue to next attempt
      }
    }

    // Attempt in-memory MongoDB for local testing if available
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
      console.log(`✅ Started and connected to local in-memory MongoDB instance at ${fallbackUri}`);
    } catch (err) {
      console.warn('Local in-memory MongoDB not started:', err.message);
    }
  }
};

module.exports = connectDB;
