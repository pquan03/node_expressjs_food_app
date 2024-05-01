import jwt from 'jsonwebtoken';
import {  Response, NextFunction } from 'express';
import { IRequest } from '../utils/interface';
import { verify } from 'crypto';


export default {
    verifyToken: (req: IRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if(authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, user: any) => {
                if(err) {
                    return res.status(403).json({
                        status: false, 
                        message: err.message
                    })
                }

                req.user = user;
                next(); 
            })
        } else {
            return res.status(401).json({
                status: false,
                message: 'Access denied'
            })
        }
    }, 
    verifyTokenAndAuthrization: (req: IRequest, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if(authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET as string, async (err: any, user: any) => {
                if(err) {
                    return res.status(403).json({
                        status: false, 
                        message: err.message
                    })
                }

                if(req.user.userType === 'Client' || req.user.userType === 'Admin' || req.user.userType === 'Vendor' || req.user.userType === 'Driver') {
                    req.user = user;
                    next();
                } else {
                    return res.status(403).json({
                        status: false, 
                        message: 'Access denied'
                    })
                }
            })
        } else {
            return res.status(401).json({
                status: false,
                message: 'Access denied'
            })
        }
    }
}