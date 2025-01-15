const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RendezVous = sequelize.define('RendezVous', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  heure: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['En attente', 'Confirmé', 'Annulé']], // Validation des statuts possibles
    },
  },
  typeRendezVous: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Consultation', 'Examen', 'Suivi']], // Validation des types de rendez-vous
    },
  },
}, {
  tableName: 'rendezVous',
  timestamps: true, // Ajout des champs createdAt et updatedAt par défaut
});

module.exports = RendezVous;
