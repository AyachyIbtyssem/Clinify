const express = require('express');
const sequelize = require('./config/database');
const patientRoutes = require('./routes/patient.routes');
const dossierMedicalRoutes = require('./routes/dossierMedical.routes');
const medecinRoutes = require('./routes/medecin.routes'); 
const assistantRoutes = require('./routes/assistant.routes'); 
const traitementRoutes = require('./routes/traitement.routes'); 
const factureRoutes = require('./routes/facture.routes'); 

const app = express();
app.use(express.json());

// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/dossierMedicals', dossierMedicalRoutes);
app.use('/api/medecins', medecinRoutes);
app.use('/api/assistants', assistantRoutes);
app.use('/api/traitements', traitementRoutes);
app.use('/api/factures', factureRoutes);

// Synchronisation avec la base de données
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected and models synchronized.');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); 
}).catch(err => console.error('Error connecting to the database:', err));
