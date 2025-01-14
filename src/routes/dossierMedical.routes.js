const express = require('express');
const dossierMedicalController = require('../controllers/dossierMedical.controller');

const router = express.Router();

// Routes pour DossierMedical
router.post('/', dossierMedicalController.createDossierMedical);
router.get('/', dossierMedicalController.getDossiersMedical);
router.get('/:id', dossierMedicalController.getDossierMedical);
router.put('/:id', dossierMedicalController.updateDossierMedical);
router.delete('/:id', dossierMedicalController.deleteDossierMedical);

module.exports = router;