import express from 'express';
import VibesController from '../controllers/VibesController.js';

// Inicializa o Router
const router = express.Router();

// helpers

import checkAuth from '../helpers/auth.js'
checkAuth.checkAuth

// Rotas
router.get('/add', checkAuth, VibesController.createVibe)
router.post('/add', checkAuth, VibesController.createVibeSave)
router.get('/dashboard', checkAuth, VibesController.dashboard)
router.get('/', VibesController.showVibes);

export default router;
