const sanitizeHtml = require('sanitize-html');

const sanitizeBody = (req, res, next) => {
  if (req.body && req.body.description && typeof req.body.description === 'string') {
    req.body.description = sanitizeHtml(req.body.description, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'u', 's', 'span']),
      allowedAttributes: {
        '*': ['style', 'class'],
        a: ['href', 'name', 'target', 'rel'],
      },
      allowedSchemes: ['http', 'https', 'mailto'],
    });
  }
  next();
};

module.exports = sanitizeBody;
