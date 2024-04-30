import express, { Router } from 'express';
import categoryController from '../controllers/category.controller';
const router: Router = express.Router();

router.route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories)

router.get('/random', categoryController.getRandomCategories)



export default router;