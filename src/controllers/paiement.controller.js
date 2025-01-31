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

// Ajouter un nouveau paiement
const createPaiement = async (req, res) => {
  try {
    const paiementData = req.body;
    const newPaiement = await paiementService.addPaiement(paiementData);
    res.status(201).json(newPaiement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un paiement
const updatePaiement = async (req, res) => {
  try {
    const updatedPaiement = await paiementService.updatePaiement(
      req.params.id,
      req.body
    );
    if (updatedPaiement[0] === 0) {
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
    res.status(204).send(); // No content
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
