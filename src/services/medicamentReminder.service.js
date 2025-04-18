// services/medicamentReminder.service.js
const {
  getDueMedicaments,
} = require("../repositories/medicamentReminder.repository");
const Medicament = require("../models/medicament.model");

/**
 * Parse la fréquence en heures à partir du champ "frequence".
 * Supporte deux formats :
 * - "2 fois par jour" (calcul : 24 / nombre de fois)
 * - "toutes les 8 heures" (utilise directement le nombre d'heures)
 *
 * @param {string} frequencyStr - La chaîne de caractères de fréquence.
 * @returns {number} L'intervalle en heures entre deux rappels.
 */
function parseFrequencyToHours(frequencyStr) {
  // Format : "2 fois par jour"
  const foisParJourRegex = /^(\d+)\s*fois\s+par\s+jour$/i;
  const matchFoisParJour = frequencyStr.match(foisParJourRegex);
  if (matchFoisParJour) {
    const timesPerDay = parseInt(matchFoisParJour[1], 10);
    if (timesPerDay > 0) {
      return 24 / timesPerDay;
    }
  }

  // Format : "toutes les 8 heures"
  const toutesLesHeuresRegex = /^toutes\s+les\s+(\d+)\s+heures$/i;
  const matchToutesLesHeures = frequencyStr.match(toutesLesHeuresRegex);
  if (matchToutesLesHeures) {
    return parseInt(matchToutesLesHeures[1], 10);
  }

  // Valeur par défaut : 24 heures
  return 24;
}

/**
 * Parse la durée en heures à partir du champ "duree".
 * Supporte les formats : "7 jours", "2 semaines", et "toujours" (pour aucune expiration).
 *
 * @param {string} durationStr - La chaîne de caractères de durée.
 * @returns {number} Le nombre d'heures correspondant, ou Infinity pour "toujours".
 */
function parseDurationToHours(durationStr) {
  // Cas spécial "toujours"
  if (/^toujours$/i.test(durationStr.trim())) {
    return Infinity;
  }

  // Format "7 jours"
  const joursRegex = /^(\d+)\s*jours?$/i;
  const matchJours = durationStr.match(joursRegex);
  if (matchJours) {
    return parseInt(matchJours[1], 10) * 24;
  }

  // Format "2 semaines"
  const semainesRegex = /^(\d+)\s*semaines?$/i;
  const matchSemaines = durationStr.match(semainesRegex);
  if (matchSemaines) {
    return parseInt(matchSemaines[1], 10) * 7 * 24;
  }

  // Valeur par défaut (par exemple 24 heures)
  return 24;
}

/**
 * Simule l'envoi d'une notification de rappel pour un médicament.
 * À remplacer par une intégration réelle (FCM, APNs, etc.).
 *
 * @param {object} medicament - L'objet médicament.
 */
const sendReminder = async (medicament) => {
  console.log(`Envoi de rappel pour le médicament: ${medicament.nom}`);
  // Intégration réelle du service d'envoi de notification (SMS, email ou push mobile)
};

/**
 * Processus complet de rappel :
 * - Récupère les médicaments dont le rappel est dû.
 * - Pour chaque médicament, calcule la date d'expiration si la durée n'est pas "toujours".
 * - Envoie le rappel uniquement si le traitement est encore valide.
 * - Met à jour le champ nextReminder en fonction de la fréquence, sans dépasser la date d'expiration.
 */
const processMedicamentsReminders = async () => {
  try {
    const dueMedicaments = await getDueMedicaments();
    const now = new Date();
    let processedCount = 0;

    for (const medicament of dueMedicaments) {
      // Convertir la durée en heures
      const durationInHours = parseDurationToHours(medicament.duree);

      // Calcul de la date d'expiration uniquement si la durée n'est pas infinie
      let expirationDate = null;
      if (isFinite(durationInHours)) {
        const creationDate = new Date(medicament.createdAt);
        expirationDate = new Date(
          creationDate.getTime() + durationInHours * 3600 * 1000
        );
        // Si le médicament a expiré, ne pas envoyer le rappel
        if (now > expirationDate) {
          console.log(`Le traitement pour ${medicament.nom} est terminé.`);
          continue;
        }
      }

      // Envoi du rappel
      await sendReminder(medicament);

      // Calcul du prochain rappel en fonction de la fréquence
      const hoursInterval = parseFrequencyToHours(medicament.frequence);
      const nextReminder = new Date(
        now.getTime() + hoursInterval * 3600 * 1000
      );

      // Si une date d'expiration existe et que le prochain rappel la dépasse, on le fixe à la date d'expiration
      if (expirationDate && nextReminder > expirationDate) {
        medicament.nextReminder = expirationDate;
      } else {
        medicament.nextReminder = nextReminder;
      }

      await medicament.save();
      processedCount++;
    }

    return { status: "OK", count: processedCount };
  } catch (err) {
    console.error("Erreur dans le process de rappel:", err);
    throw err;
  }
};
const getPatientMedicaments = async (dossierMedicalId) => {
  return await Medicament.findAll({
    where: { dossierMedicalId },
    order: [["nextReminder", "ASC"]], // Tri par date de rappel
    attributes: [
      "id",
      "nom",
      "duree",
      "frequence",
      "posologie",
      "instructions",
      "nextReminder",
      "createdAt",
    ],
  });
};

module.exports = { processMedicamentsReminders, getPatientMedicaments };
