const rdvRepository = require("../repositories/rdv.repository");

// Récupérer tous les rendez-vous
const getAllRendezVous = async () => {
  return await rdvRepository.findAllRendezVous();
};

// Récupérer un rendez-vous par ID
const getRendezVousById = async (id) => {
  const rdv = await rdvRepository.findRendezVousById(id);
  if (!rdv) {
    throw new Error("Rendez-vous non trouvé");
  }
  return rdv;
};

// Ajouter un nouveau rendez-vous
const addRendezVous = async (rdvData) => {
  return await rdvRepository.createRendezVous(rdvData);
};

// Mettre à jour un rendez-vous
const updateRendezVous = async (id, rdvData) => {
  const updatedRdv = await rdvRepository.updateRendezVousById(id, rdvData);
  if (updatedRdv[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Rendez-vous non trouvé");
  }
  return updatedRdv;
};

// Supprimer un rendez-vous
const deleteRendezVous = async (id) => {
  const deleted = await rdvRepository.deleteRendezVousById(id);
  if (!deleted) {
    throw new Error("Rendez-vous non trouvé");
  }
  return deleted;
};

module.exports = {
  getAllRendezVous,
  getRendezVousById,
  addRendezVous,
  updateRendezVous,
  deleteRendezVous,
};
