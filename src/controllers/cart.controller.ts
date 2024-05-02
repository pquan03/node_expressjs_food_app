import { Request, Response } from 'express';
import { IRequest } from '../utils/interface';
import Cart from '../models/cart.model';


export default {
    addProductToCart: async (req: IRequest, res: Response) => {
        const userId = req.user._id;
        const { productId, addtitives, totalPrice, quantity } = req.body;

        let count;

        try {
            const existingProduct = await Cart.findOne({userId, productId});
            count = await Cart.countDocuments({userId});

            if(existingProduct) {
                existingProduct.totalPrice += totalPrice * quantity;
                existingProduct.quantity += quantity;

                await existingProduct.save();
                return res.status(200).json({status: true, count});
             } else {
                const newCartItem = new Cart({
                    userId,
                    productId,
                    addtitives,
                    totalPrice,
                    quantity
                })

                await newCartItem.save();
                count = await Cart.countDocuments({userId});
                return res.status(200).json({status: true, count});
             }
        } catch(err: any) {
            return res.status(500).json({status: false, msg: err.message})
        }
     }, 
     removeCartItem: async (req: IRequest, res: Response) => {
        const userId = req.user._id
        const cartItemId = req.params.id;

        try {
            await Cart.findOneAndDelete({ _id: cartItemId});
            const count = await Cart.countDocuments({userId});

            res.status(200).json({status: true, count});
        } catch(err: any) {
            return res.status(500).json({status: false, msg: err.message})
        }
     }, 
     getCart: async (req: IRequest, res: Response) => {
        const userId = req.user._id;
        try {
            const cart = await Cart.find({userId})
            .populate({
                path: 'productId', 
                select: 'imageUrl title restaurant rating ratingCount', 
                populate: {
                    path: 'restaurant', 
                    select: 'time coords'
                }
            })

            res.status(200).json(cart)
        } catch(err: any) {
            return res.status(500).json({status: false, msg: err.message})
        }
     }, 
     getCartCount: async (req: IRequest, res: Response) => {
        const userId = req.user._id;
        try {
            const count = await Cart.countDocuments({userId});
            res.status(200).json({
                status: true, 
                count
            })
        } catch(err: any) {
            return res.status(500).json({status: false, msg: err.message})
        }
     }, 
     decrementProductQuantity: async (req: IRequest, res: Response) => {
        const userId = req.user._id;
        const cartItemId = req.params.id;

        try {
            const cartItem = await Cart.findOne({ _id: cartItemId});
            if(cartItem) {
                const productPrice = cartItem.totalPrice / cartItem.quantity;   

                if(cartItem.quantity > 1) {
                    cartItem.quantity -= 1
                    cartItem.totalPrice -= productPrice;
                    await cartItem.save();
                    return res.status(200).json({status: true, message: 'Product quantity decremented successfully'})
                } else {
                    await Cart.findOneAndDelete({ _id: cartItemId});

                    res.status(200).json({status: true, message: 'Product removed from cart successfully'})
                }
            } else {
                return res.status(404).json({status: false, message: 'Product not found'})
            
            }
        } catch(err: any) {
            return res.status(500).json({status: false, msg: err.message})
        }
     }
}