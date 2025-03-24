const express = require("express");
const router = express.Router();
const radioController = require("../controllers/radio.controller");
const upload = require("../middlewares/uploadRadio.middleware");

// Ajouter une radio (avec image)
router.post("/add", upload.single("image"), radioController.addRadio);

// Récupérer toutes les radios
router.get("/", radioController.getAllRadios);

// Récupérer une radio par ID
router.get("/:id", radioController.getRadioById);

module.exports = router;
