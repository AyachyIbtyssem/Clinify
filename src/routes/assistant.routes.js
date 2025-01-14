const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistant.controller');

// Routes pour les assistants
router.get('/', assistantController.getAssistants);
router.get('/:id', assistantController.getAssistant);
router.post('/', assistantController.createAssistant);
router.put('/:id', assistantController.updateAssistant);
router.delete('/:id', assistantController.deleteAssistant);

module.exports = router;
