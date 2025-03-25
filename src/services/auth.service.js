const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importation des modèles
const Patient = require("../models/patient.model");
const Medecin = require("../models/medecin.model");
const Assistant = require("../models/assistant.model")

//secret key
const SECRET_KEY = "super_secret_key";

const registerUser = async ({ firstName, lastName, email, password, phone, address, dateOfBirth, specialty, numSalle, nomDept, role }) => {
  // Vérifier si l'email existe déjà dans une des tables
  const existingPatient = await Patient.findOne({ where: { email } });
  const existingMedecin = await Medecin.findOne({ where: { email } });
  const existingAssistant = await Assistant.findOne({ where: { email } });

  if (existingPatient || existingMedecin || existingAssistant) {
    throw new Error("Email déjà utilisé");
  }

  // Hasher le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Enregistrer selon le rôle
  if (role === "patient") {
    await Patient.create({ firstName, lastName, email, password: hashedPassword, phone, address, dateOfBirth });
  } else if (role === "medecin") {
    await Medecin.create({ firstName, lastName, email, password: hashedPassword, phone, address, specialty, numSalle, nomDept });
  } else if (role === "assistant") {
    await Assistant.create({ firstName, lastName, email, password: hashedPassword, phone, address });
  } else {
    throw new Error("Rôle invalide");
  }

  return { message: "Utilisateur enregistré avec succès" };
};

// 🔹 CONNEXION
const loginUser = async (email, password) => {
  let user = await Patient.findOne({ where: { email } });
  let role = "patient";

  if (!user) {
    user = await Medecin.findOne({ where: { email } });
    role = "medecin";
  }

  if (!user) {
    user = await Assistant.findOne({ where: { email } });
    role = "assistant";
  }

  if (!user) {
    throw new Error("Utilisateur non trouvé");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Mot de passe incorrect");

  const token = jwt.sign(
    { id: user.id, role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Retourner l'ID de l'utilisateur, le rôle, et le token
  return { token, role, userId: user.id };  // On retourne l'ID de l'utilisateur ici
};


// 🔹 RÉINITIALISATION DU MOT DE PASSE
const resetPassword = async (email, newPassword) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Utilisateur non trouvé");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  return { message: "Mot de passe mis à jour avec succès" };
};

module.exports = { registerUser, loginUser, resetPassword };
