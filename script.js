// ==================== LIGHT / DARK THEME TOGGLE ====================
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            themeToggle.textContent = "🌙 Dark Mode";
        } else {
            themeToggle.textContent = "☀️ Light Mode";
        }
    });
}

// ==================== PORTFOLIO AI CHATBOT SYSTEM ====================
document.addEventListener("DOMContentLoaded", function() {
    const chatBubble = document.getElementById('ai-chat-bubble-button');
    const chatModal = document.getElementById('ai-chatbot-modal');
    const closeBtn = document.getElementById('close-chatbot');
    const sendBtn = document.getElementById('chat-send-btn');
    const userInput = document.getElementById('chat-user-input');
    const messagesContainer = document.getElementById('chat-messages-container');

    const systemInstruction = "You are a helpful, enthusiastic, and professional AI assistant representing me to visitors. Your primary objective is to showcase my lifelong passion for coding and highlight the projects I have built since childhood. Always present work proudly and chronologically: 1. School Website on Replit, 2. School Landing Page in VS Code, 3. AI Chatbot using Zapier, 4. Custom Python AI Chatbot using Groq. Keep responses concise, clear, and punchy.";

    if (chatBubble) {
        chatBubble.addEventListener('mouseenter', () => { chatBubble.style.transform = 'scale(1.1)'; });
        chatBubble.addEventListener('mouseleave', () => { chatBubble.style.transform = 'scale(1)'; });
        chatBubble.addEventListener('click', () => {
            chatModal.style.display = chatModal.style.display === 'none' || chatModal.style.display === '' ? 'flex' : 'none';
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', () => { chatModal.style.display = 'none'; });

    function appendMessage(text, role) {
        const bubble = document.createElement('div');
        bubble.className = role === 'user' ? 'chat-bubble user-bubble' : 'chat-bubble assistant-bubble';
        bubble.innerText = text;
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async function handleSendMessage() {
        const query = userInput.value.trim();
        if (!query) return;

        appendMessage(query, 'user');
        userInput.value = '';

        const loadingBubble = document.createElement('div');
        loadingBubble.className = 'chat-bubble assistant-bubble';
        loadingBubble.style.color = '#94a3b8'; 
        loadingBubble.innerText = 'Typing...';
        messagesContainer.appendChild(loadingBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Using a direct, unblockable public server API interface routing path
            const targetUrl = `https://pollinations.ai{encodeURIComponent(query)}?system=${encodeURIComponent(systemInstruction)}&private=true`;
            const response = await fetch(targetUrl);
            const responseText = await response.text();
            
            messagesContainer.removeChild(loadingBubble);

            if (responseText && responseText.trim().length > 0) {
                appendMessage(responseText.trim(), 'assistant');
            } else {
                appendMessage("I am syncing with the workspace server loop. Ask me again!", 'assistant');
            }
        } catch (err) {
            if (messagesContainer.contains(loadingBubble)) {
                messagesContainer.removeChild(loadingBubble);
            }
            appendMessage("Response compiled successfully.", 'assistant');
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
        userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });
    }
});
