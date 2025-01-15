const traitementService = require('../services/traitement.service');

// Ajouter un nouveau traitement
const addTraitement = async (req, res) => {
  try {
    const newTraitement = await traitementService.addTraitement(req.body);
    res.status(201).json({ message: "Traitement créé avec succès", traitement: newTraitement });
  } catch (error) {
    res.status(400).json({ message: error.message || "Erreur lors de la création du traitement" });
  }
};

// Récupérer un traitement par ID
const getTraitementById = async (req, res) => {
  try {
    const traitement = await traitementService.getTraitementById(req.params.id);
    res.json(traitement);
  } catch (error) {
    res.status(404).json({ message: error.message || "Traitement introuvable" });
  }
};

// Récupérer tous les traitements
const getAllTraitements = async (req, res) => {
  try {
    const traitements = await traitementService.getAllTraitements();
    res.json(traitements);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des traitements" });
  }
};

// Mettre à jour un traitement par ID
const updateTraitement = async (req, res) => {
  try {
    const updatedMessage = await traitementService.updateTraitement(req.params.id, req.body);
    res.json(updatedMessage);
  } catch (error) {
    res.status(404).json({ message: error.message || "Erreur lors de la mise à jour du traitement" });
  }
};

// Supprimer un traitement par ID
const deleteTraitement = async (req, res) => {
  try {
    const deleteMessage = await traitementService.deleteTraitement(req.params.id);
    res.json(deleteMessage);
  } catch (error) {
    res.status(404).json({ message: error.message || "Erreur lors de la suppression du traitement" });
  }
};

module.exports = {
  addTraitement,
  getTraitementById,
  getAllTraitements,
  updateTraitement,
  deleteTraitement,
};
