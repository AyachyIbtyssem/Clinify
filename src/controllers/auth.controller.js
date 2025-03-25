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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }

    const { token, role, userId } = await authService.loginUser(email, password);
    
    // Ajouter userId à la réponse JSON
    res.status(200).json({ token, role, userId });  // Retourner également l'ID
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
