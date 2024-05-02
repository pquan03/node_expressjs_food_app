import { Request, Response } from 'express';
import { IRequest } from '../utils/interface';
import Address from '../models/address.model';
import User from '../models/user.model';

export default {
    addAddress: async (req: IRequest, res: Response) => {
        
        const newAddress = new Address({ 
            userId: req.user._id,
            addressLine1: req.body.addressLine1,
            postalCode: req.body.postalCode,
            default: req.body.default, 
            deliveryInstructions: req.body.deliveryInstructions,
            latitude: req.body.latitude,
            longtitude: req.body.longtitude
        })

        try {
            // If default is true, set all other addresses to false
            if(req.body.default) {
                await Address.updateMany({ userId: req.user._id }, { default: false })
            }

            await newAddress.save()

            res.status(200).json({status: true, message: 'Address added successfully'})
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getAddresses: async (req: IRequest, res: Response) => {
        try {
            const addresses = await Address.find({ userId: req.user._id})
            res.status(200).json(addresses)   
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    deleteAddress: async (req: IRequest, res: Response) => {
        try {
            await Address.findByIdAndDelete(req.params.id)
            res.status(200).json({status: true, message: 'Address deleted successfully'})
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    setDefaultAddress: async (req: IRequest, res: Response) => {
        const addressId = req.params.id
        const userId = req.user._id
        try {
            await Address.updateMany(userId, { default: false })
            const updateAddress = await Address.findByIdAndUpdate(addressId, { default: true })
            if(updateAddress) {
                await User.findOneAndUpdate(userId, { address: addressId} )
                res.status(200).json({status: true, message: 'Default address set successfully'})
            } else {
                res.status(404).json({status: false, message: 'Address not found'})
            }
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getDefaultAddress: async (req: IRequest, res: Response) => {
        const userId = req.user._id
        try {
            const address = await Address.findOne({ userId, default: true })
            res.status(200).json(address)
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }
}