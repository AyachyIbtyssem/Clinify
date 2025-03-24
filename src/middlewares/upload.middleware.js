const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Définir le bon chemin pour stocker les fichiers
const uploadDir = path.join(__dirname, "../../src/uploads");

// Vérifier si le dossier `uploads/` existe, sinon le créer
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Stocker dans `src/uploads/`
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname);
    console.log("Fichier enregistré :", fileName);
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers PDF sont autorisés !"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

module.exports = upload;
