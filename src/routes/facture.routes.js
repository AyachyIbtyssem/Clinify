const express = require('express');
const factureController = require('../controllers/facture.controller');
const router = express.Router();

router.post('/', factureController.createFacture); // Ajouter une nouvelle facture
router.get('/', factureController.getAllFactures); // Obtenir toutes les factures
router.get('/:id', factureController.getFactureById); // Obtenir une facture par ID
router.put('/:id', factureController.updateFacture); // Mettre à jour une facture par ID
router.delete('/:id', factureController.deleteFacture); // Supprimer une facture par ID

module.exports = router;
