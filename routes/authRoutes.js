import express from 'express';
import AuthController from '../controllers/AuthController.js';

// Inicializa o Router
const router = express.Router();

// Rotas
router.get('/login', AuthController.login);
router.get('/register', AuthController.register);

export default router;
