import express, { Router } from 'express';
import foodController from '../controllers/food.controller';
import { verifyVendor } from '../middlewares/verifyToken.middleware';
const router: Router = express.Router();


router.post('/', verifyVendor, foodController.addFood)

router.get('/:id', foodController.getFoodById)

router.get('/search/:query', foodController.searchFood)

router.get('/:category/:code', foodController.getFoodsByCategoryAndCode)

router.get('/reconmendation/:code', foodController.getRandomFoods)


router.get('/restaurant-foods/:id', foodController.getFoodsByRestaurant)



export default router;