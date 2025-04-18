// routes/medicamentReminder.route.js
const express = require("express");
const router = express.Router();
const {
  triggerReminders,
  getPatientReminders,
} = require("../controllers/medicamentReminder.controller");

// Endpoints avec préfixe cohérent
router.get("/reminders/trigger", triggerReminders);
router.get(
  "/reminders/patient/:dossierMedicalId/reminders",
  getPatientReminders
);

module.exports = router;
