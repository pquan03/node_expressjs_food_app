import express, { Router } from 'express';
import cartController from '../controllers/cart.controller';
import { verifyTokenAndAuthorization } from '../middlewares/verifyToken.middleware';

const router: Router = express.Router();    

router.route('/')
 .post(verifyTokenAndAuthorization, cartController.addProductToCart)
 .get(verifyTokenAndAuthorization, cartController.getCart)

router.get('/count', verifyTokenAndAuthorization, cartController.getCartCount)  

router.get('/decrement/:id', verifyTokenAndAuthorization, cartController.decrementProductQuantity)

router.delete('/:id', verifyTokenAndAuthorization, cartController.removeCartItem)


export default router;