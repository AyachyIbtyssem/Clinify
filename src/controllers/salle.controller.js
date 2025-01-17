const salleService = require("../services/salle.service");

// Récupérer toutes les salles
const getSalles = async (req, res) => {
  try {
    const salles = await salleService.getAllSalles();
    res.json(salles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une salle par ID
const getSalleById = async (req, res) => {
  try {
    const salle = await salleService.getSalleById(req.params.id);
    res.json(salle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter une nouvelle salle
const createSalle = async (req, res) => {
  try {
    const newSalle = await salleService.addSalle(req.body);
    res.status(201).json(newSalle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une salle
const updateSalle = async (req, res) => {
  try {
    const updatedSalle = await salleService.updateSalle(
      req.params.id,
      req.body
    );
    res.json(updatedSalle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer une salle
const deleteSalle = async (req, res) => {
  try {
    await salleService.deleteSalle(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getSalles,
  getSalleById,
  createSalle,
  updateSalle,
  deleteSalle,
};
