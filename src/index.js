const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require('cors');
const sequelize = require("./config/database");


const app = express();
app.use(cors({
  origin: '*',  // Autoriser toutes les origines
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: "API fonctionne !" });
});

// Importation des routes
const patientRoutes = require("./routes/patient.routes");
const medecinRoutes = require("./routes/medecin.routes");
const rdvRoutes = require("./routes/rdv.routes");
const consultationRoutes = require("./routes/consultation.routes");
const paiementRoutes = require("./routes/paiement.routes");
const dossierMedicalRoutes = require("./routes/dossierMedical.routes");
const assistantRoutes = require("./routes/assistant.routes");
const traitementRoutes = require("./routes/traitement.routes");
const factureRoutes = require("./routes/facture.routes");
const authRoutes = require("./routes/auth.routes");


// Définir les routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medecins", medecinRoutes);
app.use("/api/rendezvous", rdvRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/paiements", paiementRoutes);
app.use("/api/dossier-medical", dossierMedicalRoutes);
app.use("/api/assistants", assistantRoutes);
app.use("/api/traitements", traitementRoutes);
app.use("/api/factures", factureRoutes);


// Synchronisation avec la base de données
sequelize
  .sync({ alter: true }) // Permet de modifier la structure de la DB sans perdre de données
  .then(() => {
    console.log("Base de données mise à jour avec succès.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Erreur de synchronisation de la base :", err));
