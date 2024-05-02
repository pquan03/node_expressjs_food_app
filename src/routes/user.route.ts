import express, { Router } from 'express';
import userController from '../controllers/user.controller';
import { verifyTokenAndAuthorization } from '../middlewares/verifyToken.middleware';
const router: Router = express.Router();

router.route('/')
    .get(verifyTokenAndAuthorization, userController.getUser)
    .delete(verifyTokenAndAuthorization, userController.deleteUser)

router.get('/verify/:otp', verifyTokenAndAuthorization, userController.verifyAccount)

router.get('/verify_phone/:phone', verifyTokenAndAuthorization, userController.verifyPhone)


export default router;