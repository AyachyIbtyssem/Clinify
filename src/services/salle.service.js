const salleRepository = require("../repositories/salle.repository");

// Récupérer toutes les salles
const getAllSalles = async () => {
  return await salleRepository.findAllSalles();
};

// Récupérer une salle par ID
const getSalleById = async (id) => {
  const salle = await salleRepository.findSalleById(id);
  if (!salle) {
    throw new Error("Salle non trouvée");
  }
  return salle;
};

// Ajouter une nouvelle salle
const addSalle = async (salleData) => {
  return await salleRepository.createSalle(salleData);
};

// Mettre à jour une salle
const updateSalle = async (id, salleData) => {
  const updatedSalle = await salleRepository.updateSalleById(id, salleData);
  if (updatedSalle[0] === 0) {
    throw new Error("Salle non trouvée");
  }
  return updatedSalle;
};

// Supprimer une salle
const deleteSalle = async (id) => {
  const deleted = await salleRepository.deleteSalleById(id);
  if (!deleted) {
    throw new Error("Salle non trouvée");
  }
  return deleted;
};

module.exports = {
  getAllSalles,
  getSalleById,
  addSalle,
  updateSalle,
  deleteSalle,
};
