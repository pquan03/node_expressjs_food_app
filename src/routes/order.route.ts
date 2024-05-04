import express, { Router } from "express";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken.middleware";
import orderController from "../controllers/order.controller";
const router: Router = express.Router();


router.route('/')
    .post(verifyTokenAndAuthorization, orderController.placeOrder)
    .get(verifyTokenAndAuthorization, orderController.getUserOrders)


export default router;