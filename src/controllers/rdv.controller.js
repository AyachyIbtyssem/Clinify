const rdvService = require("../services/rdv.service");

// Récupérer tous les rendez-vous
const getRendezVous = async (req, res) => {
  try {
    const rendezVous = await rdvService.getAllRendezVous();
    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un rendez-vous par ID
const getRendezVousById = async (req, res) => {
  try {
    const rendezVous = await rdvService.getRendezVousById(req.params.id);
    res.json(rendezVous);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter un nouveau rendez-vous
const createRendezVous = async (req, res) => {
  try {
    const newRendezVous = await rdvService.addRendezVous(req.body);
    res.status(201).json(newRendezVous);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un rendez-vous
const updateRendezVous = async (req, res) => {
  try {
    const updatedRendezVous = await rdvService.updateRendezVous(
      req.params.id,
      req.body
    );
    res.json(updatedRendezVous);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer un rendez-vous
const deleteRendezVous = async (req, res) => {
  try {
    await rdvService.deleteRendezVous(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getRendezVous,
  getRendezVousById,
  createRendezVous,
  updateRendezVous,
  deleteRendezVous,
};
