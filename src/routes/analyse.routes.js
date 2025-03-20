const express = require("express");
const router = express.Router();
const analyseController = require("../controllers/analyse.controller");
const upload = require("../middlewares/upload.middleware");

// Ajouter une analyse (avec fichier PDF)
router.post("/add", upload.single("pdf"), analyseController.addAnalyse);

// Récupérer toutes les analyses
router.get("/", analyseController.getAllAnalyses);

// Récupérer une analyse par ID
router.get("/:id", analyseController.getAnalyseById);

module.exports = router;
