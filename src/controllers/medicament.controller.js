const medicamentService = require("../services/medicament.service");

// Get all medications
const getMedicaments = async (req, res) => {
  try {
    const medicaments = await medicamentService.getAllMedicaments();
    res.json(medicaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get medication by ID
const getMedicament = async (req, res) => {
  try {
    const medicament = await medicamentService.getMedicamentById(req.params.id);
    res.json(medicament);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create new medication
const createMedicament = async (req, res) => {
  try {
    const newMedicament = await medicamentService.addMedicament(req.body);
    res.status(201).json(newMedicament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update medication
const updateMedicament = async (req, res) => {
  try {
    const updatedMedicament = await medicamentService.updateMedicament(
      req.params.id,
      req.body
    );

    if (!updatedMedicament) {
      return res.status(404).json({ message: "Médicament introuvable" });
    }

    res.json({
      message: "Médicament mis à jour avec succès",
      medicament: updatedMedicament,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Erreur serveur" });
  }
};

// Delete medication
const deleteMedicament = async (req, res) => {
  try {
    await medicamentService.deleteMedicament(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get medications by medical record ID
const getMedicamentsByDossierId = async (req, res) => {
  try {
    const medicaments = await medicamentService.getMedicamentsByDossierId(
      req.params.dossierId
    );
    res.json(medicaments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add medication to medical record
const ajouterMedicamentAuDossier = async (req, res) => {
  try {
    const { dossierId } = req.params;
    const medicamentData = req.body;

    const newMedicament = await medicamentService.ajouterMedicamentAuDossier(
      dossierId,
      medicamentData
    );

    res.status(201).json({
      message: "Médicament ajouté au dossier avec succès",
      medicament: newMedicament,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMedicaments,
  getMedicament,
  createMedicament,
  updateMedicament,
  deleteMedicament,
  getMedicamentsByDossierId,
  ajouterMedicamentAuDossier,
};
