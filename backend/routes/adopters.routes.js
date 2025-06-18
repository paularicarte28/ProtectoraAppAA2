const express = require("express");
const router = express.Router();
const controller = require("../controllers/adopters.controller");
const { body } = require("express-validator");

// GET
router.get("/", controller.getAdopters);
router.get("/:id", controller.getAdopter);

// POST
router.post(
  "/",
  [
    body("full_name").notEmpty().withMessage("El nombre completo es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un email valido")
  ],
  controller.createAdopter
);

// PUT
router.put(
  "/:id",
  [
    body("full_name").notEmpty().withMessage("El nombre completo es obligatorio"),
    body("email").isEmail().withMessage("Debe ser un email valido")
  ],
  controller.updateAdopter
);

// DELETE
router.delete("/:id", controller.deleteAdopter);

module.exports = router;
