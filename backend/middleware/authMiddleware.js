// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js'

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
//   console.log(token);
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId }; // Adds the userId to the `req` object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};