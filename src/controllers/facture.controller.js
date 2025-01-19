const factureService = require('../services/facture.service');

// Ajouter une nouvelle facture
const createFacture = async (req, res) => {
  try {
    const facture = await factureService.addFacture(req.body);
    res.status(201).json(facture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les factures
const getAllFactures = async (req, res) => {
  try {
    const factures = await factureService.getAllFactures();
    res.status(200).json(factures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une facture par ID
const getFactureById = async (req, res) => {
  try {
    const facture = await factureService.getFactureById(req.params.id);
    res.status(200).json(facture);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Mettre à jour une facture par ID
const updateFacture = async (req, res) => {
  try {
    const updatedFacture = await factureService.updateFacture(req.params.id, req.body);
    res.status(200).json({ message: 'Facture mise à jour avec succès', updatedFacture });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une facture par ID
const deleteFacture = async (req, res) => {
  try {
    await factureService.deleteFacture(req.params.id);
    res.status(200).json({ message: 'Facture supprimée avec succès' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createFacture,
  getAllFactures,
  getFactureById,
  updateFacture,
  deleteFacture,
};
