const RendezVous = require("../models/rdv.model");

// Récupérer tous les rendez-vous
const findAllRendezVous = () => {
  return RendezVous.findAll();
};

// Trouver un rendez-vous par ID
const findRendezVousById = (id) => {
  return RendezVous.findByPk(id);
};

// Ajouter un nouveau rendez-vous
const createRendezVous = (rdvData) => {
  return RendezVous.create(rdvData);
};

// Mettre à jour un rendez-vous par ID
const updateRendezVousById = (id, rdvData) => {
  return RendezVous.update(rdvData, { where: { idRDV: id } });
};

// Supprimer un rendez-vous par ID
const deleteRendezVousById = (id) => {
  return RendezVous.destroy({ where: { idRDV: id } });
};

module.exports = {
  findAllRendezVous,
  findRendezVousById,
  createRendezVous,
  updateRendezVousById,
  deleteRendezVousById,
};
