const patientService = require("../services/patient.service");

// Récupérer tous les patients
const getPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un patient par ID
const getPatient = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    res.json(patient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter un nouveau patient
const createPatient = async (req, res) => {
  try {
    const newPatient = await patientService.addPatient(req.body);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un patient
const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await patientService.updatePatient(
      req.params.id,
      req.body
    );
    res.json(updatedPatient);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer un patient
const deletePatient = async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
};
