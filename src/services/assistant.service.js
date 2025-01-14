const assistantRepository = require('../repositories/assistant.repository');

// Récupérer tous les assistants
const getAllAssistants = async () => {
  return await assistantRepository.findAllAssistants();
};

// Récupérer un assistant par ID
const getAssistantById = async (id) => {
  const assistant = await assistantRepository.findAssistantById(id);
  if (!assistant) {
    throw new Error('Assistant not found');
  }
  return assistant;
};

// Ajouter un nouvel assistant
const addAssistant = async (assistantData) => {
  return await assistantRepository.createAssistant(assistantData);
};

// Mettre à jour un assistant
const updateAssistant = async (id, assistantData) => {
  const updatedAssistant = await assistantRepository.updateAssistantById(id, assistantData);
  if (updatedAssistant[0] === 0) { // Sequelize retourne [nombre de lignes affectées]
    throw new Error('Assistant not found');
  }
  return updatedAssistant;
};

// Supprimer un assistant
const deleteAssistant = async (id) => {
  const deleted = await assistantRepository.deleteAssistantById(id);
  if (!deleted) {
    throw new Error('Assistant not found');
  }
  return deleted;
};

module.exports = {
  getAllAssistants,
  getAssistantById,
  addAssistant,
  updateAssistant,
  deleteAssistant,
};
