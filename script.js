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
// ==================== AI CHATBOT ====================

const chatBubble = document.getElementById("ai-chat-bubble-button");
const chatbotModal = document.getElementById("ai-chatbot-modal");
const closeChatbot = document.getElementById("close-chatbot");
const chatInput = document.getElementById("chat-user-input");
const sendButton = document.getElementById("chat-send-btn");
const messagesContainer = document.getElementById("chat-messages-container");

// Your deployed FastAPI backend
const API_URL = "https://my-portfolio-bot-test.onrender.com";

// Open chatbot
chatBubble.addEventListener("click", function () {
    chatbotModal.style.display = "flex";
});

// Close chatbot
closeChatbot.addEventListener("click", function () {
    chatbotModal.style.display = "none";
});

// Add message to chat
function addMessage(message, type) {
    const bubble = document.createElement("div");

    bubble.classList.add("chat-bubble");

    if (type === "user") {
        bubble.classList.add("user-bubble");
    } else {
        bubble.classList.add("assistant-bubble");
    }

    bubble.textContent = message;

    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Send message
async function sendMessage() {

    const message = chatInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    chatInput.value = "";

    sendButton.disabled = true;
    sendButton.textContent = "Thinking...";

    try {

        const response = await fetch(API_URL, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        addMessage(data.response, "assistant");

    } catch (error) {

        console.error(error);

        addMessage(
            "Sorry, I couldn't connect to the AI right now.",
            "assistant"
        );

    } finally {

        sendButton.disabled = false;
        sendButton.textContent = "Send";

    }
}

// Send button
sendButton.addEventListener("click", sendMessage);

// Press Enter to send
chatInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
