const express = require("express");
const router = express.Router();
const medicamentController = require("../controllers/medicament.controller");

// Base routes
router.post("/", medicamentController.createMedicament);
router.get("/", medicamentController.getMedicaments);
router.get("/:id", medicamentController.getMedicament);
router.put("/:id", medicamentController.updateMedicament);
router.delete("/:id", medicamentController.deleteMedicament);

// Medical record specific routes
router.get(
  "/dossier/:dossierId",
  medicamentController.getMedicamentsByDossierId
);
router.post(
  "/dossier/:dossierId",
  medicamentController.ajouterMedicamentAuDossier
);

module.exports = router;
