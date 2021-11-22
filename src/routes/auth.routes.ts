import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();

const authController = new AuthController();

authRoutes.post('/', authController.authenticate);
authRoutes.get('/confirm-account/:code', authController.verifyAccount);

export { authRoutes };