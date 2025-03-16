const medecinRepository = require("../repositories/medecin.repository");
const rdvRepository = require("../repositories/rdv.repository");
const dossierMedicalRepository = require("../repositories/dossierMedical.repository");

// Récupérer tous les médecins
const getAllMedecins = async () => {
  return await medecinRepository.findAllMedecins();
};

// Récupérer un médecin par ID
const getMedecinById = async (id) => {
  const medecin = await medecinRepository.findMedecinById(id);
  if (!medecin) {
    throw new Error("Médecin non trouvé");
  }
  return medecin;
};

// Ajouter un nouveau médecin
const addMedecin = async (medecinData) => {
  return await medecinRepository.createMedecin(medecinData);
};

// Mettre à jour un médecin
const updateMedecin = async (id, medecinData) => {
  const updatedMedecin = await medecinRepository.updateMedecinById(
    id,
    medecinData
  );
  if (updatedMedecin[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Médecin non trouvé");
  }
  return updatedMedecin;
};

// Supprimer un médecin
const deleteMedecin = async (id) => {
  const deleted = await medecinRepository.deleteMedecinById(id);
  if (!deleted) {
    throw new Error("Médecin non trouvé");
  }
  return deleted;
};
// Voir la liste des rendez-vous d'un médecin
const voirLaListeDesRendezVous = async (medecinId) => {
  // Vérifier si le médecin existe
  const medecin = await medecinRepository.findMedecinById(medecinId);
  if (!medecin) {
    throw new Error("Médecin non trouvé");
  }
  const rendezVous = await rdvRepository.findAllRendezVousByMedecinId(
    medecinId
  );
  return rendezVous;
};

// Vérifier le dossier médical d'un patient
const verifierDossierPatient = async (patientId) => {
  // 1. Vérifier si le patient a un dossier médical
  const dossierMedical =
    await dossierMedicalRepository.findDossierMedicalByPatientId(patientId);

  if (!dossierMedical) {
    throw new Error("Aucun dossier médical trouvé pour ce patient");
  }
  return dossierMedical;
};

module.exports = {
  getAllMedecins,
  getMedecinById,
  addMedecin,
  updateMedecin,
  deleteMedecin,
  voirLaListeDesRendezVous,
  verifierDossierPatient,
};
