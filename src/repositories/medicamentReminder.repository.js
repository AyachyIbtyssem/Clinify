// repositories/medicamentReminder.repository.js
const Medicament = require("../models/medicament.model");
const { Op } = require("sequelize");

/**
 * Récupère tous les médicaments dont le prochain rappel est dû.
 */
const getDueMedicaments = async () => {
  return await Medicament.findAll({
    where: {
      nextReminder: {
        [Op.lte]: new Date(),
      },
    },
  });
};

const getPatientMedicaments = async (dossierMedicalId, options = {}) => {
  const where = { dossierMedicalId };

  if (options.onlyActive) {
    where.nextReminder = { [Op.gte]: new Date() };
  }

  return await Medicament.findAll({
    where,
    order: [["nextReminder", "ASC"]],
  });
};

module.exports = { getDueMedicaments, getPatientMedicaments };
