const Paiement = require("../models/paiement.model");

const findAllPaiements = async () => {
  return await Paiement.findAll();
};

const findPaiementById = async (id) => {
  return await Paiement.findByPk(id);
};

const createPaiement = async (paiementData) => {
  return await Paiement.create(paiementData);
};

module.exports = {
  findAllPaiements,
  findPaiementById,
  createPaiement,
};
