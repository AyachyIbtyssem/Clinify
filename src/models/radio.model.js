const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Patient = require("./patient.model"); // Importation du modèle Patient

const Radio = sequelize.define("Radio", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "id",
    },
    onDelete: "CASCADE",
  },
},
{
    tableName: "radios",
    timestamps: true,
});

Patient.hasMany(Radio, { foreignKey: "patientId", onDelete: "CASCADE" });
Radio.belongsTo(Patient, { foreignKey: "patientId" });

module.exports = Radio;
