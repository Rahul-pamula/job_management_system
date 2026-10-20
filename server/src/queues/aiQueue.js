const { Queue, QueueEvents } = require('bullmq');
const connection = require('../config/redis');

const aiQueue = new Queue('ai-processing', {
  connection,
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 100,
    attempts: 2,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

const queueEvents = new QueueEvents('ai-processing', { connection });

module.exports = {
  aiQueue,
  queueEvents,
};
