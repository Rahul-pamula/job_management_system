const mongoose = require('mongoose');
const { aiQueue, queueEvents } = require('../queues/aiQueue');
const Job = require('../models/Job');

const AI_JOB_TIMEOUT_MS = 35000;

/**
 * Enqueue improve description job and wait for worker result
 */
exports.improveDescription = async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description || typeof description !== 'string' || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Job description text is required for AI improvement',
      });
    }

    // Add job to BullMQ queue
    const job = await aiQueue.add('improve', { description });

    try {
      // Wait for BullMQ job to be processed by worker
      const improvedDescription = await job.waitUntilFinished(queueEvents, AI_JOB_TIMEOUT_MS);
      return res.status(200).json({
        success: true,
        data: {
          improvedDescription,
        },
      });
    } catch (jobErr) {
      console.error('[AI Queue Wait Error - improve]:', jobErr.message);
      return res.status(500).json({
        success: false,
        message: 'AI improvement failed. Please try again later.',
        error: jobErr.message,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * Enqueue job summary generation and wait for worker result
 */
exports.generateJobSummary = async (req, res, next) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'jobId is required',
      });
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID format',
      });
    }

    const job = await Job.findById(jobId).lean();
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    const jobPayload = {
      title: job.title,
      companyName: job.companyName,
      description: job.description,
      skills: job.skills,
      jobCategory: job.jobCategory,
      experienceMin: job.experienceMin,
      experienceMax: job.experienceMax,
    };

    // Add job to BullMQ queue
    const queuedJob = await aiQueue.add('summary', jobPayload);

    try {
      const summary = await queuedJob.waitUntilFinished(queueEvents, AI_JOB_TIMEOUT_MS);
      return res.status(200).json({
        success: true,
        data: {
          summary,
        },
      });
    } catch (jobErr) {
      console.error('[AI Queue Wait Error - summary]:', jobErr.message);
      return res.status(500).json({
        success: false,
        message: 'AI summary generation failed. Please try again later.',
        error: jobErr.message,
      });
    }
  } catch (err) {
    next(err);
  }
};
