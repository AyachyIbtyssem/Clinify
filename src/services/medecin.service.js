const medecinRepository = require("../repositories/medecin.repository");
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
module.exports = {
  getAllMedecins,
  getMedecinById,
  addMedecin,
  updateMedecin,
  deleteMedecin,
};
