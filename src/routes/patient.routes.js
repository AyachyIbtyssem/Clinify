const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");

// Routes pour les patients
router.get("/", patientController.getPatients);
router.get("/:id", patientController.getPatient);
router.post("/", patientController.createPatient);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);
router.get("/:id/dossier", patientController.consulterDossierMedical); // La route utilise l'ID du patient
router.post("/:id/rendezvous", patientController.prendreRendezvous);
router.get("/:id/rendezvous", patientController.findRendezVousByPatient);

module.exports = router;
