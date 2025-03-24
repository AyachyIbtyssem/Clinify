const radioService = require("../services/radio.service");

const addRadio = async (req, res) => {
  try {
    console.log("🔍 Requête reçue :", req.body, req.file);
    const nouvelleRadio = await radioService.addRadio(req.body, req.file);
    res.status(201).json(nouvelleRadio);
  } catch (error) {
    console.error("❌ Erreur dans addRadio :", error);
    res.status(400).json({ error: error.message });
  }
};

const getAllRadios = async (req, res) => {
  try {
    const radios = await radioService.getAllRadios();
    res.status(200).json(radios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRadioById = async (req, res) => {
  try {
    const radio = await radioService.getRadioById(req.params.id);
    res.status(200).json(radio);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addRadio,
  getAllRadios,
  getRadioById,
};
