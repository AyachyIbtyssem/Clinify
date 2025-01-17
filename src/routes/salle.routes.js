const express = require("express");
const router = express.Router();
const salleController = require("../controllers/salle.controller");

router.get("/", salleController.getSalles);
router.get("/:id", salleController.getSalleById);
router.post("/", salleController.createSalle);
router.put("/:id", salleController.updateSalle);
router.delete("/:id", salleController.deleteSalle);

module.exports = router;
