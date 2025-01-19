const traitementRepository = require('../repositories/traitement.repository');

const addTraitement = async (data) => {
  // Vous pouvez ajouter des validations supplémentaires ici
  if (!data.typeService || !data.cout || !data.dureeEstimee || !data.statut) {
    throw new Error("Tous les champs sont requis");
  }
  return await traitementRepository.createTraitement(data);
};

const getTraitementById = async (id) => {
  const traitement = await traitementRepository.findTraitementById(id);
  if (!traitement) {
    throw new Error("Traitement introuvable");
  }
  return traitement;
};

const getAllTraitements = async () => {
  return await traitementRepository.findAllTraitements();
};

const updateTraitement = async (id, updatedData) => {
  const [rowsUpdated] = await traitementRepository.updateTraitementById(id, updatedData);
  if (rowsUpdated === 0) {
    throw new Error("Traitement introuvable ou aucune modification effectuée");
  }
  return { message: "Traitement mis à jour avec succès" };
};

const deleteTraitement = async (id) => {
  const rowsDeleted = await traitementRepository.deleteTraitementById(id);
  if (rowsDeleted === 0) {
    throw new Error("Traitement introuvable");
  }
  return {
    message: "Traitement supprimé avec succès",
    id: id,
    };
  };
  
  module.exports = {
    addTraitement,
    getTraitementById,
    getAllTraitements,
    updateTraitement,
    deleteTraitement,
  };
  