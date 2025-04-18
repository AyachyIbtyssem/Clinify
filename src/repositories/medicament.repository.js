const Medicament = require("../models/medicament.model");
const DossierMedical = require("../models/dossierMedical.model");

// Get all medications
const findAllMedicaments = () => {
  return Medicament.findAll();
};

// Find medication by ID
const findMedicamentById = (id) => {
  return Medicament.findByPk(id);
};

// Create new medication
const createMedicament = (medicamentData) => {
  return Medicament.create(medicamentData);
};

// Update medication by ID
const updateMedicamentById = (id, medicamentData) => {
  return Medicament.update(medicamentData, { where: { id } });
};

// Delete medication by ID
const deleteMedicamentById = (id) => {
  return Medicament.destroy({ where: { id } });
};

// Find medications by medical record ID
const findMedicamentsByDossierId = (dossierId) => {
  return Medicament.findAll({
    where: { dossierMedicalId: dossierId },
    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  findAllMedicaments,
  findMedicamentById,
  createMedicament,
  updateMedicamentById,
  deleteMedicamentById,
  findMedicamentsByDossierId,
};
