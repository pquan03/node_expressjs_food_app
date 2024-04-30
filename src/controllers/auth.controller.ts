import { Request, Response } from 'express';
import User from '../models/user.model';
import HelpFuncs from '../utils/help_funcs';
import bcrypt from 'bcrypt';


export default {
    createUser: async (req: Request, res: Response) => {
        const {  email, username, password} = req.body;
        if(!HelpFuncs.checkEmail(email)) {
            return res.status(400).json({
                status: false, 
                message: "Email is not valid!"    
            })
        }

        if(!HelpFuncs.checkPassword(password)) {
            return res.status(400).json({
                status: false, 
                message: "Password is not valid!"    
            })
        }

        try {
            const emailExists = await User.findOne({ email: email });  
            if(emailExists) {
                return res.status(400).json({
                    status: false, 
                    message: "Email already exists!"    
                })
            } 

            // generate OTP
            const otp = HelpFuncs.generateOTP();

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10); 

            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
                otp: otp
            })

            await newUser.save();

            // Send OTP to email    
            

            return res.status(201).json({
                status: true, 
                message: "User created successfully!"    
            })



        } catch(err: any) {
            return res.status(500).json({
                status: false, 
                message: err.message    
            })
        }
    }, 
    loginUser: async (req: Request, res: Response) => {
        const {  email, password} = req.body;
        if(!HelpFuncs.checkEmail(email)) {
            return res.status(400).json({
                status: false, 
                message: "Email is not valid!"    
            })
        }

        if(!HelpFuncs.checkPassword(password)) {
            return res.status(400).json({
                status: false, 
                message: "Password is not valid!"    
            })
        }
        try {
            const user = await User.findOne({ email: email });  
            if(!user) {
                return res.status(400).json({
                    status: false, 
                    message: "Email does not exist!"    
                })
            }

            // check password
            const matchPassword = await bcrypt.compare(password, user.password);
            if(!matchPassword) {
                return res.status(400).json({
                    status: false, 
                    message: "Password is incorrect!"    
                })
            }


            // generate token
            
        } catch(err: any) {
            return res.status(500).json({
                status: false, 
                message: err.message    
            })
        }
    },
}