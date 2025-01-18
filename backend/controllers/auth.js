// controllers/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import { User } from '../models/User.js'; // Default import
// Signup Controller
export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body; // patel214
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist with this email."
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password:hashedPassword
        });
        return res.status(201).json({
            success:true,
            message:"Account created successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to register"
        })
    }
};

// Login Controller
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
    //console.log('Login Request:', { email, password }); 
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required.',
        });
      }
  
      const user = await User.findOne({ email });
    //   console.log('User Found:', user); 
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect email or password.',
        });
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password);
    //console.log('Password Match:', isPasswordMatch); 
  
      if (!isPasswordMatch) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect email or password.',
        });
      }
      generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
      console.error('Login Error:', error); 
      return res.status(500).json({
        success: false,
        message: 'Failed to login',
      });
    }
  };
  
// Logout Controller (optional - you can delete the token from client-side)

export const logout = async (_,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        }) 
    }
}

