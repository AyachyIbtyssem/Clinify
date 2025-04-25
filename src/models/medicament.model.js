const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const DossierMedical = require("./dossierMedical.model");

const Medicament = sequelize.define(
  "Medicament",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duree: {
      type: DataTypes.STRING, // Ex: "7 jours", "2 semaines" , "toujours"
      allowNull: false,
    },
    frequence: {
      type: DataTypes.STRING, // Ex: "2 fois par jour", "toutes les 8 heures"
      allowNull: false,
    },
    posologie: {
      type: DataTypes.STRING, // Ex: "1 comprimé", "2 cuillères"
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT, // Instructions supplémentaires
      allowNull: true,
    },
    // Champ ajouté pour la gestion du prochain rappel
    nextReminder: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(), // initialisé à la date de création
    },
    dossierMedicalId: {
      type: DataTypes.INTEGER,
      references: {
        model: DossierMedical,
        key: "id",
      },
    },

    priseEffectuee: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dernierePrise: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "medicaments",
    timestamps: true,
  }
);

// Define relationships
Medicament.belongsTo(DossierMedical, {
  foreignKey: "dossierMedicalId",
  as: "DossierMedical",
});

DossierMedical.hasMany(Medicament, {
  foreignKey: "dossierMedicalId",
  as: "Medicaments",
});

module.exports = Medicament;
