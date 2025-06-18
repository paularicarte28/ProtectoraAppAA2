const express = require("express");
const router = express.Router();
const controller = require("../controllers/animals.controller");
const { body } = require("express-validator");

// GET
router.get("/", controller.getAnimals);
router.get("/:id", controller.getAnimal);

// POST
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("species").notEmpty().withMessage("La especie es obligatoria"),
  ],
  controller.createAnimal
);

// PUT
router.put(
  "/:id",
  [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("species").notEmpty().withMessage("La especie es obligatoria"),
  ],
  controller.updateAnimal
);

// DELETE
router.delete("/:id", controller.deleteAnimal);

module.exports = router;