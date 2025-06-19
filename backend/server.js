const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const animalRoutes = require("./routes/animals.routes");
const adopterRoutes = require("./routes/adopters.routes");
const adoptionRoutes = require("./routes/adoptions.routes");

app.use("/animals", animalRoutes);
app.use("/adopters", adopterRoutes);
app.use("/adoptions", adoptionRoutes);

const PORT = process.env.PORT || 3001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;