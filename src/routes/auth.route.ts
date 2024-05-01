import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
const router: Router = express.Router();    

router.post('/register', authController.createUser)

router.post('/login', authController.loginUser)



export default router;