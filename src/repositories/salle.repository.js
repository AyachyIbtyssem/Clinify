const Salle = require("../models/salle.model");

// Récupérer toutes les salles
const findAllSalles = () => {
  return Salle.findAll();
};

// Trouver une salle par ID
const findSalleById = (id) => {
  return Salle.findByPk(id);
};

// Ajouter une nouvelle salle
const createSalle = (salleData) => {
  return Salle.create(salleData);
};

// Mettre à jour une salle par ID
const updateSalleById = (id, salleData) => {
  return Salle.update(salleData, { where: { idSalle: id } });
};

// Supprimer une salle par ID
const deleteSalleById = (id) => {
  return Salle.destroy({ where: { idSalle: id } });
};

module.exports = {
  findAllSalles,
  findSalleById,
  createSalle,
  updateSalleById,
  deleteSalleById,
};
