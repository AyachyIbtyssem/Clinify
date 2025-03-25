const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiement.controller");

// Routes CRUD
router.get("/", paiementController.getPaiements);
router.get("/:id", paiementController.getPaiement);
router.put("/:id", paiementController.updatePaiement);
router.delete("/:id", paiementController.deletePaiement);
router.post("/", paiementController.createPaiement);
// Webhook pour mise à jour du statut de paiement
router.post("/webhook", async (req, res) => {
    try {
      const { payment_id, status } = req.body;
  
      console.log("🔔 Webhook reçu :", req.body);
  
      // Vérifier que le paiement existe
      const paiement = await Paiement.findOne({ where: { transactionId: payment_id } });
      if (!paiement) {
        return res.status(404).json({ message: "Paiement non trouvé" });
      }
  
      // Mettre à jour le statut
      const nouveauStatut = status === "completed" ? "validé" : "échoué";
      await paiement.update({ statut: nouveauStatut });
  
      res.status(200).json({ message: "Statut mis à jour avec succès" });
    } catch (error) {
      console.error("❌ Erreur Webhook Paymee :", error.message);
      res.status(500).json({ message: "Erreur Webhook" });
    }
  });
module.exports = router;
