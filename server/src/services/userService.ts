import User, { type UserRole } from "../models/User.js";

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;

export interface CreateUserInput {
  nom: string;
  prenom: string;
  role?: string;
}

function validateName(value: string, fieldLabel: string): string {
  const trimmed = value.trim();

  if (!trimmed) {
    throw new HttpError(400, `${fieldLabel} est obligatoire.`);
  }

  if (!NAME_REGEX.test(trimmed)) {
    throw new HttpError(
      400,
      `${fieldLabel} ne peut contenir que des lettres (avec accents), l'apostrophe (') et le tiret (-).`
    );
  }

  return trimmed;
}

function validateRole(role?: string): UserRole {
  const normalized = (role ?? "student").trim();

  if (normalized !== "student" && normalized !== "teacher") {
    throw new HttpError(400, "Le rôle doit être soit 'student', soit 'teacher'.");
  }

  return normalized;
}

export async function findAllUsers() {
  return User.findAll();
}

export async function findActiveUsers() {
  return User.findAll({ where: { isActive: true } });
}

export async function createUser(input: CreateUserInput) {
  const nom = validateName(input.nom, "Nom");
  const prenom = validateName(input.prenom, "Prénom");
  const role = validateRole(input.role);

  const user = await User.create({
    nom,
    prenom,
    role,
    isActive: true,
  });

  return user;
}

export async function toggleActive(id: number) {
  const user = await User.findByPk(id);

  if (!user) {
    throw new HttpError(404, "Utilisateur non trouvé.");
  }

  user.isActive = !user.isActive;
  await user.save();

  return user;
}

export async function deleteUser(id: number) {
  const deletedCount = await User.destroy({ where: { id } });

  if (deletedCount === 0) {
    throw new HttpError(404, "Utilisateur non trouvé.");
  }
}

