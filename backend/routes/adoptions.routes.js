const express = require("express");
const router = express.Router();
const controller = require("../controllers/adoptions.controller");
const { body } = require("express-validator");

// GET
router.get("/", controller.getAdoptions);

// POST
router.post(
  "/",
  [
    body("animal_id").notEmpty().withMessage("Selecciona un animal"),
    body("adopter_id").notEmpty().withMessage("Selecciona un adoptante"),
    body("adoption_date").notEmpty().withMessage("Indica la fecha")
  ],
  controller.createAdoption
);

// DELETE
router.delete("/:id", controller.deleteAdoption);

module.exports = router;
