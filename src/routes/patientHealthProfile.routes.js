const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientHealthProfile.controller");

router.post("/:patientId", controller.createOrUpdate);
router.get("/:patientId", controller.getByPatientId);

module.exports = router;
