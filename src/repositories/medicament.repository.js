const Medicament = require("../models/medicament.model");
const DossierMedical = require("../models/dossierMedical.model");
const { Op } = require("sequelize"); // Ajoutez cette ligne
const sequelize = require("../config/database"); // Importez votre instance Sequelize

// Get all medications
const findAllMedicaments = () => {
  return Medicament.findAll();
};

// Find medication by ID
const findMedicamentById = (id) => {
  return Medicament.findByPk(id);
};

// Create new medication
const createMedicament = (medicamentData) => {
  return Medicament.create(medicamentData);
};

// Update medication by ID
const updateMedicamentById = (id, medicamentData) => {
  return Medicament.update(medicamentData, { where: { id } });
};

// Delete medication by ID
const deleteMedicamentById = (id) => {
  return Medicament.destroy({ where: { id } });
};

// Find medications by medical record ID
const findMedicamentsByDossierId = (dossierId) => {
  return Medicament.findAll({
    where: { dossierMedicalId: dossierId },
    order: [["createdAt", "DESC"]],
  });
};

const findActiveMedicamentsByDossierId = (dossierId) => {
  return Medicament.findAll({
    where: {
      dossierMedicalId: dossierId,
      [Op.or]: [
        { duree: "toujours" },
        {
          [Op.and]: [
            sequelize.literal(`
              DATE_ADD(createdAt, INTERVAL 
                CASE 
                  WHEN duree LIKE '%jours%' THEN CAST(SUBSTRING_INDEX(duree, ' ', 1) AS SIGNED)
                  WHEN duree LIKE '%semaines%' THEN CAST(SUBSTRING_INDEX(duree, ' ', 1) AS SIGNED) * 7
                  ELSE 0
                END DAY) > NOW()
            `),
          ],
        },
      ],
    },
    order: [["nextReminder", "ASC"]],
  });
};

const updatePriseStatus = (id, priseEffectuee) => {
  return Medicament.update(
    {
      priseEffectuee,
      dernierePrise: priseEffectuee ? new Date() : null,
    },
    { where: { id } }
  );
};

module.exports = {
  findAllMedicaments,
  findMedicamentById,
  createMedicament,
  updateMedicamentById,
  deleteMedicamentById,
  findMedicamentsByDossierId,
  findActiveMedicamentsByDossierId,
  updatePriseStatus,
};
