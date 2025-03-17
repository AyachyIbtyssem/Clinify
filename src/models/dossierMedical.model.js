const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient.model');
const Medecin = require('./medecin.model');

const DossierMedical = sequelize.define('DossierMedical', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  analyse: {
    type: DataTypes.JSON, // Utilisation d'un tableau JSON
    allowNull: false,
    defaultValue: [] // Initialise avec un tableau vide
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
        model: Patient,
        key: "id"
    }
  },
  medecinId: {
    type: DataTypes.INTEGER,
    references: {
        model: Medecin,
        key: "id"
    }
  },
}, {
  tableName: 'dossiers_medicals',
  timestamps: true,
}); 

// Define the foreign key relationship after importing the Patient model
DossierMedical.belongsTo(Patient, { as: 'Patient', foreignKey: 'patientId' });
DossierMedical.belongsTo(Medecin, { as: 'Medecin', foreignKey: 'medecinId' });

module.exports = DossierMedical;
