import { Request, Response } from "express";
import Category from "../models/category.model";


export default {
    createCategory: async(req: Request, res: Response) => {
        const newCategory = new Category(req.body) 
        console.log(req.body);
        try {
            await newCategory.save()
            res.status(201).json({
                status: true, 
                message: 'Category created successfully',
            })
        } catch(error : any) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    },
    getAllCategories: async(req: Request, res: Response) => {
        try {
            const categories = await Category.find({title: { $ne: "More"}}, {_v:0})
            res.status(200).json(categories)
        } catch(error : any) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    },
    getRandomCategories: async(req: Request, res: Response) => {
        try {
            const categories = await Category.aggregate([
                { $match: { title: { $ne: "More" } } },
                { $sample: { size: 6 } },
            ])
            const moreCategory = await Category.findOne({ value: "more" }, {_v:0})
            
            if(moreCategory) {
                categories.push(moreCategory)
            }
            
            res.status(200).json(categories)
        } catch(error : any) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    },
}