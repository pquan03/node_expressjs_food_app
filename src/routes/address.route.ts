import express, { Router } from 'express';
import addressController from '../controllers/address.controller';
import { verifyTokenAndAuthorization } from '../middlewares/verifyToken.middleware';
const router: Router = express.Router();

router.route('/')
    .post(verifyTokenAndAuthorization, addressController.addAddress)
    .get(verifyTokenAndAuthorization, addressController.getAddresses)

router.delete('/:id', verifyTokenAndAuthorization, addressController.deleteAddress)

router.patch('/default/:id', verifyTokenAndAuthorization, addressController.setDefaultAddress)

router.get('/default', verifyTokenAndAuthorization, addressController.getDefaultAddress)

export default router;