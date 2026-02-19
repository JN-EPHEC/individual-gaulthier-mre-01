import type { Request, Response } from "express";
import {
  HttpError,
  createUser,
  deleteUser,
  findActiveUsers,
  findAllUsers,
  toggleActive,
} from "../services/userService.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

export const getActiveUsers = async (_req: Request, res: Response) => {
  try {
    const users = await findActiveUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs actifs." });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ error: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};

export const toggleUserActive = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Identifiant invalide." });
    return;
  }

  try {
    const user = await toggleActive(id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ error: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut de l'utilisateur." });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Identifiant invalide." });
    return;
  }

  try {
    await deleteUser(id);
    res.status(200).json({ message: "Utilisateur supprimé." });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ error: error.message });
      return;
    }

    console.error(error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};

