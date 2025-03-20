const patientRepository = require("../repositories/patient.repository");
const Patient = require("../models/patient.model");
const DossierMedical = require("../models/dossierMedical.model");
const Medecin = require("../models/medecin.model");
const RendezVous = require("../models/rdv.model");

// Récupérer tous les patients
const getAllPatients = async () => {
  return await patientRepository.findAllPatients();
};

// Récupérer un patient par ID
const getPatientById = async (id) => {
  const patient = await patientRepository.findPatientById(id);
  if (!patient) {
    throw new Error("Patient not found");
  }
  return patient;
};

// Ajouter un nouveau patient
const addPatient = async (patientData) => {
  return await patientRepository.createPatient(patientData);
};

// Mettre à jour un patient
const updatePatient = async (id, patientData) => {
  const updatedPatient = await patientRepository.updatePatientById(
    id,
    patientData
  );
  if (updatedPatient[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Patient not found");
  }
  return updatedPatient;
};

// Supprimer un patient
const deletePatient = async (id) => {
  const deleted = await patientRepository.deletePatientById(id);
  if (!deleted) {
    throw new Error("Patient not found");
  }
  return deleted;
};

// Consulter le dossier médical d'un patient par ID
const consulterDossierMedical = async (patientId) => {
  try {
    const dossiers = await DossierMedical.findAll({
      where: { patientId: patientId }, // Filtrer par patientId
      include: [
        {
          model: Patient,
          as: "Patient",
          attributes: ["firstName", "lastName"],
        }, // Inclure les infos du patient
        {
          model: Medecin,
          as: "Medecin",
          attributes: ["firstName", "lastName"],
        }, // Inclure les infos du médecin
      ],
    });

    if (!dossiers || dossiers.length === 0) {
      throw new Error("Aucun dossier médical trouvé pour ce patient");
    }

    return dossiers; // Retourne les dossiers trouvés
  } catch (error) {
    throw new Error(error.message); // Gérer les erreurs
  }
};

// Fonction pour prendre un rendez-vous
const prendreRendezvous = async (rendezVousData) => {
  try {
    // Vérifier si le patient existe
    const patient = await Patient.findByPk(rendezVousData.IdPatient);
    if (!patient) {
      throw new Error("Patient non trouvé");
    }

    // Vérifier si le médecin existe
    const medecin = await Medecin.findByPk(rendezVousData.IdMedecin);
    if (!medecin) {
      throw new Error("Médecin non trouvé");
    }

    // Créer le rendez-vous
    const nouveauRendezVous = await RendezVous.create({
      date: rendezVousData.date,
      heure: rendezVousData.heure,
      statut: "en attente", // Par défaut
      typeRendezVous: rendezVousData.typeRendezVous,
      IdPatient: rendezVousData.IdPatient,
      IdMedecin: rendezVousData.IdMedecin,
    });

    return nouveauRendezVous;
  } catch (error) {
    throw new Error(`Erreur lors de la prise de rendez-vous : ${error.message}`);
  }
};

const findRendezVousByPatientId = async (idPatient) => {
  try {
    const rendezVous = await RendezVous.findAll({
      where: { IdPatient: idPatient },
      include: [
        {
          model: Medecin,
          as: "Medecin",
          attributes: ["firstName", "lastName"], // Optionnel : récupérer le médecin
        },
      ],
    });

    if (!rendezVous || rendezVous.length === 0) {
      throw new Error("Aucun rendez-vous trouvé pour ce patient");
    }

    return rendezVous;
  } catch (error) {
    throw new Error(error.message);
  }
};



module.exports = {
  getAllPatients,
  getPatientById,
  addPatient,
  updatePatient,
  deletePatient,
  consulterDossierMedical,
  prendreRendezvous,
  findRendezVousByPatientId,
};
