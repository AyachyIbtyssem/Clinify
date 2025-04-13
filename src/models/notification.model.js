const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Patient = require("./patient.model");
const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: "id",
    },
  },
}, {
  tableName: 'notifications',
  timestamps: true,
});

module.exports = Notification;

Notification.belongsTo(Patient, {
    as: "Patient",
    foreignKey: "patientId",
  });

  // Ajoutez la relation inverse :
Patient.hasMany(Notification, {
    as: "Notifications",
    foreignKey: "patientId",
  });