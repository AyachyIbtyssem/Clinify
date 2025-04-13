const RendezVous = require("../models/rdv.model");
const Patient = require("../models/patient.model");
const Medecin = require("../models/medecin.model");

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

const annulerRendezVous = async (id) => {
  try {
    const rdv = await RendezVous.findByPk(id);
    if (!rdv) {
      throw new Error(`Aucun rendez-vous trouvé avec l'ID ${id}`);
    }

    if (rdv.statut === "annulé") {
      throw new Error("Le rendez-vous est déjà annulé.");
    }

    rdv.statut = "annulé"; // Modification du statut
    await rdv.save();

    return rdv;
  } catch (error) {
    throw new Error(
      `Erreur lors de l'annulation du rendez-vous : ${error.message}`
    );
  }
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
const findRendezVousByDate = async (date) => {
  return await RendezVous.findAll({
    where: { date: date },
  });
};

const findRendezVousByStatut = async (statut) => {
  return await RendezVous.findAll({
    where: { statut: statut },
  });
};

const findRendezVousByPatientId = (patientId) => {
  return RendezVous.findAll({
    where: { IdPatient: patientId },
    include: [
      {
        model: Medecin,
        as: "Medecin",
        attributes: [
          "id",
          "firstName",
          "lastName",
          "specialty",
          "numSalle",
          "nomDept",
        ], // Inclure les infos du médecin
      },
    ],
    order: [
      ["date", "ASC"], // Trier par date (plus ancien au plus récent)
      ["heure", "ASC"], // Trier par heure
    ],
  });
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
  findRendezVousByDate,
  findRendezVousByStatut,
  findRendezVousByPatientId,
};
