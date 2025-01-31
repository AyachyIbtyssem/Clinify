const Paiement = require("../models/paiement.model");

// Récupérer tous les paiements
const findAllPaiements = () => {
  return Paiement.findAll();
};

// Récupérer un paiement par ID
const findPaiementById = (id) => {
  return Paiement.findByPk(id);
};

// Créer un nouveau paiement
const createPaiement = (paiementData) => {
  return Paiement.create(paiementData);
};

// Mettre à jour un paiement par ID
const updatePaiementById = (id, paiementData) => {
  return Paiement.update(paiementData, {
    where: {
      idPaiement: id, // Utilisation cohérente du nom de la clé primaire (idPaiement)
    },
  });
};

// Supprimer un paiement par ID
const deletePaiementById = (id) => {
  return Paiement.destroy({
    where: {
      idPaiement: id, // Utilisation cohérente du nom de la clé primaire (idPaiement)
    },
  });
};

module.exports = {
  findAllPaiements,
  findPaiementById,
  createPaiement,
  updatePaiementById,
  deletePaiementById,
};
