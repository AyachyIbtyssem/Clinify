const radioRepository = require("../repositories/radio.repository");

const addRadio = async (data, file) => {
  if (!file) {
    throw new Error("L'image de la radio est requise !");
  }

  // Stocke uniquement le chemin relatif
  data.imagePath = `uploads/radios/${file.filename}`;

  console.log("📂 Données envoyées à la DB :", data);
  return await radioRepository.createRadio(data);
};

const getAllRadios = async () => {
  return await radioRepository.findAllRadios();
};

const getRadioById = async (id) => {
  const radio = await radioRepository.findRadioById(id);
  if (!radio) {
    throw new Error("Radio non trouvée !");
  }
  return radio;
};

module.exports = {
  addRadio,
  getAllRadios,
  getRadioById,
};
