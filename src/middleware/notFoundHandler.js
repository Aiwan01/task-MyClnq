export const notFoundHandler = (req, res) => {
  
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found'
  });

};