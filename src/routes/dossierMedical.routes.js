const express = require("express");
const router = express.Router();
const dossierMedicalController = require("../controllers/dossierMedical.controller");

// Routes pour DossierMedical
router.post("/", dossierMedicalController.createDossierMedical);
router.get("/", dossierMedicalController.getDossiersMedical);
router.get("/:id", dossierMedicalController.getDossierMedical);
router.put("/:id", dossierMedicalController.updateDossierMedical);
router.delete("/:id", dossierMedicalController.deleteDossierMedical);
router.put("/ajouterAnalyse/:id", dossierMedicalController.ajouterAnalyse);
router.get(
  "/verifierDossier/:id",
  dossierMedicalController.verifierDossierPatient
);
router.get(
  "/patient/:patientId",
  dossierMedicalController.getDossiersMedicalByPatientId
); //obtenir les dossiers medical par patient

module.exports = router;
