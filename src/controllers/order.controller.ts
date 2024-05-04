import { Request, Response } from "express";
import { IRequest } from "../utils/interface";
import Order from "../models/order.model";

export default {
    placeOrder: async (req: IRequest, res: Response) => {
        const newOrder = new Order({
            ...req.body, 
            userId: req.user._id, 
        })

        try {   
            await newOrder.save()

            const orderId = newOrder._id

            res.status(200).json({
                status: true, 
                message: "Order placed successfully",
                orderId: orderId
            })

        } catch(err: any) {
            return res.status(500).json({ status: false, message: err.message})
        }
    }, 
    getUserOrders: async (req: IRequest, res: Response) => {
        const userId  = req.user._id
        const {paymentStatus, orderStatus} = req.body

        let query: {
            userId: string, 
            paymentStatus?: string, 
            orderStatus?: string
        
        } = {userId}

        if(paymentStatus) {
            query.paymentStatus = paymentStatus
        }

        if(orderStatus) {
            query.orderStatus = orderStatus
        }

        try {
            const orders = await Order.find(query)
            .populate({
                path: 'orderItems.foodId',
                select: 'imageUrl title rating time'
            })

            res.status(200).json(orders)
        } catch(err: any) {
            return res.status(500).json({ status: false, message: err.message})
        }
    }
}