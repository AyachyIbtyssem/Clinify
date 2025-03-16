const Consultation = require("../models/consultation.model");
const RendezVous = require("../models/rdv.model");

// Récupérer toutes les consultations
const findAllConsultations = () => {
  return Consultation.findAll();
};

// Trouver une consultation par ID
const findConsultationById = (idConsultation) => {
  return Consultation.findByPk(idConsultation);
};

// Ajouter une nouvelle consultation
const createConsultation = (consultationData) => {
  return Consultation.create(consultationData);
};

// Mettre à jour une consultation par ID
const updateConsultationById = (idConsultation, consultationData) => {
  return Consultation.update(consultationData, { where: { idConsultation } });
};

// Supprimer une consultation par ID
const deleteConsultationById = (idConsultation) => {
  return Consultation.destroy({ where: { idConsultation } });
};

// Mettre à jour l'ordonnance d'une consultation par ID
const updateOrdonnanceById = (idConsultation, ordonnance) => {
  return Consultation.update({ ordonnance }, { where: { idConsultation } });
};

// Récupérer toutes les consultations d'un patient par son ID
const findConsultationsByPatientId = (patientId) => {
  return Consultation.findAll({
    where: { patientId },
    include: [
      { model: RendezVous, as: "rendezVous", attributes: ["date", "heure"] },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// Mettre à jour le diagnostic d'une consultation par ID
const updateDiagnosticById = (idConsultation, diagnostic) => {
  return Consultation.update(
    { descriptionDiagnostic: diagnostic },
    { where: { idConsultation } }
  );
};

module.exports = {
  findAllConsultations,
  findConsultationById,
  createConsultation,
  updateConsultationById,
  deleteConsultationById,
  updateOrdonnanceById,
  findConsultationsByPatientId,
  updateDiagnosticById,
};
