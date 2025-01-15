const Traitement = require('../models/traitement.model');

// CRUD de base pour Traitement
const createTraitement = async (data) => {
  return await Traitement.create(data);
};

const findTraitementById = async (id) => {
  return await Traitement.findByPk(id);
};

const findAllTraitements = async () => {
  return await Traitement.findAll();
};

const updateTraitementById = async (id, updatedData) => {
  return await Traitement.update(updatedData, {
    where: { id: id },
  });
};

const deleteTraitementById = async (id) => {
  return await Traitement.destroy({
    where: { id: id },
  });
};

module.exports = {
  createTraitement,
  findTraitementById,
  findAllTraitements,
  updateTraitementById,
  deleteTraitementById,
};
