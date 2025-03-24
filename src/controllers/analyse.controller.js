const analyseService = require("../services/analyse.service");

const addAnalyse = async (req, res) => {
  try {
    console.log("🔍 Requête reçue :", req.body, req.file);
    const nouvelleAnalyse = await analyseService.addAnalyse(req.body, req.file);
    res.status(201).json(nouvelleAnalyse);
  } catch (error) {
    console.error("❌ Erreur dans addAnalyse :", error);
    res.status(400).json({ error: error.message });
  }
};


const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await analyseService.getAllAnalyses();
    res.status(200).json(analyses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnalyseById = async (req, res) => {
  try {
    const analyse = await analyseService.getAnalyseById(req.params.id);
    res.status(200).json(analyse);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  addAnalyse,
  getAllAnalyses,
  getAnalyseById,
};
