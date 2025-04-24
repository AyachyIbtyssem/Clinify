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

const parseDurationToDays = (duree) => {
  if (/toujours/i.test(duree)) return Infinity;
  const jours = duree.match(/^(\d+)\s*jours?$/i);
  if (jours) return parseInt(jours[1]);
  const semaines = duree.match(/^(\d+)\s*semaines?$/i);
  if (semaines) return parseInt(semaines[1]) * 7;
  return 0;
};

const canTakeMedication = async (id) => {
  const medicament = await medicamentRepository.findMedicamentById(id);
  if (!medicament) throw new Error("Médicament non trouvé");

  if (medicament.duree.toLowerCase() === "toujours") return true;

  const durationInDays = parseDurationToDays(medicament.duree);
  const expirationDate = new Date(medicament.createdAt);
  expirationDate.setDate(expirationDate.getDate() + durationInDays);

  return new Date() <= expirationDate;
};

const marquerCommePris = async (id) => {
  const [affectedCount] = await medicamentRepository.updatePriseStatus(
    id,
    true
  );
  if (affectedCount === 0) throw new Error("Médicament non trouvé");
  return await getMedicamentById(id); // Retourne le médicament mis à jour
};

const marquerCommeNonPris = async (id) => {
  const [affectedCount] = await medicamentRepository.updatePriseStatus(
    id,
    false
  );
  if (affectedCount === 0) throw new Error("Médicament non trouvé");
  return await getMedicamentById(id);
};

const addMedicamentWithStatus = async (medicamentData) => {
  return await medicamentRepository.createMedicament({
    ...medicamentData,
    priseEffectuee: medicamentData.priseEffectuee || false,
    dernierePrise: medicamentData.priseEffectuee ? new Date() : null,
  });
};

const getActiveMedicamentsByDossierId = async (dossierId) => {
  const medicaments =
    await medicamentRepository.findActiveMedicamentsByDossierId(dossierId);

  if (!medicaments || medicaments.length === 0) {
    throw new Error("Aucun médicament actif trouvé pour ce dossier médical");
  }

  return medicaments;
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
  canTakeMedication,
  parseDurationToDays,
  marquerCommePris,
  marquerCommeNonPris,
  addMedicamentWithStatus,
  getActiveMedicamentsByDossierId,
};
