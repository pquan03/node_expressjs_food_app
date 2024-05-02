import jwt from 'jsonwebtoken';
import {  Response, NextFunction } from 'express';
import { IRequest } from '../utils/interface';
import { verify } from 'crypto';


const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
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
}


const verifyTokenAndAuthorization = (req: IRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Client' || req.user.userType === 'Admin' || req.user.userType === 'Vendor' || req.user.userType === 'Driver') {
            next()
        } else {
            return res.status(403).json({
                status: false,
                message: 'You are not allowed access'
            })
        }
    })
}

const verifyAdmin = (req: IRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Admin') {
            next()
        } else {
            return res.status(403).json({
                status: false,
                message: 'You are not allowed access'
            })
        }
    })

}

const verifyVendor = (req: IRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Vendor' || req.user.userType === 'Admin') {
            next()
        } else {
            return res.status(403).json({
                status: false,
                message: 'You are not allowed access'
            })
        }
    })
}

const verifyDriver = (req: IRequest, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.userType === 'Driver') {
            next()
        } else {
            return res.status(403).json({
                status: false,
                message: 'You are not allowed access'
            })
        }
    })
}

export { verifyToken, verifyTokenAndAuthorization, verifyAdmin, verifyVendor, verifyDriver }
