const analyseRepository = require("../repositories/analyse.repository");

const addAnalyse = async (data, file) => {
  if (!file) {
    throw new Error("Le fichier PDF est requis !");
  }

  // Stocke uniquement le chemin relatif pour éviter des erreurs
  data.pdfPath = `uploads/${file.filename}`;

  console.log("📂 Données envoyées à la DB :", data); // <-- Ajout du log

  return await analyseRepository.createAnalyse(data);
};



const getAllAnalyses = async () => {
  return await analyseRepository.findAllAnalyses();
};

const getAnalyseById = async (id) => {
  const analyse = await analyseRepository.findAnalyseById(id);
  if (!analyse) {
    throw new Error("Analyse non trouvée !");
  }
  return analyse;
};

module.exports = {
  addAnalyse,
  getAllAnalyses,
  getAnalyseById,
};
