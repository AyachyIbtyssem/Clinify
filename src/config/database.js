const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise"); // Import du package mysql2 pour exécuter des commandes SQL

// Création de la base de données si elle n'existe pas
(async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASS, // Remplacez par votre mot de passe MySQL
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS clinify");
    console.log('Base de données "clinify" vérifiée ou créée avec succès.');
  } catch (error) {
    console.error("Erreur lors de la création de la base de données :", error);
  }
})();

// Configuration de la base de données Sequelize
const sequelize = new Sequelize("clinify", process.env.DB_PASS, process.env.DB_PASS, {
  host: "localhost", // Adresse de votre serveur MySQLm
  dialect: "mysql", // Type de base de données
});

module.exports = sequelize;
