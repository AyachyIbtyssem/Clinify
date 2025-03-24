const paiementService = require("../services/paiement.service");

// Récupérer tous les paiements
const getPaiements = async (req, res) => {
  try {
    const paiements = await paiementService.getAllPaiements();
    res.json(paiements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un paiement par ID
const getPaiement = async (req, res) => {
  try {
    const paiement = await paiementService.getPaiementById(req.params.id);
    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }
    res.json(paiement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un paiement avec Paymee
const createPaiement = async (req, res) => {
  try {
    console.log("📥 Données reçues :", req.body); // Voir les données envoyées

    const { montant, methodePaiement, IdRDV, first_name, last_name, email } = req.body;

    if (!montant || !methodePaiement || !IdRDV || !first_name || !last_name || !email) {
      console.log("❌ Champ(s) manquant(s)");
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Création du paiement en base de données
    const newPaiement = await paiementService.addPaiement({
      montant,
      methodePaiement,
      IdRDV,
      first_name,
      last_name,
      email,
    });

    console.log("✅ Paiement créé :", newPaiement);
    res.status(201).json(newPaiement);
  } catch (error) {
    console.error("❌ Erreur création paiement :", error);
    res.status(400).json({ message: error.message });
  }
};


// Mettre à jour un paiement
const updatePaiement = async (req, res) => {
  try {
    const updatedPaiement = await paiementService.updatePaiement(req.params.id, req.body);
    if (!updatedPaiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }
    res.json(updatedPaiement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un paiement
const deletePaiement = async (req, res) => {
  try {
    const deleted = await paiementService.deletePaiement(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPaiements,
  getPaiement,
  createPaiement,
  updatePaiement,
  deletePaiement,
};
