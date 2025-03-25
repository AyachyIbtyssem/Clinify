const dossierMedicalRepository = require("../repositories/dossierMedical.repository");

// Récupérer tous les dossiers médicaux
const getAllDossiersMedical = async () => {
  return await dossierMedicalRepository.findAllDossiersMedical();
};

// Récupérer un dossier médical par ID
const getDossierMedicalById = async (id) => {
  const dossierMedical = await dossierMedicalRepository.findDossierMedicalById(
    id
  );
  if (!dossierMedical) {
    throw new Error("Dossier médical non trouvé");
  }
  return dossierMedical;
};

// Ajouter un nouveau dossier médical
const addDossierMedical = async (dossierMedicalData) => {
  return await dossierMedicalRepository.createDossierMedical(
    dossierMedicalData
  );
};

// Mettre à jour un dossier médical par ID
const updateDossierMedical = async (id, dossierMedicalData) => {
  const updatedDossier =
    await dossierMedicalRepository.updateDossierMedicalById(
      id,
      dossierMedicalData
    );
  if (updatedDossier[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Dossier médical non trouvé");
  }
  return updatedDossier;
};

// Supprimer un dossier médical par ID
const deleteDossierMedical = async (id) => {
  const deleted = await dossierMedicalRepository.deleteDossierMedicalById(id);
  if (!deleted) {
    throw new Error("Dossier médical non trouvé");
  }
  return deleted;
};

//  Ajouter une analyse à un dossier médical
const ajouterAnalyse = async (patientId, nouvelleAnalyse) => {
  if (!patientId || !nouvelleAnalyse) {
    throw new Error("L'ID du patient et l'analyse sont requis.");
  }

  // Récupérer le dossier médical du patient
  const dossierMedical =
    await dossierMedicalRepository.findDossierMedicalByPatientId(patientId);

  if (!dossierMedical) {
    throw new Error("Dossier médical introuvable pour ce patient.");
  }

  // Ajouter la nouvelle analyse au tableau
  const analyses = Array.isArray(dossierMedical.analyse)
    ? dossierMedical.analyse
    : [];
  analyses.push(nouvelleAnalyse);

  // Mettre à jour le dossier médical
  dossierMedical.analyse = analyses;
  await dossierMedical.save();

  return dossierMedical;
};

//  Vérifier si un patient a un dossier médical
const verifierDossierPatient = async (patientId) => {
  if (!patientId) {
    throw new Error("L'ID du patient est invalide.");
  }
  const dossier = await dossierMedicalRepository.findDossierMedicalByPatientId(
    patientId
  );
  return dossier !== null;
};

const getDossiersMedicalByPatientId = async (patientId) => {
  const dossiers =
    await dossierMedicalRepository.findDossiersMedicalByPatientId(patientId);

  if (!dossiers || dossiers.length === 0) {
    throw new Error("Aucun dossier médical trouvé pour ce patient");
  }

  return dossiers;
};
module.exports = {
  getAllDossiersMedical,
  getDossierMedicalById,
  addDossierMedical,
  updateDossierMedical,
  deleteDossierMedical,
  ajouterAnalyse,
  verifierDossierPatient,
  getDossiersMedicalByPatientId,
};
