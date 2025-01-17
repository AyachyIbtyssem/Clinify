const express = require("express");
const router = express.Router();
const rdvController = require("../controllers/rdv.controller");

// Routes pour les rendez-vous
router.get("/", rdvController.getRendezVous); // Récupérer tous les rendez-vous
router.get("/:id", rdvController.getRendezVousById); // Récupérer un rendez-vous par ID
router.post("/", rdvController.createRendezVous); // Ajouter un nouveau rendez-vous
router.put("/:id", rdvController.updateRendezVous); // Mettre à jour un rendez-vous par ID
router.delete("/:id", rdvController.deleteRendezVous); // Supprimer un rendez-vous par ID

module.exports = router;
