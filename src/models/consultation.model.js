const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patient = require("./patient.model");
const RendezVous = require("./rdv.model");

const Consultation = sequelize.define(
  "Consultation",
  {
    idConsultation: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descriptionDiagnostic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ordonnance: {
      type: DataTypes.STRING,
      allowNull: true, // Peut être null si aucune ordonnance n'est donnée
    },
    recommandations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notesMedecin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rendezVousId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: RendezVous, // Référence au modèle RendezVous
        key: "idRDV",
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Patient,
        key: "id",
      },
    },
  },
  {
    tableName: "consultations",
    timestamps: true,
  }
);

// Définir les relations
Consultation.belongsTo(Patient, { as: "Patient", foreignKey: "patientId" });
Consultation.belongsTo(RendezVous, {
  as: "RendezVous",
  foreignKey: "rendezVousId",
});
RendezVous.hasOne(Consultation, {
  as: "Consultation", // Alias de l'association
  foreignKey: "rendezVousId",
});
Patient.hasMany(Consultation, { as: "Consultations", foreignKey: "patientId" });

module.exports = Consultation;
