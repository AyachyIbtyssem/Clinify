const consultationRepository = require("../repositories/consultation.repository");

// Récupérer toutes les consultations
const getAllConsultations = async () => {
  try {
    return await consultationRepository.findAllConsultations();
  } catch (error) {
    throw new Error("Erreur lors de la récupération des consultations");
  }
};

// Récupérer une consultation par ID
const getConsultationById = async (idConsultation) => {
  try {
    const consultation = await consultationRepository.findConsultationById(
      idConsultation
    );
    if (!consultation) {
      throw new Error("Consultation non trouvée");
    }
    return consultation;
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération de la consultation avec ID ${idConsultation}: ${error.message}`
    );
  }
};

// Ajouter une nouvelle consultation
const addConsultation = async (consultationData) => {
  try {
    return await consultationRepository.createConsultation(consultationData);
  } catch (error) {
    throw new Error("Erreur lors de l'ajout de la consultation");
  }
};

// Mettre à jour une consultation
const updateConsultation = async (idConsultation, consultationData) => {
  try {
    const updatedConsultation =
      await consultationRepository.updateConsultationById(
        idConsultation,
        consultationData
      );
    if (!updatedConsultation[0]) {
      throw new Error("Consultation non trouvée ou déjà mise à jour");
    }
    return updatedConsultation;
  } catch (error) {
    throw new Error(
      `Erreur lors de la mise à jour de la consultation avec ID ${idConsultation}: ${error.message}`
    );
  }
};

// Supprimer une consultation
const deleteConsultation = async (idConsultation) => {
  try {
    const deletedConsultation =
      await consultationRepository.deleteConsultationById(idConsultation);
    if (!deletedConsultation) {
      throw new Error("Consultation non trouvée");
    }
    return deletedConsultation;
  } catch (error) {
    throw new Error(
      `Erreur lors de la suppression de la consultation avec ID ${idConsultation}: ${error.message}`
    );
  }
};

module.exports = {
  getAllConsultations,
  getConsultationById,
  addConsultation,
  updateConsultation,
  deleteConsultation,
};
