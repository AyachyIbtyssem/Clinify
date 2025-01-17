<<<<<<< HEAD
const express = require("express");
const sequelize = require("./config/database");
const patientRoutes = require("./routes/patient.routes");
const medecinRoutes = require("./routes/medecin.routes");
const rdvRoutes = require("./routes/rdv.routes");
const salleRoutes = require("./routes/salle.routes");

//
const Patient = require("./models/patient.model");
const Medecin = require("./models/medecin.model");
const RendezVous = require("./models/rdv.model");
=======
const express = require('express');
const sequelize = require('./config/database');
const patientRoutes = require('./routes/patient.routes');
const medecinRoutes = require('./routes/medecin.routes'); 
const assistantRoutes = require('./routes/assistant.routes'); 

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f

const app = express();
app.use(express.json());

// Définir les associations
Patient.hasMany(RendezVous, { foreignKey: "IdPatient" });
Medecin.hasMany(RendezVous, { foreignKey: "IdMedecin" });
RendezVous.belongsTo(Patient, { foreignKey: "IdPatient", onDelete: "CASCADE" });
RendezVous.belongsTo(Medecin, { foreignKey: "IdMedecin", onDelete: "CASCADE" });

// Routes
<<<<<<< HEAD
app.use("/api/patients", patientRoutes);
app.use("/api/medecins", medecinRoutes);
app.use("/api/rendezvous", rdvRoutes);
app.use("/api/salles", salleRoutes);
=======
app.use('/api/patients', patientRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/assistants', assistantRoutes);

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f

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
