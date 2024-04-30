import express, { Router } from 'express';
import foodController from '../controllers/food.controller';

const router: Router = express.Router();


router.post('/', foodController.addFood)

router.get('/:id', foodController.getFoodById)

router.get('/search/:query', foodController.searchFood)

router.get('/:category/:code', foodController.getFoodsByCategoryAndCode)

router.get('/recommnendation/:code', foodController.getRandomFoods)


router.get('/restaurant-foods/:id', foodController.getFoodsByRestaurant)



export default router;