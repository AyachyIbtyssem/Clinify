const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patient = require("./patient.model");
const Medecin = require("./medecin.model");

/*const Consultation = require("./consultation.model");*/

const RendezVous = sequelize.define(
  "RendezVous",
  {
    idRDV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    heure: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    /*statut: {
      type: DataTypes.STRING,
      allowNull: false,
    },*/
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente", // Valeur par défaut
      validate: {
        isIn: [["en attente", "validé", "échoué", "annulé"]], // Validation des statuts
      },
    },
    typeRendezVous: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IdPatient: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
        key: "id",
      },
    },
    IdMedecin: {
      type: DataTypes.INTEGER,
      references: {
        model: Medecin,
        key: "id",
      },
    },

  },
  {
    tableName: "rendezvous", // Nom de la table dans MySQL
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Définir les relations
RendezVous.belongsTo(Patient, { as: "Patient", foreignKey: "IdPatient" });
RendezVous.belongsTo(Medecin, { as: "Medecin", foreignKey: "IdMedecin" });




Medecin.hasMany(RendezVous, { as: "RendezVous", foreignKey: "IdMedecin" });
Patient.hasMany(RendezVous, { as: "RendezVous", foreignKey: "IdPatient" });

/*RendezVous.hasOne(Consultation, {
  as: "Consultation", // Alias de l'association
  foreignKey: "rendezVousId",
});*/

module.exports = RendezVous;
