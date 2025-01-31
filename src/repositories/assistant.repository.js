const Assistant = require("../models/assistant.model");

// Récupérer tous les assistants
const findAllAssistants = () => {
  return Assistant.findAll();
};

// Trouver un assistant par ID
const findAssistantById = (id) => {
  return Assistant.findByPk(id);
};

// Ajouter un nouvel assistant
const createAssistant = (assistantData) => {
  return Assistant.create(assistantData);
};

// Mettre à jour un assistant par ID
const updateAssistantById = (id, assistantData) => {
  return Assistant.update(assistantData, { where: { id } });
};

// Supprimer un assistant par ID
const deleteAssistantById = (id) => {
  return Assistant.destroy({ where: { id } });
};

module.exports = {
  findAllAssistants,
  findAssistantById,
  createAssistant,
  updateAssistantById,
  deleteAssistantById,
};
