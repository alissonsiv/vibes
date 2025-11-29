import express from 'express';
import VibesController from '../controllers/VibesController.js';

// Inicializa o Router
const router = express.Router();

// Rotas
router.get('/', VibesController.showVibes);

export default router;
