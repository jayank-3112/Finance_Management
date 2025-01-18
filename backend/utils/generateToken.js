import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Use dotenv to load environment variables
export const generateToken = (res, user, message) => {
    const token = jwt.sign({
        userId: user._id,
    }, process.env.JWT_SECRET,
        { expiresIn: '1h' });
    // console.log('Generated Token:', token);
    return res
    .status(200)
    .cookie("token", token, { 
        httpOnly: true, 
        sameSite: "strict", 
        maxAge: 60 * 60 * 1000 
    }).json({
        success: true,
        message: message,
        user: user,
        token:token
    })
}