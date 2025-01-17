const Medecin = require('../models/medecin.model');

// Récupérer tous les médecins
const findAllMedecins = () => {
  return Medecin.findAll();
};

// Trouver un médecin par ID
const findMedecinById = (id) => {
  return Medecin.findByPk(id);
};

// Ajouter un nouveau médecin
const createMedecin = (medecinData) => {
  return Medecin.create(medecinData);
};

// Mettre à jour un médecin par ID
const updateMedecinById = (id, medecinData) => {
  return Medecin.update(medecinData, { where: { id } });
};

// Supprimer un médecin par ID
const deleteMedecinById = (id) => {
  return Medecin.destroy({ where: { id } });
};

module.exports = {
  findAllMedecins,
  findMedecinById,
  createMedecin,
  updateMedecinById,
  deleteMedecinById,
};
