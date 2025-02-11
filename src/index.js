const express = require("express");
const sequelize = require("./config/database");

// Importer les modèles
const salleRoutes = require("./routes/salle.routes");
const patientRoutes = require("./routes/patient.routes");
const dossierMedicalRoutes = require('./routes/dossierMedical.routes');
const medecinRoutes = require("./routes/medecin.routes");
const assistantRoutes = require('./routes/assistant.routes'); 
const traitementRoutes = require('./routes/traitement.routes'); 
const factureRoutes = require('./routes/facture.routes'); 
const rendezVousRoutes = require('./routes/rdv.routes');
const app = express();
app.use(express.json());


// Définir les routes
app.use("/api/rendezvous", rendezVousRoutes);
app.use("/api/salles", salleRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/dossierMedicals', dossierMedicalRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/assistants', assistantRoutes);
app.use('/api/traitements', traitementRoutes);
app.use('/api/factures', factureRoutes);

// Synchronisation avec la base de données
sequelize
  .sync({ force: false })  // Attention : "force: false" est souvent plus sûr pour éviter la suppression accidentelle des données
  .then(() => {
    console.log("Database connected and models synchronized.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error connecting to the database:", err));
