const Radio = require("../models/radio.model");

const createRadio = async (data) => {
  try {
    return await Radio.create(data);
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout en base :", error);
    throw error;
  }
};

const findAllRadios = async () => {
  return await Radio.findAll();
};

const findRadioById = async (id) => {
  return await Radio.findByPk(id);
};

module.exports = {
  createRadio,
  findAllRadios,
  findRadioById,
};
