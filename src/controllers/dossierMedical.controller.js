const dossierMedicalService = require('../services/dossierMedical.service');

// Récupérer tous les dossiers médicaux
const getDossiersMedical = async (req, res) => {
  try {
    const dossiers = await dossierMedicalService.getAllDossiersMedical();
    res.json(dossiers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un dossier médical par ID
const getDossierMedical = async (req, res) => {
  try {
    const dossier = await dossierMedicalService.getDossierMedicalById(req.params.id);
    res.json(dossier);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter un nouveau dossier médical
const createDossierMedical = async (req, res) => {
  try {
    const newDossier = await dossierMedicalService.addDossierMedical(req.body);
    res.status(201).json(newDossier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un dossier médical
const updateDossierMedical = async (req, res) => {
  try {
    const updatedDossier = await dossierMedicalService.updateDossierMedical(req.params.id, req.body);

    if (!updatedDossier) {
      // Si aucun dossier n'a été trouvé ou mis à jour
      return res.status(404).json({ message: "Dossier médical introuvable" });
    }

    res.json({ message: "Dossier médical mis à jour avec succès", dossier: updatedDossier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};


// Supprimer un dossier médical
const deleteDossierMedical = async (req, res) => {
  try {
    await dossierMedicalService.deleteDossierMedical(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getDossiersMedical,
  getDossierMedical,
  createDossierMedical,
  updateDossierMedical,
  deleteDossierMedical,
};
