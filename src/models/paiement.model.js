const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
/*const Medecin = require("./medecin.model");*/
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
    /*IdMedecin: {
      type: DataTypes.INTEGER,
      references: {
        model: Medecin,
        key: "id",
      },
      allowNull: false,
    },*/
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

// Un paiement appartient à un seul médecin
/*Paiement.belongsTo(Medecin, { foreignKey: "IdMedecin", as: "medecin" });*/
// Un paiement appartient à un seul rendez-vous
Paiement.belongsTo(RendezVous, { foreignKey: "IdRDV", as: "rendezvous" });
RendezVous.hasMany(Paiement, { as: "Paiements", foreignKey: "IdRDV" });

module.exports = Paiement;
