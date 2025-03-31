const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;  // Attach user details to request object
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token", details: error.message });
  }
};
