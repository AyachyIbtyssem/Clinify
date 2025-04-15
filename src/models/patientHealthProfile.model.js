const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patient = require("./patient.model");

const PatientHealthProfile = sequelize.define(
  "PatientHealthProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    activityLevel: {
      type: DataTypes.ENUM("sédentaire", "modéré", "actif"),
      defaultValue: "modéré",
    },
    dietaryRestrictions: {
      /// ce sont les choses , que le patient ne peut pas les manger
      type: DataTypes.TEXT, // Stocke plusieurs restrictions (ex: "gluten, lactose")
      defaultValue: "aucune",
    },
    sleepHours: {
      type: DataTypes.FLOAT,
      validate: { min: 4, max: 12 },
      defaultValue: 7,
    },
    healthGoals: {
      type: DataTypes.ENUM(
        "perte de poids",
        "maintien",
        "musculation",
        "stress"
      ),
      defaultValue: "maintien",
    },
    patientId: {
      type: DataTypes.INTEGER,
      unique: true,
      references: { model: Patient, key: "id" },
    },
  },
  {
    tableName: "patient_health_profiles",
    timestamps: true,
  }
);

// Relations
Patient.hasOne(PatientHealthProfile, { foreignKey: "patientId" });
PatientHealthProfile.belongsTo(Patient, { foreignKey: "patientId" });

module.exports = PatientHealthProfile;
