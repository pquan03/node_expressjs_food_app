import express, { Router } from "express";
import ratingController from "../controllers/rating.controller";
import { verifyTokenAndAuthorization } from "../middlewares/verifyToken.middleware";
const router: Router = express.Router();

router.route('/')
    .post(verifyTokenAndAuthorization ,ratingController.addRating)
    .get(verifyTokenAndAuthorization ,ratingController.checkUserRating)

export default router;