import express, { Router } from "express";
import ratingController from "../controllers/rating.controller";
const router: Router = express.Router();

router.route('/')
    .post(ratingController.addRating)
    .get(ratingController.checkUserRating)

export default router;