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

    // System instruction prompt memory block
    const systemInstruction = "You are a helpful, enthusiastic, and professional AI assistant representing me to visitors. Your primary objective is to showcase my lifelong passion for coding and highlight the projects I have built since childhood. Always present work proudly and chronologically: 1. School Website on Replit, 2. School Landing Page in VS Code, 3. AI Chatbot using Zapier, 4. Custom Python AI Chatbot using Groq. Keep responses concise, clear, and punchy.";

    // Layout Open/Close Toggles
    if (chatBubble) {
        chatBubble.addEventListener('mouseenter', () => { chatBubble.style.transform = 'scale(1.1)'; });
        chatBubble.addEventListener('mouseleave', () => { chatBubble.style.transform = 'scale(1)'; });
        chatBubble.addEventListener('click', () => {
            chatModal.style.display = chatModal.style.display === 'none' || chatModal.style.display === '' ? 'flex' : 'none';
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', () => { chatModal.style.display = 'none'; });

    // Text Message Rendering Utility
    function appendMessage(text, role) {
        const bubble = document.createElement('div');
        bubble.className = role === 'user' ? 'chat-bubble user-bubble' : 'chat-bubble assistant-bubble';
        bubble.innerText = text;
        messagesContainer.appendChild(bubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Action Trigger Logic Handler
    async function handleSendMessage() {
        const query = userInput.value.trim();
        if (!query) return;

        appendMessage(query, 'user');
        userInput.value = '';

        // Create placeholder loading bubble
        const loadingBubble = document.createElement('div');
        loadingBubble.className = 'chat-bubble assistant-bubble';
        loadingBubble.style.color = '#94a3b8'; 
        loadingBubble.innerText = 'Typing...';
        messagesContainer.appendChild(loadingBubble);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Using Hugging Face's unblockable public endpoint router gateway 
            const response = await fetch('https://huggingface.co', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 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', // Open free proxy token key
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "Qwen/Qwen2.5-Coder-7B-Instruct",
                    messages: [
                        { role: "system", content: systemInstruction },
                        { role: "user", content: query }
                    ],
                    max_tokens: 150
                })
            });
            
            const data = await response.json();
            messagesContainer.removeChild(loadingBubble);

            if (data.choices && data.choices[0].message && data.choices[0].message.content) {
                const reply = data.choices[0].message.content;
                appendMessage(reply, 'assistant');
            } else {
                appendMessage("Sorry, I had trouble parsing the response pipeline.", 'assistant');
            }
        } catch (err) {
            if (messagesContainer.contains(loadingBubble)) {
                messagesContainer.removeChild(loadingBubble);
            }
            appendMessage("Network response stream pipeline timed out.", 'assistant');
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSendMessage);
        userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSendMessage(); });
    }
});
