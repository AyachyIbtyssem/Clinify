const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const RendezVous = require("./rdv.model");

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
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    tableName: "paiements",
    timestamps: true,
  }
);

Paiement.belongsTo(RendezVous, { foreignKey: "IdRDV", as: "rendezvous" });
RendezVous.hasMany(Paiement, { as: "Paiements", foreignKey: "IdRDV" });

module.exports = Paiement;
