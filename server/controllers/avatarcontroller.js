const multer = require('multer');
const path = require('path');

// Configuration de multer pour télécharger des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/avatars/custom/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Récupérer un avatar par défaut
exports.getDefaultAvatar = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/images/default-avatar.png'));
};

// Télécharger un avatar personnalisé
exports.uploadAvatar = upload.single('avatar'), (req, res) => {
  if (req.file) {
    res.json({ message: 'Avatar uploaded successfully', path: req.file.path });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
};
