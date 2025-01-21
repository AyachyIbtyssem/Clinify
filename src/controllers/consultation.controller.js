const consultationService = require("../services/consultation.service");

// Récupérer toutes les consultations
const getConsultations = async (req, res) => {
  try {
    const consultations = await consultationService.getAllConsultations();
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer une consultation par ID
const getConsultation = async (req, res) => {
  try {
    const consultation = await consultationService.getConsultationById(
      req.params.idConsultation
    );
    if (!consultation) {
      return res.status(404).json({ message: "Consultation non trouvée" });
    }
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter une nouvelle consultation
const createConsultation = async (req, res) => {
  try {
    const newConsultation = await consultationService.addConsultation(req.body);
    res.status(201).json(newConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour une consultation
const updateConsultation = async (req, res) => {
  try {
    const updatedConsultation = await consultationService.updateConsultation(
      req.params.idConsultation,
      req.body
    );

    if (!updatedConsultation) {
      return res.status(404).json({ message: "Consultation introuvable" });
    }

    res.json({
      message: "Consultation mise à jour avec succès",
      consultation: updatedConsultation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};

// Supprimer une consultation
const deleteConsultation = async (req, res) => {
  try {
    const result = await consultationService.deleteConsultation(
      req.params.idConsultation
    );

    if (!result) {
      return res.status(404).json({ message: "Consultation non trouvée" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getConsultations,
  getConsultation,
  createConsultation,
  updateConsultation,
  deleteConsultation,
};
