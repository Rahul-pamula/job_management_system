const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = {};
    result.error.errors.forEach((e) => {
      const field = e.path.length > 0 ? e.path.join('.') : 'form';
      errors[field] = e.message;
    });
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });
  }
  req.body = result.data;
  next();
};

module.exports = validate;
