import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/api/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/api/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.delete('/api/users/:id', async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Utilisateur supprimé' });
});

export default router;
