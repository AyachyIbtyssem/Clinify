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
      allowNull: false, // Assure que le rendez-vous est toujours requis
      references: {
        model: RendezVous, // Référence au modèle RendezVous
        key: "idRDV",
      },
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Assure qu'un patient est toujours requis
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

Consultation.belongsTo(Patient, { as: "patient", foreignKey: "patientId" });
Consultation.belongsTo(RendezVous, { as: "rendezVous", foreignKey: "rendezVousId" });

RendezVous.hasOne(Consultation, { as: "consultation", foreignKey: "rendezVousId" });
Patient.hasMany(Consultation, { as: "consultations", foreignKey: "patientId" });

module.exports = Consultation;
