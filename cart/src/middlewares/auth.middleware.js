const jwt = require('jsonwebtoken');

function createAuthMiddleware(roles = ['user']) {
  return function authMiddleware(req, res, next) {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!roles.includes(decoded.role)) {
            return res.status(403).json({ message: 'You do not have permission to access this resource' });
        }

        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid authentication token' });        
    }
  }
}

module.exports = createAuthMiddleware;