const rdvRepository = require("../repositories/rdv.repository");
const RendezVous = require("../models/rdv.model");

// Récupérer tous les rendez-vous
const getAllRendezVous = async () => {
  return await rdvRepository.findAllRendezVous();
};

// Récupérer un rendez-vous par ID
const getRendezVousById = async (id) => {
  const rdv = await rdvRepository.findRendezVousById(id);
  if (!rdv) {
    throw new Error("Rendez-vous non trouvé");
  }
  return rdv;
};

// Ajouter un nouveau rendez-vous
const addRendezVous = async (rdvData) => {
  return await rdvRepository.createRendezVous(rdvData);
};

// Mettre à jour un rendez-vous
const updateRendezVous = async (id, rdvData) => {
  const updatedRdv = await rdvRepository.updateRendezVousById(id, rdvData);
  if (updatedRdv[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Rendez-vous non trouvé");
  }
  return updatedRdv;
};

// Supprimer un rendez-vous
const deleteRendezVous = async (id) => {
  const deleted = await rdvRepository.deleteRendezVousById(id);
  if (!deleted) {
    throw new Error("Rendez-vous non trouvé");
  }
  return deleted;
};

const annulerRendezVous = async (id) => {
  try {
    const rendezVousAnnule = await rdvRepository.annulerRendezVous(id);
    return rendezVousAnnule;
  } catch (error) {
    throw new Error(`Erreur lors de l'annulation : ${error.message}`);
  }
};



////modifier date et heure d'un rdv par son id
const modifierRendezVous = async (id, date, heure) => {
  try {
    const rdv = await rdvRepository.findRendezVousById(id);
    if (!rdv) {
      throw new Error("Rendez-vous non trouvé");
    }

    // Mettre à jour la date et l'heure
    rdv.date = date;
    rdv.heure = heure;

    // Sauvegarder les modifications
    const updatedRdv = await rdv.save();
    return updatedRdv;
  } catch (error) {
    throw new Error(
      `Erreur lors de la modification du rendez-vous : ${error.message}`
    );
  }
};

//confirmé un rdv
const confirmerRendezvous = async (id) => {
  try {
    const rdv = await RendezVous.findByPk(id);
    if (!rdv) {
      throw new Error("Rendez-vous non trouvé");
    }
    rdv.statut = "validé";
    const updatedRdv = await rdv.save();
    return updatedRdv;
  } catch (error) {
    throw new Error(
      `Erreur lors de la confirmation du rendez-vous : ${error.message}`
    );
  }
};
const getRendezVousByDate = async (date) => {
  try {
    const rendezVous = await rdvRepository.findRendezVousByDate(date);
    return rendezVous;
  } catch (error) {
    throw new Error(`Erreur lors de la récupération des rendez-vous : ${error.message}`);
  }
};

const findRendezVousByStatut = async (statut) => {
  try{
    const rendezVous = await rdvRepository.findRendezVousByStatut(statut);
    return rendezVous;
  }catch(error){
    throw new Error(`Erreur lors de la récupération des rendez-vous : ${error.message}`);
  }
};



module.exports = {
  getAllRendezVous,
  getRendezVousById,
  addRendezVous,
  updateRendezVous,
  deleteRendezVous,
  annulerRendezVous,
  modifierRendezVous,
  confirmerRendezvous,
  getRendezVousByDate,
  findRendezVousByStatut,
};
