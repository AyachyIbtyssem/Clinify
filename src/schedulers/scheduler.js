// scheduler.js
//const cron = require("node-cron");
//const {
//processMedicamentsReminders,
//} = require("../services/medicamentReminder.service");

// Exécution de la tâche toutes les minutes (pattern à adapter pour la production)
//cron.schedule("* * * * *", async () => {
// console.log("Exécution de la tâche planifiée de rappels de médicaments...");
await processMedicamentsReminders();
//});
