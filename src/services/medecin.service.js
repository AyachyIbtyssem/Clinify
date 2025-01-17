<<<<<<< HEAD
const medecinRepository = require("../repositories/medecin.repository");
=======
const medecinRepository = require('../repositories/medecin.repository');

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Récupérer tous les médecins
const getAllMedecins = async () => {
  return await medecinRepository.findAllMedecins();
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Récupérer un médecin par ID
const getMedecinById = async (id) => {
  const medecin = await medecinRepository.findMedecinById(id);
  if (!medecin) {
<<<<<<< HEAD
    throw new Error("Médecin non trouvé");
  }
  return medecin;
};
=======
    throw new Error('Médecin non trouvé');
  }
  return medecin;
};

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Ajouter un nouveau médecin
const addMedecin = async (medecinData) => {
  return await medecinRepository.createMedecin(medecinData);
};
<<<<<<< HEAD
// Mettre à jour un médecin
const updateMedecin = async (id, medecinData) => {
  const updatedMedecin = await medecinRepository.updateMedecinById(
    id,
    medecinData
  );
  if (updatedMedecin[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Médecin non trouvé");
  }
  return updatedMedecin;
};
=======

// Mettre à jour un médecin
const updateMedecin = async (id, medecinData) => {
  const updatedMedecin = await medecinRepository.updateMedecinById(id, medecinData);
  if (updatedMedecin[0] === 0) { // Sequelize retourne [nombre de lignes affectées]
    throw new Error('Médecin non trouvé');
  }
  return updatedMedecin;
};

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Supprimer un médecin
const deleteMedecin = async (id) => {
  const deleted = await medecinRepository.deleteMedecinById(id);
  if (!deleted) {
<<<<<<< HEAD
    throw new Error("Médecin non trouvé");
  }
  return deleted;
};
=======
    throw new Error('Médecin non trouvé');
  }
  return deleted;
};

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
module.exports = {
  getAllMedecins,
  getMedecinById,
  addMedecin,
  updateMedecin,
  deleteMedecin,
};
