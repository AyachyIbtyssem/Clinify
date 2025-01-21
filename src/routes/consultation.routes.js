const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultation.controller");

router.get("/", consultationController.getConsultations);
router.get("/:idConsultation", consultationController.getConsultation);
router.post("/", consultationController.createConsultation);
router.put("/:idConsultation", consultationController.updateConsultation);
router.delete("/:idConsultation", consultationController.deleteConsultation);

module.exports = router;
