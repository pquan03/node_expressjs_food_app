import { Request, Response } from 'express';
import User from '../models/user.model';
import { IRequest } from '../utils/interface';

export default {
    getUser: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id);

            if(!user) {
                return res.status(404).json({
                    status: false, 
                    message: "User not found!"    
                })
            }

            const {password, _v, createdAt, otp, ...others} = (user as any)._doc

            res.status(200).json(others)
        } catch(err: any) {
            return res.status(500).json({
                status: false, 
                message: "Internal server error!"    
            })
        }
    }, 
    verifyAccount: async (req: IRequest, res: Response) => {
         const { otp } = req.params;

         try {
            const user = await User.findOne(req.user._id as any);
            if(!user) {
                return res.status(404).json({
                    status: false, 
                    message: "User not found!"    
                })
            }

            if(user.otp === otp) {
                user.verification = true;
                user.otp = 'none'

                await user.save();
                
                const {password, _v, createdAt, otp, ...others} = (user as any)._doc

                return res.status(200).json(others)
            } else {
                return res.status(400).json({
                    status: false, 
                    message: "Invalid OTP!"
                })
            }
         } catch(err: any) {
            return res.status(500).json({
                status: false, 
                message: "Internal server error!"    
            })
         }

    }, 
    verifyPhone: async (req: IRequest, res: Response) => {
        const { phone } = req.body;
        
        try {
            const user = await User.findOne(req.user._id as any); 

            if(!user) {
                return res.status(404).json({
                    status: false, 
                    message: "User not found!"    
                })
            } 

            user.phone_verification = true
            user.phone = phone  

            await user.save();

            const {password, _v, createdAt, otp, ...others} = (user as any)._doc
            return res.status(200).json(others)
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    }, 
    deleteUser: async (req: IRequest, res: Response) => {
        try {
            await User.findByIdAndDelete(req.user._id as any);
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    }
}