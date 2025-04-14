const hfService = require("../services/huggingface.service");
const Patient = require("../models/patient.model");
const PatientHealthProfile = require("../models/patientHealthProfile.model");
const Analyse = require("../models/analyse.model");

exports.getRecommendations = async (req, res) => {
  try {
    const { patientId } = req.params;

    const [patient, healthProfile, analyses] = await Promise.all([
      Patient.findByPk(patientId),
      PatientHealthProfile.findOne({ where: { patientId } }),
      Analyse.findAll({ where: { patientId } }),
    ]);

    if (!patient || !healthProfile) {
      return res.status(404).json({ error: "Données patient introuvables" });
    }

    const recommendations = await hfService.generateHealthRecommendations(
      patient.get({ plain: true }),
      healthProfile.get({ plain: true }),
      analyses.map((a) => a.get({ plain: true }))
    );

    res.json({
      patient: `${patient.firstName} ${patient.lastName}`,
      ...recommendations,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({
      error: "Échec de génération des recommandations",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
