const assistantService = require('../services/assistant.service');

// Récupérer tous les assistants
const getAssistants = async (req, res) => {
  try {
    const assistants = await assistantService.getAllAssistants();
    res.json(assistants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un assistant par ID
const getAssistant = async (req, res) => {
  try {
    const assistant = await assistantService.getAssistantById(req.params.id);
    res.json(assistant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Ajouter un nouvel assistant
const createAssistant = async (req, res) => {
  try {
    const newAssistant = await assistantService.addAssistant(req.body);
    res.status(201).json(newAssistant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un assistant
const updateAssistant = async (req, res) => {
  try {
    const updatedAssistant = await assistantService.updateAssistant(req.params.id, req.body);
    res.json(updatedAssistant);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Supprimer un assistant
const deleteAssistant = async (req, res) => {
  try {
    await assistantService.deleteAssistant(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAssistants,
  getAssistant,
  createAssistant,
  updateAssistant,
  deleteAssistant,
};
