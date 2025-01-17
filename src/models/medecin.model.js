<<<<<<< HEAD
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// Définir le modèle Médecin
const Medecin = sequelize.define(
  "Medecin",
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING, // Spécialité médicale
      allowNull: false,
    },

    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "medecins", // Nom de la table dans MySQL
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);
=======
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Définir le modèle Médecin
const Medecin = sequelize.define('Medecin', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING, // Spécialité médicale
    allowNull: false,
  },
 
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'medecins', // Nom de la table dans MySQL
  timestamps: true,      // Ajoute createdAt et updatedAt
});

>>>>>>> 72c9b36e2dab1cde80b202b0961943fa3ce10c3f
module.exports = Medecin;
