const express = require("express");
const router = express.Router();
const controller = require("../controllers/ai.controller");

// Route de test sans authentification
router.get(
  "/patients/:patientId/recommendations",
  controller.getRecommendations
);

module.exports = router;
