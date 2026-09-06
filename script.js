const API_URL = "https://my-portfolio-bot-test.onrender.com";

const themeToggle = document.getElementById("themeToggle");

const chatBubbleButton = document.getElementById("ai-chat-bubble-button");
const chatbotModal = document.getElementById("ai-chatbot-modal");
const closeChatbot = document.getElementById("close-chatbot");

const chatMessagesContainer = document.getElementById("chat-messages-container");
const chatUserInput = document.getElementById("chat-user-input");
const chatSendButton = document.getElementById("chat-send-btn");

const emailAssistantButton = document.getElementById("email-assistant-button");


// =========================
// THEME TOGGLE
// =========================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙 Dark Mode";
    } else {
        themeToggle.textContent = "☀️ Light Mode";
    }

});


// =========================
// OPEN PORTFOLIO CHATBOT
// =========================

chatBubbleButton.addEventListener("click", () => {

    chatbotModal.classList.add("active");

    chatUserInput.focus();

});


// =========================
// CLOSE PORTFOLIO CHATBOT
// =========================

closeChatbot.addEventListener("click", () => {

    chatbotModal.classList.remove("active");

});


// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {

    const message = chatUserInput.value.trim();

    if (!message) {
        return;
    }


    // Show user's message

    addMessage(message, "user");


    // Clear input

    chatUserInput.value = "";


    // Disable button while AI responds

    chatSendButton.disabled = true;


    // Show thinking message

    const thinkingMessage = addMessage(
        "Thinking...",
        "assistant"
    );


    try {

        const response = await fetch(`${API_URL}/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });


        if (!response.ok) {
            throw new Error("Backend request failed.");
        }


        const data = await response.json();


        // Remove thinking message

        thinkingMessage.remove();


        // Show AI response

        addMessage(
            data.response,
            "assistant"
        );


    } catch (error) {

        thinkingMessage.remove();

        addMessage(
            "Sorry, I couldn't connect to my AI backend right now.",
            "assistant"
        );

        console.error(error);

    } finally {

        chatSendButton.disabled = false;

        chatUserInput.focus();

    }

}


// =========================
// ADD MESSAGE
// =========================

function addMessage(message, sender) {

    const messageBubble = document.createElement("div");

    messageBubble.classList.add(
        "chat-bubble",
        sender === "user"
            ? "user-bubble"
            : "assistant-bubble"
    );


    messageBubble.textContent = message;


    chatMessagesContainer.appendChild(
        messageBubble
    );


    chatMessagesContainer.scrollTop =
        chatMessagesContainer.scrollHeight;


    return messageBubble;

}


// =========================
// SEND BUTTON
// =========================

chatSendButton.addEventListener(
    "click",
    sendMessage
);


// =========================
// ENTER KEY
// =========================

chatUserInput.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


// =========================
// AI EMAIL ASSISTANT
// =========================

emailAssistantButton.addEventListener(
    "click",
    () => {

        window.open(
            "https://email-agent-panel.onrender.com/",
            "_blank"
        );

    }
);
