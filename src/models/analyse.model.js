const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patient = require('./patient.model');

const Analyse = sequelize.define("Analyse", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  resultat: {
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
  pdfPath: {
    type: DataTypes.STRING, // Stocke le chemin du fichier PDF
    allowNull: true, // Peut être null si aucun fichier n'est ajouté
    defaultValue: "",
  },
},
  {
    tableName: "analyse",
    timestamps: true,
  }
);

Analyse.belongsTo(Patient, { as: 'Patient', foreignKey: 'patientId' });

module.exports = Analyse;
