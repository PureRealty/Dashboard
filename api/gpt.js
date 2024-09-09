document.getElementById('send-btn').addEventListener('click', sendMessage);

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === "") return;

    addMessage(userInput, 'user-message');
    document.getElementById('user-input').value = '';

    fetchGPTResponse(userInput);
}

function addMessage(text, className) {
    const messageContainer = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = text;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

async function fetchGPTResponse(prompt) {
    try {
        const response = await fetch('/api/gpt', {  // This points to the Vercel serverless function
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        if (data.error) {
            addMessage('Error: Could not get response from GPT.', 'gpt-message');
        } else {
            const gptMessage = data.response;
            addMessage(gptMessage, 'gpt-message');
        }
    } catch (error) {
        console.error('Error fetching GPT response:', error);
        addMessage('Error: Could not get response from GPT.', 'gpt-message');
    }
}

function toggleChatSidebar() {
    const chatSidebar = document.getElementById('chat-sidebar');
    chatSidebar.classList.toggle('open');
}
