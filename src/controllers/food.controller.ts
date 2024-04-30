import { Request, Response } from 'express';
import Food from '../models/food.model';

export default {
    addFood: async (req: Request, res: Response) => {
        const { title, foodTags, category, code, isAvailable, restaurant, description, time,  price, additives, imageUrl } = req.body;

        if(!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !imageUrl) {
            return res.status(400).json({status: false, message: "All fields are required"})
        }


        const newFood = new Food(req.body);

        try {
            await newFood.save();
            res.status(201).json({status: true, message: "Food added successfully"})
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getFoodById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const food = await Food.findById(id);
            if(!food) {
                return res.status(404).json({status: false, message: "Food not found"})
            }
            res.status(200).json(food)
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getRandomFoods: async (req: Request, res: Response) => {
        const { code } = req.params;
        try {
            let foods = [];
            if(code) {
                foods = await Food.aggregate([
                    { $match: { code, isAvailable: true } },
                    { $sample: { size: 5 } },
                    { $project: { _v: 0 } }
                ])
            }

            if(foods.length === 0) {
                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $project: { _v: 0 } }
                ])
            }
            res.status(200).json(foods)
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getFoodsByRestaurant: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const foods = await Food.find({ restaurant: id });
            res.status(200).json(foods)
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getFoodsByCategoryAndCode: async (req: Request, res: Response) => {
        const { category, code } = req.params;
        try {
            const foods =  await Food.aggregate([
                { $match: { category, code, isAvailable: true} }, 
                { $project: { _v: 0 } }
            ])
            res.status(200).json(foods)
        } catch(err: any) {
            res.status(500).json({
                status: false, 
                message: err.message
            })
        }
    }, 
    searchFood: async (req: Request, res: Response) => {
        const { query } = req.params;
        try {
            const results = await Food.aggregate([
                {
                    $search: {
                        index: 'foods', 
                        text: {
                            query: query,
                            path: {
                                wildcard: "*"
                            
                            }
                        }
                    }
                }
            ])
            res.status(200).json(results)
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }, 
    getRandomFoodsByCategoryAndCode: async (req: Request, res: Response) => {
        const { category, code } = req.params;
        try {
            let foods = [];

            if(category && code) {
                foods = await Food.aggregate([
                    { $match: { category, code, isAvailable: true } },
                    { $sample: { size: 10 } },
                    { $project: { _v: 0 } }
                ])
            } else if (category) {
                foods = await Food.aggregate([
                    { $match: { category, isAvailable: true } },
                    { $sample: { size: 10 } },
                    { $project: { _v: 0 } }
                ])
            } else if (code) {
                foods = await Food.aggregate([
                    { $match: { code, isAvailable: true } },
                    { $sample: { size: 10 } },
                    { $project: { _v: 0 } }
                ])
            } else {
                foods = await Food.aggregate([
                    { $match: { isAvailable: true } },
                    { $project: { _v: 0 } }
                ])
            }
            res.status(200).json(foods)
        } catch(err: any) {
            res.status(500).json({status: false, message: err.message})
        }
    }
}