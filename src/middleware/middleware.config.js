const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

function configureMiddleware(app) {
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(limiter);
}

module.exports = configureMiddleware;