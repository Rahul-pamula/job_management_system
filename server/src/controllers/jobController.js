const mongoose = require('mongoose');
const jobService = require('../services/jobService');

exports.listJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const result = await jobService.getJobs(filters, Number(page), Number(limit));
    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

exports.createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body);
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid job ID format',
      });
    }
    const job = await jobService.getJobById(id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
    res.json({
      success: true,
      data: job,
    });
  } catch (err) {
    next(err);
  }
};
