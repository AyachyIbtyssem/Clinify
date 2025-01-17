const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Assistant
const Assistant = sequelize.define('Assistant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'assistants', // Nom de la table dans MySQL
  timestamps: true,       // Ajoute createdAt et updatedAt
});

module.exports = Assistant;
