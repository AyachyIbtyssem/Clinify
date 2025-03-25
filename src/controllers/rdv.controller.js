const rdvService = require("../services/rdv.service");

// Récupérer tous les rendez-vous
const getRendezVous = async (req, res) => {
  try {
    const rendezVous = await rdvService.getAllRendezVous();
    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un rendez-vous par ID
const getRendezVousById = async (req, res) => {
  try {
    const rendezVous = await rdvService.getRendezVousById(req.params.id);
    res.json(rendezVous);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter un nouveau rendez-vous
const createRendezVous = async (req, res) => {
  try {
    const newRendezVous = await rdvService.addRendezVous(req.body);
    res.status(201).json(newRendezVous);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un rendez-vous
const updateRendezVous = async (req, res) => {
  try {
    const updatedRendezVous = await rdvService.updateRendezVous(
      req.params.id,
      req.body
    );
    res.json(updatedRendezVous);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer un rendez-vous
const deleteRendezVous = async (req, res) => {
  try {
    await rdvService.deleteRendezVous(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const annulerRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`ID du rendez-vous à annuler : ${id}`);

    const rendezVousAnnule = await rdvService.annulerRendezVous(id);
    res.status(200).json({
      message: "Rendez-vous annulé avec succès",
      rendezVous: rendezVousAnnule,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



//modifier date et heure d'un rdv par son id
const modifierRendezVous = async (req, res) => {
  try {
    const { id } = req.params; // ID du rendez-vous
    const { date, heure } = req.body; // Nouvelle date et heure

    const updatedRendezVous = await rdvService.modifierRendezVous(
      id,
      date,
      heure
    );
    res.status(200).json(updatedRendezVous);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//confirmer un rdv par son id (statu devient confirmé)
const confirmerRendezvous = async (req, res) => {
  try {
    const { id } = req.params; // ID du rendez-vous

    // Appeler la fonction du service pour confirmer le rendez-vous
    const rendezVousConfirme = await rdvService.confirmerRendezvous(id);

    // Réponse réussie
    res.status(200).json({
      message: "Rendez-vous confirmé avec succès",
      rendezVous: rendezVousConfirme,
    });
  } catch (error) {
    // Gestion des erreurs
    res.status(400).json({ message: error.message });
  }
};
const getRendezVousByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const rendezVous = await rdvService.getRendezVousByDate(date);
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findRendezVousByStatut = async (req, res) => {
  try {
    const { statut } = req.params;
    const rendezVous = await rdvService.findRendezVousByStatut(statut);
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getRendezVous,
  getRendezVousById,
  createRendezVous,
  updateRendezVous,
  deleteRendezVous,
  annulerRendezVous,
  modifierRendezVous,
  confirmerRendezvous,
  getRendezVousByDate,
  findRendezVousByStatut,
};
