const service = require("../services/patientHealthProfile.service");

exports.createOrUpdate = async (req, res) => {
  try {
    const result = await service.updateHealthProfile(
      req.params.patientId,
      req.body
    );
    res.status(result.message.includes("créé") ? 201 : 200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getByPatientId = async (req, res) => {
  try {
    const profile = await service.getHealthProfile(req.params.patientId);
    res.json(profile);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
