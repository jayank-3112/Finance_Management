// routes/auth.js
import express from 'express';  // Correct import for express
const router = express.Router(); // Correct way to instantiate the router
import { signup, login, logout } from '../controllers/auth.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getUserDetails } from '../controllers/getUserDetails.js'; // Import the controller for fetching user details

// Routes for authentication
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// New route to get user details
router.get('/user',authMiddleware, getUserDetails);  // Use the authMiddleware to protect this route

export default router;
