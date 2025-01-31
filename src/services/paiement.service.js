const paiementRepository = require("../repositories/paiement.repository");

// Récupérer tous les paiements
const getAllPaiements = async () => {
  return await paiementRepository.findAllPaiements();
};

// Récupérer un paiement par ID
const getPaiementById = async (id) => {
  const paiement = await paiementRepository.findPaiementById(id);
  if (!paiement) {
    throw new Error("Paiement non trouvé");
  }
  return paiement;
};

// Ajouter un nouveau paiement
const addPaiement = async (paiementData) => {
  return await paiementRepository.createPaiement(paiementData);
};

// Mettre à jour un paiement
const updatePaiement = async (id, paiementData) => {
  const updatedPaiement = await paiementRepository.updatePaiementById(
    id,
    paiementData
  );
  if (updatedPaiement[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Paiement non trouvé");
  }
  return updatedPaiement;
};

// Supprimer un paiement
const deletePaiement = async (id) => {
  const deleted = await paiementRepository.deletePaiementById(id);
  if (!deleted) {
    throw new Error("Paiement non trouvé");
  }
  return deleted;
};

module.exports = {
  getAllPaiements,
  getPaiementById,
  addPaiement,
  updatePaiement,
  deletePaiement,
};
