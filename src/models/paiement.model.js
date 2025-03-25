const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const RendezVous = require("../models/rdv.model");


const Paiement = sequelize.define(
  "Paiement",
  {
    idPaiement: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    montant: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    methodePaiement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datePaiement: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Ajout d'une valeur par défaut
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en attente", // Ajout d'une valeur par défaut
      validate: {
        isIn: [["en attente", "validé", "échoué"]],
      },
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    referencePaymee: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    IdRDV: {
      type: DataTypes.INTEGER,
      references: {
        model: RendezVous,
        key: "idRDV",
      },
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    tableName: "paiements",
    timestamps: true,
  }
);

Paiement.belongsTo(RendezVous, { foreignKey: "IdRDV", as: "rendezvous", onDelete: "CASCADE" });
RendezVous.hasMany(Paiement, { as: "Paiements", foreignKey: "IdRDV", onDelete: "CASCADE" });

module.exports = Paiement;