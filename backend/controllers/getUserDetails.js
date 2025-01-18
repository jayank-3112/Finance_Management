// controllers/auth.js
import { User } from '../models/User.js'; // Import User model

// Get User Details Controller
export const getUserDetails = async (req, res) => {
  try {
    // Correct way to fetch user ID
    const userId = req.user.userId;  // Get user ID from the decoded token
    const user = await User.findById(userId).select('-password');  // Fetch user details, excluding the password
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    // Return user details
    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        // Add any other user properties you want to send
      },
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user details',
    });
  }
};
