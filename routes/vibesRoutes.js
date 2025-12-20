import express from 'express';
import VibesController from '../controllers/VibesController.js';

// Inicializa o Router
const router = express.Router();

// helpers

import checkAuth from '../helpers/auth.js'
import Vibe from '../models/Vibe.js';
checkAuth.checkAuth

// Rotas
router.get('/add', checkAuth, VibesController.createVibe)
router.post('/add', checkAuth, VibesController.createVibeSave)
router.get('/edit/:id', checkAuth, VibesController.updateVibe)
router.post('/edit', checkAuth, VibesController.updateVibeSave)
router.get('/dashboard', checkAuth, VibesController.dashboard)
router.post('/remove', checkAuth, VibesController.removeVibe)
router.get('/', VibesController.showVibes);

export default router;
