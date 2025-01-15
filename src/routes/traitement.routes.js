const express = require('express');
const router = express.Router();
const traitementController = require('../controllers/traitement.controller');

// Routes CRUD pour Traitement
router.post('/', traitementController.addTraitement); // Ajouter un traitement
router.get('/', traitementController.getAllTraitements); // Récupérer tous les traitements
router.get('/:id', traitementController.getTraitementById); // Récupérer un traitement par ID
router.put('/:id', traitementController.updateTraitement); // Mettre à jour un traitement par ID
router.delete('/:id', traitementController.deleteTraitement); // Supprimer un traitement par ID

module.exports = router;
