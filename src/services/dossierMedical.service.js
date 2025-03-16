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

module.exports = {
  getAllDossiersMedical,
  getDossierMedicalById,
  addDossierMedical,
  updateDossierMedical,
  deleteDossierMedical,
};
