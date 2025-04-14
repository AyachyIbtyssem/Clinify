const PatientHealthProfile = require("../models/patientHealthProfile.model");

class PatientHealthProfileRepository {
  async upsert(patientId, data) {
    const [profile, created] = await PatientHealthProfile.upsert({
      patientId,
      ...data,
    });
    return { profile, created };
  }

  async findByPatientId(patientId) {
    return await PatientHealthProfile.findOne({ where: { patientId } });
  }
}

module.exports = new PatientHealthProfileRepository();
