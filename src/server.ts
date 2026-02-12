import express from 'express';
import userRoutes from './routes/userRoutes.js';
import sequelize from './config/database.js';
import User from './models/User.js';

const app = express();
const port = 3000;

const etudiants = [
  { id: 1, nom: "Dupont", prenom: "Jean" },
  { id: 2, nom: "Martin", prenom: "Sophie" },
  { id: 3, nom: "Doe", prenom: "John" },
];

app.use(userRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur');
});

app.get('/api/data', (req, res) => {
  res.json(etudiants);
});

app.get('/api/hello/:name', (req, res) => {
  const name = req.params.name;
  const timestamp = new Date().toISOString();
  res.json({
    message: `Bonjour ${name}`,
    timestamp: timestamp
  });
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port} avec une DB Sqlite3`);
  });
}).catch((err) => {
  console.error("Erreur de synchronisation:", err);
});
