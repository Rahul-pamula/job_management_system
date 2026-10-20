const { Worker } = require('bullmq');
const connection = require('../config/redis');
const { improveDescription, generateSummary } = require('../services/aiService');

const worker = new Worker(
  'ai-processing',
  async (job) => {
    console.log(`[Worker] Processing job "${job.name}" (ID: ${job.id})`);
    if (job.name === 'improve') {
      return await improveDescription(job.data.description);
    }
    if (job.name === 'summary') {
      return await generateSummary(job.data);
    }
    throw new Error(`Unknown job name: ${job.name}`);
  },
  {
    connection,
    concurrency: 5,
  }
);

worker.on('completed', (job) => {
  console.log(`[Worker] Job "${job.name}" (ID: ${job.id}) completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`[Worker] Job "${job?.name}" (ID: ${job?.id}) failed:`, err.message);
});

worker.on('error', (err) => {
  console.error('[Worker Error]:', err.message);
});

console.log('BullMQ worker initialized and listening on "ai-processing" queue');

module.exports = worker;
