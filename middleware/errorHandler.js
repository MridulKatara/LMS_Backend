const handleErrors = (err, req, res, next) => {
  console.error("Error Stack Trace:", err.stack);
  res.status(500).json({ error: err.message });
};

module.exports = handleErrors;
