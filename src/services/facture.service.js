const factureRepository = require('../repositories/facture.repository');

// Ajouter une nouvelle facture
const addFacture = async (factureData) => {
  return await factureRepository.createFacture(factureData);
};

// Récupérer toutes les factures
const getAllFactures = async () => {
  return await factureRepository.findAllFactures();
};

// Récupérer une facture par ID
const getFactureById = async (id) => {
  const facture = await factureRepository.findFactureById(id);
  if (!facture) {
    throw new Error('Facture non trouvée');
  }
  return facture;
};

// Mettre à jour une facture par ID
const updateFacture = async (id, factureData) => {
  const updatedFacture = await factureRepository.updateFactureById(id, factureData);
  if (updatedFacture[0] === 0) { // Sequelize retourne [nombre de lignes affectées]
    throw new Error('Facture non trouvée');
  }
  return updatedFacture;
};

// Supprimer une facture par ID
const deleteFacture = async (id) => {
  const deleted = await factureRepository.deleteFactureById(id);
  if (!deleted) {
    throw new Error('Facture non trouvée');
  }
  return deleted;
};

module.exports = {
  addFacture,
  getAllFactures,
  getFactureById,
  updateFacture,
  deleteFacture,
};
