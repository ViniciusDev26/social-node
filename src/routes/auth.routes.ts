import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.get('/', authController.getInfo);
authRoutes.post('/', authController.authenticate);
authRoutes.get('/confirm-account/:code', authController.verifyAccount);

authRoutes.post('/resend-code', authController.resendVerificationCode);

export { authRoutes };