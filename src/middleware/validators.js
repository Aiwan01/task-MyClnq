const { body, validationResult } = require('express-validator');

 const validateTask = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().optional(),
  body('completed').isBoolean().optional(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateTask
};