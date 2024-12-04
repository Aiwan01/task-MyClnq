const express = require("express")
const configureMiddleware = require('./middleware/middleware.config');
const apiRouter = require('./routes/api.js');
 const { initializeDataFile } = require('./models/items.model.js');

const app = express();
const port = process.env.PORT || 3000;

// Configure middleware for security
configureMiddleware(app);

// Routes
app.use('/items', apiRouter);

// Initialize and start server
async function start() {
  await initializeDataFile();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start();