const medecinService = require("../services/medecin.service");
// Récupérer tous les médecins
const getMedecins = async (req, res) => {
  try {
    const medecins = await medecinService.getAllMedecins();
    res.json(medecins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Récupérer un médecin par ID
const getMedecin = async (req, res) => {
  try {
    const medecin = await medecinService.getMedecinById(req.params.id);
    res.json(medecin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Ajouter un nouveau médecin
const createMedecin = async (req, res) => {
  try {
    const newMedecin = await medecinService.addMedecin(req.body);
    res.status(201).json(newMedecin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Mettre à jour un médecin
const updateMedecin = async (req, res) => {
  try {
    const updatedMedecin = await medecinService.updateMedecin(
      req.params.id,
      req.body
    );
    res.json(updatedMedecin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// Supprimer un médecin
const deleteMedecin = async (req, res) => {
  try {
    await medecinService.deleteMedecin(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  getMedecins,
  getMedecin,
  createMedecin,
  updateMedecin,
  deleteMedecin,
};
