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
const findDossiersMedicalByPatientId = (patientId) => {
  return DossierMedical.findAll({
    where: { patientId },
    include: [
      {
        model: Patient,
        as: "Patient",
        attributes: ["firstName", "lastName"],
      },
      {
        model: Medecin,
        as: "Medecin",
        attributes: ["firstName", "lastName", "specialty"],
      },
    ],
    order: [["createdAt", "DESC"]], // Optionnel: tri par date
  });
};

module.exports = {
  findAllDossiersMedical,
  findDossierMedicalById,
  createDossierMedical,
  updateDossierMedicalById,
  deleteDossierMedicalById,
  findDossiersMedicalByPatientId,
};
