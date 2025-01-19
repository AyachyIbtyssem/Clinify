const Facture = require('../models/facture.model');

// Récupérer toutes les factures
const findAllFactures = () => {
  return Facture.findAll();
};

// Récupérer une facture par ID
const findFactureById = (id) => {
  return Facture.findByPk(id);
};

// Créer une nouvelle facture
const createFacture = (factureData) => {
  return Facture.create(factureData);
};

// Mettre à jour une facture par ID
const updateFactureById = (id, factureData) => {
  return Facture.update(factureData, {
    where: {
      id: id, // Utilisation cohérente du nom de la clé primaire (id)
    },
  });
};

// Supprimer une facture par ID
const deleteFactureById = (id) => {
  return Facture.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  findAllFactures,
  findFactureById,
  createFacture,
  updateFactureById,
  deleteFactureById,
};
