const socket = io();

document.getElementById('send-btn').addEventListener('click', function() {
  const messageInput = document.getElementById('message-input');
  const messageText = messageInput.value.trim();
  
  if (messageText) {
    socket.emit('chatMessage', messageText);
    messageInput.value = '';
  }
});

socket.on('chatMessage', function(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  document.getElementById('messages-container').appendChild(messageElement);
});
