const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost/vibechat', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Initialisation de Socket.IO
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
const io = socketIO(server);

// Gestion des connexions WebSocket
io.on('connection', socket => {
  console.log('User connected');
  
  // Recevoir un message du client et le diffuser
  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });
  
  // Déconnexion d'un utilisateur
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Route pour les avatars
const avatarRouter = require('./routes/avatar');
app.use('/avatars', avatarRouter);

// Route pour la page principale du chat
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/chat/index.html'));
});
