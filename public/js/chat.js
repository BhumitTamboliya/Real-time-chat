// Connect to the server
const socket = io();

// DOM elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Handle form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get message from input
    const message = input.value.trim();
    
    // If message is not empty
    if (message) {
        // Emit the message to the server
        socket.emit('chat message', message);
        
        // Create and display the sent message immediately
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.textContent = message;
        messages.appendChild(messageElement);
        
        // Clear the input and scroll to bottom
        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
});

// Listen for incoming messages
socket.on('chat message', (msg) => {
    // Create a new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    
    // For now, treat all incoming messages as received
    // We'll update this later to distinguish between sent and received messages
    messageElement.classList.add('received');
    
    // Add the message text
    messageElement.textContent = msg;
    
    // Add the message to the messages container
    messages.appendChild(messageElement);
    
    // Scroll to the bottom of the messages
    messages.scrollTop = messages.scrollHeight;
});

// Add a welcome message when connected
socket.on('connect', () => {
    console.log('Connected to server');
    
    // Add a welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.classList.add('message', 'received');
    welcomeMessage.textContent = 'Welcome to Simple Chat! Start sending messages.';
    messages.appendChild(welcomeMessage);
});

// Handle disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

// Auto-focus the input field when the page loads
window.addEventListener('load', () => {
    input.focus();
});
