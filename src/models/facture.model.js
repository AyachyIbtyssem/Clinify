const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require('./patient.model');
const Traitement = require('./traitement.model');

const Facture = sequelize.define('Facture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  montantTotal: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  detailsTraitements: {
    type: DataTypes.STRING, // Utilisation de JSON pour stocker une liste de traitements
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['En attente', 'Payée', 'Annulée']], // Validation des statuts possibles
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'patients',
        key: "id"
    }
  },
  traitementId: {
    type: DataTypes.INTEGER,
    references: {
        model: 'traitements',
        key: "id"
    }
  },
}, {
  tableName: 'factures',
  timestamps: true,
});

// Define the foreign key relationship after importing the Patient model
Facture.belongsTo(Patient, { as: 'Patient', foreignKey: 'patientId' });
Facture.belongsTo(Traitement, { as: 'Traitement', foreignKey: 'traitementId' });

// Définissez également les relations inverses si nécessaire
Patient.hasMany(Facture, { as: 'Factures', foreignKey: 'patientId' });
Traitement.hasMany(Facture, { as: 'Factures', foreignKey: 'traitementId' });


module.exports = Facture;
