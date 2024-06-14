const jwt = require("jsonwebtoken");
const { Account } = require("../models");
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (!authToken) {
    console.warn("Authorization token not provided");
    return res.sendStatus(401);
  }

  const token = authToken.split(" ")[1]; // Extracting token from "Bearer <token>"
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.error("Error verifying JWT token:", err.message);
      return res.sendStatus(403);
    }
    req.user = decodedToken;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.userRole;
    if (!roles.includes(userRole)) {
      console.warn(`Unauthorized access attempt for role: ${userRole}`);
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = { authenticateToken, authorizeRoles };
