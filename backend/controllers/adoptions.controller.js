const { validationResult } = require("express-validator");
const adoptionService = require("../services/adoptions.service");
const animalService = require("../services/animals.service");

const getAdoptions = async (req, res) => {
  const adoptions = await adoptionService.getAllAdoptions();
  res.json(adoptions);
};

const createAdoption = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { animal_id, adopter_id, adoption_date } = req.body;

    const animal = await animalService.getAnimalById(animal_id);
    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }

    if (animal.adopted === "Y") {
      return res.status(400).json({ error: "Este animal ya ha sido adoptado" });
    }

    const id = await adoptionService.createAdoption({ animal_id, adopter_id, adoption_date });
    await animalService.updateAnimal(animal_id, { adopted: "Y" });

    res.status(201).json({ id });
  } catch (err) {
    console.error("Error al crear adopción:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const deleteAdoption = async (req, res) => {
  const adoption = await adoptionService.getAdoptionById(req.params.id);
  if (!adoption) {
    return res.status(404).json({ error: "Adopción no encontrada" });
  }

  await adoptionService.deleteAdoption(req.params.id);


  await animalService.updateAnimal(adoption.animal_id, { adopted: "N" });

  res.status(204).end();
};

module.exports = {
  getAdoptions,
  createAdoption,
  deleteAdoption,
};
