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

const ajouterOrdonnance = async (idConsultation, ordonnance) => {
  // 1. Vérifier si la consultation existe
  const consultation = await consultationRepository.findConsultationById(
    idConsultation
  );
  if (!consultation) {
    throw new Error("Consultation non trouvée");
  }

  // Mettre à jour l'ordonnance
  const updatedConsultation = await consultationRepository.updateOrdonnanceById(
    idConsultation,
    ordonnance
  );

  if (updatedConsultation[0] === 0) {
    throw new Error("Échec de la mise à jour de l'ordonnance");
  }
  return await consultationRepository.findConsultationById(idConsultation);
};

// Récupérer les détails d'une consultation sous forme de chaîne de caractères
const getDetailsConsultation = async (idConsultation) => {
  const consultation = await consultationRepository.findConsultationById(
    idConsultation
  );
  if (!consultation) {
    throw new Error("Consultation non trouvée");
  }

  // Formater les détails de la consultation en une chaîne de caractères
  const details = `
    ID Consultation: ${consultation.idConsultation}
    Diagnostic: ${consultation.descriptionDiagnostic}
    Ordonnance: ${consultation.ordonnance || "Aucune ordonnance"}
    Recommandations: ${consultation.recommandations || "Aucune recommandation"}
    Notes du médecin: ${consultation.notesMedecin || "Aucune note"}
    ID Rendez-vous: ${consultation.rendezVousId}
    ID Patient: ${consultation.patientId}
  `;

  return details;
};

// Récupérer l'historique des consultations d'un patient
const consulterHistoriqueConsultations = async (patientId) => {
  const consultations =
    await consultationRepository.findConsultationsByPatientId(patientId);
  if (!consultations || consultations.length === 0) {
    throw new Error("Aucune consultation trouvée pour ce patient");
  }
  return consultations;
};

// Ajouter un diagnostic à une consultation
const ajouterDiagnostic = async (idConsultation, diagnostic) => {
  const consultation = await consultationRepository.findConsultationById(
    idConsultation
  );
  if (!consultation) {
    throw new Error("Consultation non trouvée");
  }
  const updatedConsultation = await consultationRepository.updateDiagnosticById(
    idConsultation,
    diagnostic
  );

  if (updatedConsultation[0] === 0) {
    throw new Error("Échec de la mise à jour du diagnostic");
  }
  return await consultationRepository.findConsultationById(idConsultation);
};

// Mettre à jour une consultation
const modifierConsultation = async (idConsultation, consultationData) => {
  try {
    const updatedConsultation =
      await consultationRepository.updateConsultationById(
        idConsultation,
        consultationData
      );
    if (updatedConsultation[0] === 0) {
      throw new Error("Consultation non trouvée ou déjà mise à jour");
    }
    return await consultationRepository.findConsultationById(idConsultation);
  } catch (error) {
    throw new Error(
      `Erreur lors de la mise à jour de la consultation avec ID ${idConsultation}: ${error.message}`
    );
  }
};

module.exports = {
  getAllConsultations,
  getConsultationById,
  addConsultation,
  updateConsultation,
  deleteConsultation,
  ajouterOrdonnance,
  getDetailsConsultation,
  consulterHistoriqueConsultations,
  ajouterDiagnostic,
  modifierConsultation,
};
