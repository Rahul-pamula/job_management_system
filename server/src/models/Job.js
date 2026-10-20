const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Job title is required'], minlength: 2, trim: true },
    companyName: { type: String, required: [true, 'Company name is required'], minlength: 2, trim: true },
    description: { type: String, required: [true, 'Job description is required'] },
    locationType: {
      type: String,
      required: [true, 'Location type is required'],
      enum: {
        values: ['WFH', 'Hybrid', 'WFO'],
        message: '{VALUE} is not a valid location type',
      },
    },
    country: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    skills: [{ type: String, trim: true }],
    jobCategory: { type: String, default: '', trim: true },
    education: [{ type: String, trim: true }],
    experienceMin: { type: Number, default: 0, min: 0 },
    experienceMax: { type: Number, default: 0, min: 0 },
    postedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Pre-validate hook: if locationType is 'Hybrid' or 'WFO', country and city must be present.
jobSchema.pre('validate', function (next) {
  if (this.locationType === 'Hybrid' || this.locationType === 'WFO') {
    if (!this.country || !this.country.trim()) {
      return next(new Error('Country is required for Hybrid or WFO jobs'));
    }
    if (!this.city || !this.city.trim()) {
      return next(new Error('City is required for Hybrid or WFO jobs'));
    }
  } else if (this.locationType === 'WFH') {
    // Clean country and city for WFH
    this.country = '';
    this.state = '';
    this.city = '';
  }
  next();
});

jobSchema.index({ title: 1 });
jobSchema.index({ companyName: 1 });
jobSchema.index({ jobCategory: 1 });
jobSchema.index({ locationType: 1 });
jobSchema.index({ skills: 1 });
jobSchema.index({ postedDate: -1 });

module.exports = mongoose.model('Job', jobSchema);
