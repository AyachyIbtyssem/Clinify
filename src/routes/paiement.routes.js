const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiement.controller");

// Routes pour les paiements
router.get("/", paiementController.getPaiements); // Récupérer tous les paiements
router.get("/:id", paiementController.getPaiement); // Récupérer un paiement par ID
router.post("/", paiementController.createPaiement); // Créer un nouveau paiement
router.put("/:id", paiementController.updatePaiement); // Mettre à jour un paiement par ID
router.delete("/:id", paiementController.deletePaiement); // Supprimer un paiement par ID

module.exports = router;
