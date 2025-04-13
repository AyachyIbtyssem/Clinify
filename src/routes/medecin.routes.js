const express = require("express");
const router = express.Router();
const medecinController = require("../controllers/medecin.controller");

// Routes pour les médecins

router.get("/", medecinController.getMedecins);
router.get("/:id", medecinController.getMedecin);
router.post("/", medecinController.createMedecin);
router.put("/:id", medecinController.updateMedecin);
router.delete("/:id", medecinController.deleteMedecin);
router.get(
  "/:medecinId/rendezvous",
  medecinController.voirLaListeDesRendezVous
);
router.get(
  "/patients/:patientId/dossier",
  medecinController.verifierDossierPatient
);

module.exports = router;
