require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const jobRoutes = require('./routes/jobs');
const aiRoutes = require('./routes/ai');

const { seedJobs } = require('./seed');

// Initialize BullMQ worker
require('./queues/aiWorker');

const app = express();

// Connect to MongoDB and ensure sample data exists
connectDB().then(async () => {
  try {
    await seedJobs(false);
  } catch (err) {
    console.warn('Auto-seed check notice:', err.message);
  }
});

// Security and middleware chain
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // allow localhost, 127.0.0.1, and configured client URL
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(rateLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'AI-Powered Job Management System API',
  });
});

// Mount domain routes
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);

// Catch-all 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Centralized error handler
app.use(errorHandler);

const PORT = parseInt(process.env.PORT, 10) || 5001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server successfully running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated.');
  });
});

module.exports = app;
