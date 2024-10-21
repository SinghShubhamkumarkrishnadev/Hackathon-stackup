// middleware/roleMiddleware.js

const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!userRole) {
        return res.status(403).json({ message: "Role not found." });
      }
  
      if (userRole !== requiredRole) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  