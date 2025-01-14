const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient.model');  // Import after defining the Patient model

const DossierMedical = sequelize.define('DossierMedical', {
  idDossier: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  analyse: {
    type: DataTypes.STRING,
    allowNull: false,
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
}, {
  tableName: 'dossiers_medicals',
  timestamps: true,
}); 

// Define the foreign key relationship after importing the Patient model
DossierMedical.belongsTo(Patient, { as: 'Patient', foreignKey: 'patientId' });

module.exports = DossierMedical;
