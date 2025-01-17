<<<<<<< HEAD
const medecinService = require("../services/medecin.service");
=======
const medecinService = require('../services/medecin.service');

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Récupérer tous les médecins
const getMedecins = async (req, res) => {
  try {
    const medecins = await medecinService.getAllMedecins();
    res.json(medecins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Récupérer un médecin par ID
const getMedecin = async (req, res) => {
  try {
    const medecin = await medecinService.getMedecinById(req.params.id);
    res.json(medecin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Ajouter un nouveau médecin
const createMedecin = async (req, res) => {
  try {
    const newMedecin = await medecinService.addMedecin(req.body);
    res.status(201).json(newMedecin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
<<<<<<< HEAD
// Mettre à jour un médecin
const updateMedecin = async (req, res) => {
  try {
    const updatedMedecin = await medecinService.updateMedecin(
      req.params.id,
      req.body
    );
=======

// Mettre à jour un médecin
const updateMedecin = async (req, res) => {
  try {
    const updatedMedecin = await medecinService.updateMedecin(req.params.id, req.body);
>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
    res.json(updatedMedecin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Supprimer un médecin
const deleteMedecin = async (req, res) => {
  try {
    await medecinService.deleteMedecin(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
module.exports = {
  getMedecins,
  getMedecin,
  createMedecin,
  updateMedecin,
  deleteMedecin,
};
