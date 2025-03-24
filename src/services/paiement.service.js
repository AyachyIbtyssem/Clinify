require("dotenv").config();
const axios = require("axios");
const paiementRepository = require("../repositories/paiement.repository");

// Récupérer tous les paiements
const getAllPaiements = async () => {
  return await paiementRepository.findAllPaiements();
};

// Récupérer un paiement par ID
const getPaiementById = async (id) => {
  const paiement = await paiementRepository.findPaiementById(id);
  if (!paiement) {
    throw new Error("Paiement non trouvé");
  }
  return paiement;
};



// Mettre à jour un paiement
const updatePaiement = async (id, paiementData) => {
  const updatedPaiement = await paiementRepository.updatePaiementById(
    id,
    paiementData
  );
  if (updatedPaiement[0] === 0) {
    // Sequelize retourne [nombre de lignes affectées]
    throw new Error("Paiement non trouvé");
  }
  return updatedPaiement;
};

// Supprimer un paiement
const deletePaiement = async (id) => {
  const deleted = await paiementRepository.deletePaiementById(id);
  if (!deleted) {
    throw new Error("Paiement non trouvé");
  }
  return deleted;
};

// Fonction pour initier un paiement avec Paymee
const effectuerPaiementPaymee = async (montant, idRdv, methodePaiement) => {
  try {
    if (methodePaiement !== "Paymee") {
      throw new Error("Méthode de paiement non prise en charge");
    }

    const response = await axios.post(
      "https://sandbox.paymee.tn/api/v2/payments/create",
      {
        vendor: process.env.PAYMEE_VENDOR, // Ton numéro de compte Paymee (ex: 3699)
        amount: montant,
        note: `Paiement pour le RDV ${idRdv}`,
        order_id: `CMD_${idRdv}`,
        return_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${process.env.PAYMEE_API_KEY}`,
        },
      }
    );

    console.log("Réponse Paymee :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur Paymee :", error.response?.data || error.message);
    throw new Error("Échec du paiement Paymee");
  }
};

// Ajouter un paiement dans la base de données et l’envoyer à Paymee
const addPaiement = async (paiementData) => {
  try {
    // Sauvegarder le paiement en base de données
    const paiement = await paiementRepository.createPaiement(paiementData);

    // Si c'est un paiement via Paymee, on envoie la requête à Paymee
    if (paiementData.methodePaiement === "Paymee") {
      const paymeeResponse = await effectuerPaiementPaymee(
        paiement.montant,
        paiement.IdRDV,
        paiement.methodePaiement
      );

      // Mise à jour du statut en fonction de la réponse de Paymee
      paiement.statut = paymeeResponse.success ? "validé" : "échoué";
      await paiement.save();
    }

    return paiement;
  } catch (error) {
    console.error("Erreur lors de l'ajout du paiement :", error);
    throw new Error("Impossible d'ajouter le paiement");
  }
};
module.exports = {
  getAllPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement,
  effectuerPaiementPaymee,
  addPaiement,
};
