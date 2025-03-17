const RendezVous = require("../models/rdv.model");
const Patient = require("../models/patient.model");

// Récupérer tous les rendez-vous
const findAllRendezVous = () => {
  return RendezVous.findAll();
};

// Trouver un rendez-vous par ID
const findRendezVousById = (id) => {
  return RendezVous.findByPk(id);
};

// Ajouter un nouveau rendez-vous
const createRendezVous = (rdvData) => {
  return RendezVous.create(rdvData);
};

// Mettre à jour un rendez-vous par ID
const updateRendezVousById = (id, rdvData) => {
  return RendezVous.update(rdvData, { where: { idRDV: id } });
};

// Supprimer un rendez-vous par ID
const deleteRendezVousById = (id) => {
  return RendezVous.destroy({ where: { idRDV: id } });
};

const findAllRendezVousByMedecinId = (medecinId) => {
  return RendezVous.findAll({
    where: { IdMedecin: medecinId }, // Filtrer par ID du médecin
    attributes: [
      "idRDV",
      "date",
      "heure",
      "statut",
      "typeRendezVous",
      "IdPatient",
    ], // Champs à inclure pour RendezVous
    include: [
      {
        model: Patient,
        as: "Patient",
        attributes: ["firstName", "lastName"], // Champs à inclure pour Patient
      },
      {
        model: Medecin,
        as: "Medecin",
        attributes: ["numSalle", "nomDept"], // Ajouter les champs du médecin
      },
    ],
    order: [
      ["date", "ASC"], // Trier par date
      ["heure", "ASC"], // Trier par heure
    ],
  });
};

const annulerRendezVous = async (idRDV) => {
  const rendezVous = await RendezVous.findByPk(idRDV);

  if (!rendezVous) {
    throw new Error("Rendez-vous non trouvé.");
  }
  rendezVous.statut = "Annulé";
  await rendezVous.save();

  return rendezVous;
};

////modifier date et heure d'un rdv par son id
const modifierRendezVous = async (id, date, heure) => {
  try {
    const [updatedRows] = await RendezVous.update(
      { date, heure },
      { where: { idRDV: id } }
    );

    if (updatedRows === 0) {
      throw new Error("Rendez-vous non trouvé");
    }

    const updatedRdv = await RendezVous.findByPk(id);
    return updatedRdv;
  } catch (error) {
    throw new Error(
      `Erreur lors de la modification du rendez-vous : ${error.message}`
    );
  }
};

const confirmerRendezvous = async (id) => {
  try {
    const [updatedRows] = await RendezVous.update(
      { statut: "validé" },
      { where: { idRDV: id } }
    );
    if (updatedRows === 0) {
      throw new Error("Rendez-vous non trouvé");
    }
    const updatedRdv = await RendezVous.findByPk(id);
    return updatedRdv;
  } catch (error) {
    throw new Error(
      `Erreur lors de la confirmation du rendez-vous : ${error.message}`
    );
  }
};

module.exports = {
  findAllRendezVous,
  findRendezVousById,
  createRendezVous,
  updateRendezVousById,
  deleteRendezVousById,
  findAllRendezVousByMedecinId,
  annulerRendezVous,
  modifierRendezVous,
  confirmerRendezvous,
};
