const DossierMedical = require("../models/dossierMedical.model");
const Patient = require("../models/patient.model");
const Medecin = require("../models/medecin.model");

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
// Récupérer le dossier médical d'un patient par son ID
const findDossierMedicalByPatientId = (patientId) => {
  return DossierMedical.findOne({
    where: { patientId: patientId }, // Filtrer par ID du patient
    include: [
      { model: Patient, as: "Patient", attributes: ["firstName", "lastName"] }, // Inclure les informations du patient
      { model: Medecin, as: "Medecin", attributes: ["firstName", "lastName"] }, // Inclure les informations du médecin
    ],
  });
};

module.exports = {
  findAllDossiersMedical,
  findDossierMedicalById,
  createDossierMedical,
  updateDossierMedicalById,
  deleteDossierMedicalById,
  findDossierMedicalByPatientId,
};
