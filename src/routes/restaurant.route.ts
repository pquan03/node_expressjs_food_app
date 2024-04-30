import express, { Router } from 'express';
import restaurantController from '../controllers/restaurant.controller';
const router: Router = express.Router();

router.post('/', restaurantController.addRestaurant)
router.get('/:code', restaurantController.getRandomRestaurants)
router.get('/all/:code', restaurantController.getAllNearbyRestaurants)
router.get('/byId/:id', restaurantController.getRestaurantById)



export default router;