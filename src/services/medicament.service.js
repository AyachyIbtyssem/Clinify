const medicamentRepository = require("../repositories/medicament.repository");

// Get all medications
const getAllMedicaments = async () => {
  return await medicamentRepository.findAllMedicaments();
};

// Get medication by ID
const getMedicamentById = async (id) => {
  const medicament = await medicamentRepository.findMedicamentById(id);
  if (!medicament) {
    throw new Error("Médicament non trouvé");
  }
  return medicament;
};

// Add new medication
const addMedicament = async (medicamentData) => {
  return await medicamentRepository.createMedicament(medicamentData);
};

// Update medication by ID
const updateMedicament = async (id, medicamentData) => {
  const updatedMedicament = await medicamentRepository.updateMedicamentById(
    id,
    medicamentData
  );
  if (updatedMedicament[0] === 0) {
    throw new Error("Médicament non trouvé");
  }
  return updatedMedicament;
};

// Delete medication by ID
const deleteMedicament = async (id) => {
  const deleted = await medicamentRepository.deleteMedicamentById(id);
  if (!deleted) {
    throw new Error("Médicament non trouvé");
  }
  return deleted;
};

// Get medications by medical record ID
const getMedicamentsByDossierId = async (dossierId) => {
  const medicaments = await medicamentRepository.findMedicamentsByDossierId(
    dossierId
  );

  if (!medicaments || medicaments.length === 0) {
    throw new Error("Aucun médicament trouvé pour ce dossier médical");
  }

  return medicaments;
};

// Add medication to medical record
const ajouterMedicamentAuDossier = async (dossierId, medicamentData) => {
  if (!dossierId) {
    throw new Error("L'ID du dossier médical est requis");
  }

  // Add dossier ID to medication data
  medicamentData.dossierMedicalId = dossierId;

  return await medicamentRepository.createMedicament(medicamentData);
};

const getDossierWithMedicaments = async (id) => {
  const dossier =
    await dossierMedicalRepository.findDossierMedicalWithMedicaments(id);
  if (!dossier) throw new Error("Dossier médical introuvable");
  return dossier;
};
module.exports = {
  getAllMedicaments,
  getMedicamentById,
  addMedicament,
  updateMedicament,
  deleteMedicament,
  getMedicamentsByDossierId,
  ajouterMedicamentAuDossier,
  getDossierWithMedicaments,
};
