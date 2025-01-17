const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Salle = sequelize.define(
  "Salle",
  {
    idSalle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    numeroSalle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disponibilite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "salles", // Nom de la table dans la base de données
    timestamps: true, // Ajoute createdAt et updatedAt
  }
);

// Synchronisation de la table Salle
Salle.sync({ alter: true })
  .then(() => {
    console.log("Table salle vérifiée ou créée avec succès.");
  })
  .catch((error) => {
    console.error("Erreur lors de la création de la table salle", error);
  });

module.exports = Salle;
