const authService = require("../services/auth.service");

// 🔹 INSCRIPTION
const register = async (req, res) => {
  console.log("Données reçues :", req.body);
  try {
    const response = await authService.registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔹 CONNEXION
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const { token, role } = await authService.loginUser(email, password);
    res.status(200).json({ token, role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔹 RÉINITIALISATION DU MOT DE PASSE
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const response = await authService.resetPassword(email, newPassword);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, resetPassword };
