const patientRepository = require('../repositories/patient.repository');

// Récupérer tous les patients
const getAllPatients = async () => {
  return await patientRepository.findAllPatients();
};

// Récupérer un patient par ID
const getPatientById = async (id) => {
  const patient = await patientRepository.findPatientById(id);
  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

// Ajouter un nouveau patient
const addPatient = async (patientData) => {
  return await patientRepository.createPatient(patientData);
};

// Mettre à jour un patient
const updatePatient = async (id, patientData) => {
  const updatedPatient = await patientRepository.updatePatientById(id, patientData);
  if (updatedPatient[0] === 0) { // Sequelize retourne [nombre de lignes affectées]
    throw new Error('Patient not found');
  }
  return updatedPatient;
};

// Supprimer un patient
const deletePatient = async (id) => {
  const deleted = await patientRepository.deletePatientById(id);
  if (!deleted) {
    throw new Error('Patient not found');
  }
  return deleted;
};

module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
};
