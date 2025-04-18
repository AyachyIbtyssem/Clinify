const express = require("express"); //backend
const cors = require("cors");
const sequelize = require("./config/database"); //backend

const app = express();

app.use(
  cors({
    origin: "*", // Autoriser toutes les origines
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // Méthodes spécifiques
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
  })
);

// Ajouter un middleware pour gérer les requêtes préflight (OPTIONS)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,PATCH,OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(200);
});

app.use(express.json());

// Route de test
app.get("/api/test", (req, res) => {
  res.json({ message: "API fonctionne !" });
});

// Importation des routes
const patientRoutes = require("./routes/patient.routes");
const medecinRoutes = require("./routes/medecin.routes");
const rendezVousRoutes = require("./routes/rdv.routes");
const consultationRoutes = require("./routes/consultation.routes");
const bodyParser = require("body-parser");
const paiementRoutes = require("./routes/paiement.routes");
const dossierMedicalRoutes = require("./routes/dossierMedical.routes");
const assistantRoutes = require("./routes/assistant.routes");
const traitementRoutes = require("./routes/traitement.routes");
const factureRoutes = require("./routes/facture.routes");
const authRoutes = require("./routes/auth.routes");
const analyseRoutes = require("./routes/analyse.routes");
const medicamentRoutes = require("./routes/medicament.routes");
const path = require("path");
const radioRoutes = require("./routes/radio.routes");
const notificationRoutes = require("./routes/notification.routes");
const healthProfileRoutes = require("./routes/patientHealthProfile.routes");
const aiRoutes = require("./routes/ai.routes");
const medicamentReminderRoutes = require("./routes/medicamentReminder.route");

// Définir les routes
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/medecins", medecinRoutes);
app.use("/api/rendezvous", rendezVousRoutes);
app.use("/api/consultations", consultationRoutes);
app.use(bodyParser.json()); // Assure-toi que cette ligne est bien là
app.use(bodyParser.urlencoded({ extended: true })); // Ajoute ceci pour gérer les formulaires
app.use("/api/paiements", paiementRoutes);
app.use("/api/dossier-medical", dossierMedicalRoutes);
app.use("/api/assistants", assistantRoutes);
app.use("/api/traitements", traitementRoutes);
app.use("/api/factures", factureRoutes);
app.use("/api/analyse", analyseRoutes);
app.use("/api/medicaments", medicamentRoutes);
app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/api/radios", radioRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/health-profiles", healthProfileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/medicaments", medicamentReminderRoutes);

// Synchronisation avec la base de données
sequelize
  .sync({ alter: true }) // Permet de modifier la structure de la DB sans perdre de données
  .then(() => {
    console.log("Base de données mise à jour avec succès.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`)
    );
    // 👉 Lancement du scheduler APRES le serveur
    require("./schedulers/scheduler");
  })
  .catch((err) => console.error("Erreur de synchronisation de la base :", err));
require("./schedulers/scheduler");
