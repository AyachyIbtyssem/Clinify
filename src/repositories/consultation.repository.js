const Consultation = require("../models/consultation.model");

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

module.exports = {
  findAllConsultations,
  findConsultationById,
  createConsultation,
  updateConsultationById,
  deleteConsultationById,
};
