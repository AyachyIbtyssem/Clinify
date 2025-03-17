const Patient = require("../models/patient.model");

// Récupérer tous les patients
const findAllPatients = () => {
  return Patient.findAll();
};

// Trouver un patient par ID
const findPatientById = (id) => {
  return Patient.findByPk(id);
};

// Ajouter un nouveau patient
const createPatient = (patientData) => {
  return Patient.create(patientData);
};

// Mettre à jour un patient par ID
const updatePatientById = (id, patientData) => {
  return Patient.update(patientData, { where: { id } });
};

// Supprimer un patient par ID
const deletePatientById = (id) => {
  return Patient.destroy({ where: { id } });
};

const updatePassword = async (email, hashedPassword) => {
  const patient = await findByEmail(email);
  if (!patient) return null;
  
  patient.password = hashedPassword;
  await patient.save();
  return patient;
};

module.exports = {
  findAllPatients,
  findPatientById,
  createPatient,
  updatePatientById,
  deletePatientById,
  updatePassword,
};
