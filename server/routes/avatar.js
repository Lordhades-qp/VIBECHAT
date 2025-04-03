const express = require('express');
const router = express.Router();
const avatarController = require('../controllers/avatarController');

// Route pour récupérer un avatar par défaut
router.get('/default', avatarController.getDefaultAvatar);

// Route pour télécharger un avatar personnalisé
router.post('/upload', avatarController.uploadAvatar);

module.exports = router;
