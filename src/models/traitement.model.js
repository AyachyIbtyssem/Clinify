const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Traitement = sequelize.define('Traitement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  typeService: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cout: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  dureeEstimee: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['en cours', 'complété', 'en attente']], // Validation des statuts possibles
    },
  },
}, {
  tableName: 'traitements',
  timestamps: true, // Ajout des champs createdAt et updatedAt par défaut
});

module.exports = Traitement;
