import express, { Router } from 'express';
import userController from '../controllers/user.controller';
const router: Router = express.Router();    

router.route('/')
    .get(userController.getUser)
    .delete(userController.deleteUser)

router.get('/verify/:otp', userController.verifyAccount)

router.get('/verify_phone/:phone', userController.verifyPhone)


export default router;