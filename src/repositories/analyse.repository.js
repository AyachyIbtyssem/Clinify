const Analyse = require("../models/analyse.model");

const createAnalyse = async (data) => {
  try {
    return await Analyse.create(data);
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout en base :", error);
    throw error;
  }
};


const findAllAnalyses = async () => {
  return await Analyse.findAll();
};

const findAnalyseById = async (id) => {
  return await Analyse.findByPk(id);
};

module.exports = {
  createAnalyse,
  findAllAnalyses,
  findAnalyseById,
};
