const express = require('express');
const { z } = require('zod');
const router = express.Router();
const aiController = require('../controllers/aiController');
const validate = require('../middlewares/validate');

const improveSchema = z.object({
  description: z.string({ required_error: 'Description is required' }).trim().min(1, 'Description cannot be empty'),
});

const summarySchema = z.object({
  jobId: z.string({ required_error: 'jobId is required' }).trim().min(1, 'jobId cannot be empty'),
});

router.post('/improve', validate(improveSchema), aiController.improveDescription);
router.post('/summary', validate(summarySchema), aiController.generateJobSummary);

module.exports = router;
