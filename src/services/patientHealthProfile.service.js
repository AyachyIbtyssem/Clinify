const repository = require("../repositories/patientHealthProfile.repository");

class PatientHealthProfileService {
  async updateHealthProfile(patientId, data) {
    // Validation des données
    if (data.sleepHours < 4 || data.sleepHours > 12) {
      throw new Error("Les heures de sommeil doivent être entre 4 et 12");
    }

    // Logique métier + appel au repository
    const { profile, created } = await repository.upsert(patientId, data);
    return {
      message: created ? "Profil créé" : "Profil mis à jour",
      profile,
    };
  }

  async getHealthProfile(patientId) {
    const profile = await repository.findByPatientId(patientId);
    if (!profile) throw new Error("Profil non trouvé");
    return profile;
  }
}

module.exports = new PatientHealthProfileService();
