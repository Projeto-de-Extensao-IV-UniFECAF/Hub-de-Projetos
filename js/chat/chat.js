function toggleChat() {
    const chatContainer = document.getElementById('chat-widget');
    chatContainer.classList.toggle('open');
}

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const userMessage = userInput.value;

    if (userMessage.trim() === '') {
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${userMessage}</p>`;
    chatBox.appendChild(messageDiv);

    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Placeholder for bot response
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.className = 'message bot-message';
        botMessageDiv.innerHTML = `<p>Desculpe, ainda estou aprendendo e não posso responder a isso.</p>`;
        chatBox.appendChild(botMessageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
