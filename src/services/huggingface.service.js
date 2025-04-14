const { HfInference } = require("@huggingface/inference");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

class HuggingFaceService {
  constructor() {
    if (!process.env.HF_API_KEY) {
      throw new Error("Clé API HuggingFace manquante");
    }
    this.hf = new HfInference(process.env.HF_API_KEY);
    this.model = "mistralai/Mistral-7B-Instruct-v0.1";
  }

  async generateHealthRecommendations(patient, healthProfile, analyses) {
    const sessionId = uuidv4();
    try {
      const currentDate = new Date().toLocaleDateString("fr-FR");
      const prompt =
        `Générez des conseils médicaux personnalisés en français basés sur ces données et adaptés au contexte du ${currentDate} :

PATIENT:
- Nom: ${patient.firstName} ${patient.lastName || ""}
- Âge: ${this._calculateAge(patient.dateOfBirth)}
- Sexe: ${patient.gender || "Non spécifié"}

PROFIL SANTÉ:
- Objectifs: ${healthProfile.healthGoals || "Non spécifiés"}
- Restrictions: ${healthProfile.dietaryRestrictions || "Aucune"}
- Activité: ${healthProfile.activityLevel || "Non spécifiée"}
- Sommeil: ${healthProfile.sleepHours || "Non spécifié"} heures/nuit

ANALYSES:
${
  analyses.length > 0
    ? analyses.map((a) => `- ${a.nom}: ${a.resultat}`).join("\n")
    : "Aucune analyse disponible"
}

Conseils demandés sur:
1. Recommandations nutritionnelles
2. Programme d'activité physique
3. Hygiène de sommeil
4. Synthèse personnalisée

Fournissez également des formulations uniques à chaque appel, en variant les recommandations même si le profil reste inchangé.

Répondez en texte continu, structuré mais sans formatage particulier, en français clair.
**Ne répétez pas ces instructions.**
Répondez uniquement la partie à partir de la ligne suivante:
### Réponse :
`.trim();

      const response = await this.hf.textGeneration({
        model: this.model,
        inputs: prompt,
        parameters: {
          max_new_tokens: 600,
          temperature: 0.8,
          top_k: 50,
          top_p: 0.95,
        },
      });

      const generatedText = response.generated_text || response;
      const cleanedText = this._cleanResponse(generatedText);
      const structuredRecommendations =
        this._extractByNumberedSections(cleanedText);

      return {
        patient: `${patient.firstName} ${patient.lastName || ""}`,
        patient_id: patient.id,
        session_id: sessionId,
        recommendations: structuredRecommendations,
        generated_at: new Date(),
      };
    } catch (error) {
      console.error("Erreur:", error);
      return {
        patient: `${patient.firstName} ${patient.lastName || ""}`,
        patient_id: patient.id,
        session_id: sessionId,
        recommendations:
          "Impossible de générer des recommandations pour le moment.",
        is_error: true,
        generated_at: new Date(),
      };
    }
  }

  _cleanResponse(text) {
    if (!text) return "Aucun conseil généré";
    let cleanedText = text.replace(/(\n){3,}/g, "\n\n").trim();
    const delimiter = "### Réponse :";
    const index = cleanedText.indexOf(delimiter);
    if (index !== -1) {
      cleanedText = cleanedText.substring(index + delimiter.length).trim();
    }
    return cleanedText;
  }

  _extractByNumberedSections(text) {
    const regex = /(?:^|\n)(\d)\.\s*([^\n:]+)[\n:]+([\s\S]*?)(?=\n\d\.|$)/g;
    const expectedSections = {
      1: "Recommandations nutritionnelles",
      2: "Programme d'activité physique",
      3: "Hygiène de sommeil",
      4: "Synthèse personnalisée",
    };

    const result = {};
    let match;
    while ((match = regex.exec(text)) !== null) {
      const sectionNumber = parseInt(match[1]);
      const title = expectedSections[sectionNumber] || match[2].trim();
      const content = match[3].trim();
      result[title] = content;
    }

    for (const num in expectedSections) {
      const key = expectedSections[num];
      if (!result.hasOwnProperty(key)) {
        result[key] = "";
      }
    }

    if (Object.keys(result).length === 0) {
      result["Texte"] = text;
    }
    return result;
  }

  _calculateAge(birthDate) {
    if (!birthDate) return "Non spécifié";
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
}

module.exports = new HuggingFaceService();
