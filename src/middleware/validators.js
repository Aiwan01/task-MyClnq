
function validateInput(req, res, next) {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
      return res.status(400).json({ error: 'Title, description, and status are required' });
  }

  if (status !== 'completed' && status !== 'pending') {
      return res.status(400).json({ error: 'Status must be either "complete" or "pending"' });
  }

  next();
}

module.exports = validateInput;