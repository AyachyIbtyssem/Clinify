const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecin.controller');

// Routes pour les médecins
router.get('/', medecinController.getMedecins);
router.get('/:id', medecinController.getMedecin);
router.post('/', medecinController.createMedecin);
router.put('/:id', medecinController.updateMedecin);
router.delete('/:id', medecinController.deleteMedecin);

module.exports = router;
