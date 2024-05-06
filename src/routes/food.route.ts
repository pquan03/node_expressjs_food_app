import express, { Router } from 'express';
import foodController from '../controllers/food.controller';
import { verifyVendor } from '../middlewares/verifyToken.middleware';
const router: Router = express.Router();


router.post('/', foodController.addFood)

router.get('/byId/:id', foodController.getFoodById)

router.get('/search/:query', foodController.searchFood)

router.get('/cate-code/:category/:code', foodController.getFoodsByCategoryAndCode)

router.get('/random/:code', foodController.getRandomFoods)

router.get('/by-code/:code', foodController.getAllFoodsByCode)

router.get('/restaurant-foods/:id', foodController.getFoodsByRestaurant)



export default router;