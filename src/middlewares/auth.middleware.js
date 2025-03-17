const jwt = require("jsonwebtoken");
const SECRET_KEY = "super_secret_key"; 

// Vérifier si l'utilisateur est connecté
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Accès interdit" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};

// Vérifier si c'est un médecin
const isMedecin = (req, res, next) => {
  if (req.user.role !== "medecin") return res.status(403).json({ message: "Accès réservé aux médecins" });
  next();
};

// Vérifier si c'est un assistant
const isAssistant = (req, res, next) => {
  if (req.user.role !== "assistant") return res.status(403).json({ message: "Accès réservé aux assistants" });
  next();
};

// Vérifier si c'est un patient
const isPatient = (req, res, next) => {
  if (req.user.role !== "patient") return res.status(403).json({ message: "Accès réservé aux patients" });
  next();
};

module.exports = { authenticate, isMedecin, isAssistant, isPatient };
