const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultation.controller");

router.get("/", consultationController.getConsultations);
router.get("/:idConsultation", consultationController.getConsultation);
router.post("/", consultationController.createConsultation);
router.put("/:idConsultation", consultationController.updateConsultation);
router.delete("/:idConsultation", consultationController.deleteConsultation);
router.put("/:id/ordonnance", consultationController.ajouterOrdonnance);

//on l'appelle /api/consultations/1/details
router.get("/:id/details", consultationController.getDetailsConsultation);

router.get(
  "/patients/:patientId/historique",
  consultationController.consulterHistoriqueConsultations
);
router.put("/:id/diagnostic", consultationController.ajouterDiagnostic);
module.exports = router;

router.put("/:id/modifier", consultationController.modifierConsultation);
