import { Request, Response} from 'express';
import Rating from '../models/rating.model';
import Restaurant from '../models/restaurant.model';
import Food from '../models/food.model';
import { IRequest } from '../utils/interface';




export default {
    addRating: async (req: Request, res: Response) => {
        const { userId, ratingType, product, rating} = req.body
        const newRating = new Rating({ userId, ratingType, product, rating})    

        try {
            await newRating.save()

            // calculate average rating from rating and product
            const ratings = await Rating.aggregate([
                { $match: { ratingType, product}}, 
                { $group: { _id: '$product', avgRating: { $avg: "$rating"}}}
            ])
            const avgRating = ratings[0].avgRating
            if(ratingType === 'Restaurant') {
                await Restaurant.findOneAndUpdate(product, { rating: avgRating}, { new: true})
            } else if(ratingType === 'Food') {
                await Food.findOneAndUpdate(product, { rating: avgRating}, { new: true})
            }
            
            res.status(200).json({
                status: true, 
                message: 'Rating added successfully'
            })
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    }, 
    checkUserRating: async (req: IRequest, res: Response) => {
        const { ratingType, product} = req.body
        try {
            const existingRating = await Rating.findOne({ userId: req.userId, ratingType, product})
            if(existingRating) {
                return res.status(200).json({ status: true, message: 'User has already rated this product'})   
            } 
                return res.status(200).json({ status: false, message: 'User has not rated this product'})   
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    },
}