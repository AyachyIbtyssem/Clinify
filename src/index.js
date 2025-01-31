const express = require("express");
const sequelize = require("./config/database");
const patientRoutes = require("./routes/patient.routes");
const medecinRoutes = require("./routes/medecin.routes");
const rdvRoutes = require("./routes/rdv.routes");
const salleRoutes = require("./routes/salle.routes");
const consultationRoutes = require("./routes/consultation.routes");
const paiementRoutes = require("./routes/paiement.routes");

//
const Patient = require("./models/patient.model");
const Medecin = require("./models/medecin.model");
const RendezVous = require("./models/rdv.model");

const app = express();
app.use(express.json());

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/medecins", medecinRoutes);
app.use("/api/rendezvous", rdvRoutes);
app.use("/api/salles", salleRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/paiements", paiementRoutes);

// Synchronisation avec la base de données
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connected and models synchronized.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error connecting to the database:", err));
