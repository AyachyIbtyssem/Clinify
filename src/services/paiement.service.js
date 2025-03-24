require("dotenv").config();
const axios = require("axios");
const paiementRepository = require("../repositories/paiement.repository");
const Paiement = require("../models/paiement.model"); // Vérifie le bon chemin

// Récupérer tous les paiements
const getAllPaiements = async () => {
  return await paiementRepository.findAllPaiements();
};

// Récupérer un paiement par ID
const getPaiementById = async (id) => {
  return await paiementRepository.findPaiementById(id);
};

// Effectuer un paiement via Paymee
const effectuerPaiement = async (montant, idRdv, methodePaiement, userInfo) => {
  try {
    // Appel à l'API de Paymee
    const response = await axios.post(process.env.PAYMEE_API_URL, {
      vendor: process.env.PAYMEE_VENDOR,
      amount: montant,
      order_id: `CMD_${idRdv}`,
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      webhook_url: "http://localhost:3000/api/paiements/webhook",
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      email: userInfo.email,
    }, {
      headers: {
        "Authorization": `Token ${process.env.PAYMEE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.data || !response.data.success) {
      throw new Error("Paiement refusé par Paymee");
    }

    // Stocker la transaction en BDD
    const paiement = await Paiement.create({
      montant,
      methodePaiement,
      datePaiement: new Date(),
      statut: "en attente",
      transactionId: response.data.data.payment_id, // ID transaction Paymee
      referencePaymee: response.data.data.token, // Référence unique Paymee
      IdRDV: idRdv,
    });

    return paiement;
  } catch (error) {
    console.error("❌ Erreur de paiement :", error.response?.data || error.message);
    throw new Error("Échec du paiement avec Paymee.");
  }
};


// Ajouter un paiement
const addPaiement = async (paiementData) => {
  try {
    console.log("📤 Données à insérer :", paiementData);

    const paiement = await Paiement.create(paiementData);
    
    console.log("✅ Paiement ajouté en DB :", paiement);
    return paiement;
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout du paiement :", error);
    throw new Error("Impossible d'ajouter le paiement.");
  }
};


module.exports = {
  getAllPaiements,
  getPaiementById,
  addPaiement,
  effectuerPaiement,
};
