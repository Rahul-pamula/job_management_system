const express = require('express');
const { z } = require('zod');
const router = express.Router();
const jobController = require('../controllers/jobController');
const validate = require('../middlewares/validate');
const sanitizeBody = require('../middlewares/sanitize');

const createJobSchema = z
  .object({
    title: z.string({ required_error: 'Title is required' }).trim().min(2, 'Title must be at least 2 characters'),
    companyName: z
      .string({ required_error: 'Company name is required' })
      .trim()
      .min(2, 'Company name must be at least 2 characters'),
    description: z.string({ required_error: 'Description is required' }).trim().min(1, 'Description is required'),
    locationType: z.enum(['WFH', 'Hybrid', 'WFO'], {
      errorMap: () => ({ message: 'Location type must be WFH, Hybrid, or WFO' }),
    }),
    country: z.string().optional().default(''),
    state: z.string().optional().default(''),
    city: z.string().optional().default(''),
    skills: z.array(z.string()).optional().default([]),
    jobCategory: z.string().optional().default(''),
    education: z.array(z.string()).optional().default([]),
    experienceMin: z.number().min(0, 'Minimum experience cannot be negative').optional().default(0),
    experienceMax: z.number().min(0, 'Maximum experience cannot be negative').optional().default(0),
  })
  .refine(
    (data) => {
      if (data.locationType === 'Hybrid' || data.locationType === 'WFO') {
        return Boolean(data.country && data.country.trim() && data.city && data.city.trim());
      }
      return true;
    },
    {
      message: 'Country and City are required for Hybrid or WFO positions',
      path: ['country'],
    }
  )
  .refine(
    (data) => {
      if (data.experienceMax !== undefined && data.experienceMin !== undefined) {
        return data.experienceMax >= data.experienceMin;
      }
      return true;
    },
    {
      message: 'Maximum experience must be greater than or equal to minimum experience',
      path: ['experienceMax'],
    }
  );

router.get('/', jobController.listJobs);
router.post('/', validate(createJobSchema), sanitizeBody, jobController.createJob);
router.get('/:id', jobController.getJob);

module.exports = router;
