import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import sequelize from "./config/database.js";
import User from "./models/User.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(requestLogger);
app.use(express.static("public"));

app.use(userRoutes);

app.get("/", (_req, res) => {
  res.send("Bienvenue sur mon serveur");
});

app.use(errorHandler);

async function seedInitialUsers() {
  const count = await User.count();

  if (count > 0) {
    return;
  }

  await User.bulkCreate([
    { nom: "Dupont", prenom: "Jean", role: "student", isActive: true },
    { nom: "Martin", prenom: "Sophie", role: "student", isActive: false },
    { nom: "Durand", prenom: "Claire", role: "teacher", isActive: true },
  ]);

  console.log("Utilisateurs de démonstration insérés en base.");
}

sequelize
  .sync({ alter: true })
  .then(async () => {
    await seedInitialUsers();

    app.listen(port, () => {
      console.log(`Serveur en écoute sur le port ${port} avec une DB Sqlite3`);
    });
  })
  .catch((err) => {
    console.error("Erreur de synchronisation:", err);
  });
