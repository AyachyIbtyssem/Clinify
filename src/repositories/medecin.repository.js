<<<<<<< HEAD
const Medecin = require("../models/medecin.model");
=======
const Medecin = require('../models/medecin.model');

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Récupérer tous les médecins
const findAllMedecins = () => {
  return Medecin.findAll();
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Trouver un médecin par ID
const findMedecinById = (id) => {
  return Medecin.findByPk(id);
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Ajouter un nouveau médecin
const createMedecin = (medecinData) => {
  return Medecin.create(medecinData);
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Mettre à jour un médecin par ID
const updateMedecinById = (id, medecinData) => {
  return Medecin.update(medecinData, { where: { id } });
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
// Supprimer un médecin par ID
const deleteMedecinById = (id) => {
  return Medecin.destroy({ where: { id } });
};
<<<<<<< HEAD
=======

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
module.exports = {
  findAllMedecins,
  findMedecinById,
  createMedecin,
  updateMedecinById,
  deleteMedecinById,
};
