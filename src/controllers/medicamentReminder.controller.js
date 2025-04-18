// controllers/medicamentReminder.controller.js
const {
  processMedicamentsReminders,
  getPatientMedicaments,
} = require("../services/medicamentReminder.service");

/**
 * Endpoint permettant de déclencher manuellement le traitement des rappels de médicaments.
 */
const triggerReminders = async (req, res) => {
  try {
    const result = await processMedicamentsReminders();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du traitement des rappels" });
  }
};
const getPatientReminders = async (req, res) => {
  try {
    const { dossierMedicalId } = req.params;
    const medicaments = await getPatientMedicaments(dossierMedicalId);

    res.status(200).json(medicaments);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des rappels",
      details: error.message,
    });
  }
};
module.exports = { triggerReminders, getPatientReminders };
