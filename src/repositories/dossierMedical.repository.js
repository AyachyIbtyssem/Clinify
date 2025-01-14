const DossierMedical = require('../models/dossierMedical.model');

// Récupérer tous les dossiers médicaux
const findAllDossiersMedical = () => {
  return DossierMedical.findAll();
};

// Trouver un dossier médical par ID
const findDossierMedicalById = (id) => {
  return DossierMedical.findByPk(id);
};

// Ajouter un nouveau dossier médical
const createDossierMedical = (dossierMedicalData) => {
  return DossierMedical.create(dossierMedicalData);
};

// Mettre à jour un dossier médical par ID
const updateDossierMedicalById = (id, dossierMedicalData) => {
  return DossierMedical.update(dossierMedicalData, { where: { id } });
};

// Supprimer un dossier médical par ID
const deleteDossierMedicalById = (id) => {
  return DossierMedical.destroy({ where: { id } });
};

module.exports = {
  findAllDossiersMedical,
  findDossierMedicalById,
  createDossierMedical,
  updateDossierMedicalById,
  deleteDossierMedicalById,
};
