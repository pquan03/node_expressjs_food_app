import { Request, Response } from 'express';
import Restaurant from '../models/restaurant.model';

export default {
    addRestaurant: async (req: Request, res: Response) => {
        const { title, time, imageUrl,  owner, code, logoUrl,coords } = req.body;

        if(!title || !time || !imageUrl || !owner || !code || !logoUrl || !coords || !coords.latitude || !coords.longitude || !coords.latitudeDelta || !coords.longitudeDelta || !coords.address || !coords.title) {
            res.status(400).json({
                status: false, 
                message: "All fields are required"
            })
        }

        try {
            const newRestaurant = new Restaurant(req.body)
            await newRestaurant.save();
            res.status(201).json({
                status: true, 
                message: "Restaurant added successfully"
            })
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    }, 
    getRestaurantById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const restaurant = await Restaurant.findById(id);
            if(!restaurant) {
                res.status(404).json({
                    status: false, 
                    message: "Restaurant not found"
                })
            } else {
                res.status(200).json(restaurant)
            }
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    }, 
    getRandomRestaurants: async (req: Request, res: Response) => {
        const { code } = req.params;
        try {
            let restaurants = [];
            if(code) {
                restaurants = await Restaurant.aggregate([
                    { $match: { code: code, isAvailable: true}}, 
                    { $sample: { size: 5}},
                    {$project: { _v: 0}},
                ])
            }

            if(restaurants.length === 0) {
                restaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true}},
                    {$project: { _v: 0}},
                ])
            }

            res.status(200).json(restaurants)

        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    },
    getAllNearbyRestaurants: async (req: Request, res: Response) => {
        const { code } = req.params;
        console.log(req.params);
        
        try {
            let restaurants = [];
            if(code) {
                console.log('Request in here');
                restaurants = await Restaurant.aggregate([
                    { $match: { code, isAvailable: true}}, 
                    { $sample: { size: 5}},
                    {$project: { __v: 0}},
                ])
            }

            if(restaurants.length === 0) {
                console.log('Request in here');
                restaurants = await Restaurant.aggregate([
                    { $match: { isAvailable: true}}, 
                    { $sample: { size: 5}},
                    {$project: { __v: 0}},
                ])
            }

            res.status(200).json(restaurants)

        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    },
}