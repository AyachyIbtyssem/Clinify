const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patient = require("./patient.model");
const Medecin = require("./medecin.model");

const RendezVous = sequelize.define(
  "RendezVous",
  {
    idRDV: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    heure: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeRendezVous: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "rendezvous", // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Associations avec Patient et Medecin
RendezVous.belongsTo(Patient, { foreignKey: "IdPatient", onDelete: "CASCADE" });
RendezVous.belongsTo(Medecin, { foreignKey: "IdMedecin", onDelete: "CASCADE" });

// Synchronisation de la table RendezVous
RendezVous.sync({ alter: true })
  .then(() => {
    console.log("Table rendezvous vérifiée ou créée avec succès.");
  })
  .catch((error) => {
    console.error("Erreur lors de la création de la table rendezvous", error);
  });
module.exports = RendezVous;
