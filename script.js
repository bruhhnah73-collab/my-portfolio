const API_URL = "https://my-portfolio-bot-test.onrender.com";

const themeToggle = document.getElementById("themeToggle");
const devMode = document.getElementById("devMode");

const developerTerminal = document.getElementById("developerTerminal");
const closeTerminal = document.getElementById("closeTerminal");
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");


// =========================
// DEVELOPER MODE
// =========================

devMode.addEventListener("click", () => {

    developerTerminal.classList.add("active");

    document.body.classList.add("developer-mode");

    terminalOutput.innerHTML = "";

    const bootLines = [
        "BRUHH Developer Terminal v1.0",
        "",
        "Initializing developer environment...",
        "Loading portfolio........ OK",
        "Loading projects......... OK",
        "Loading AI systems....... OK",
        "Loading automation....... OK",
        "",
        "🟢 SYSTEM ONLINE",
        "",
        "Type 'help' to see available commands."
    ];

    let index = 0;

    function showBootLine() {

        if (index >= bootLines.length) {
            terminalInput.focus();
            return;
        }

        addTerminalLine(bootLines[index]);

        index++;

        setTimeout(showBootLine, 180);
    }

    showBootLine();

});

// =========================
// CLOSE DEVELOPER TERMINAL
// =========================

closeTerminal.addEventListener("click", () => {

    developerTerminal.classList.remove("active");

    document.body.classList.remove("developer-mode");

});


// =========================
// TERMINAL COMMANDS
// =========================

terminalInput.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") {
        return;
    }

    const command = terminalInput.value.trim().toLowerCase();

    if (!command) {
        return;
    }


    // Show entered command

    const commandLine = document.createElement("p");

    commandLine.innerHTML = `&gt; ${command}`;

    terminalOutput.appendChild(commandLine);


    // Clear input

    terminalInput.value = "";


    // =========================
    // COMMAND: HELP
    // =========================

    if (command === "help") {

        addTerminalLine("Available commands:");
        addTerminalLine("help - Show available commands");
        addTerminalLine("projects - Show my projects");
        addTerminalLine("about - About BRUHH");
        addTerminalLine("skills - Show my skills");
        addTerminalLine("stack - Show my tech stack");
        addTerminalLine("whoami - Show developer profile");
        addTerminalLine("time - Show current time");
        addTerminalLine("status - Show developer status");
        addTerminalLine("clear - Clear terminal");

    }


    // =========================
    // COMMAND: PROJECTS
    // =========================

    else if (command === "projects") {

        addTerminalLine("📁 Projects:");
        addTerminalLine("🏫 School Admin Dashboard");
        addTerminalLine("🌐 Gyanodaya School Website");
        addTerminalLine("💬 Portfolio AI Chatbot");
        addTerminalLine("🤖 Custom Python AI Chatbot");
        addTerminalLine("📬 AI Email Assistant");
        addTerminalLine("☁️ Autonomous AI Social Media Pipeline");

    }


    // =========================
    // COMMAND: ABOUT
    // =========================

    else if (command === "about") {

        addTerminalLine("BRUHH");
        addTerminalLine("Student | AI Builder | Web Developer | Tech Explorer");
        addTerminalLine("Currently experimenting with AI, automation, APIs and web development.");

    }

    // =========================
    // EXTRA DEVELOPER COMMANDS
    // =========================

    else if (command === "skills") {

        addTerminalLine("🧠 Skills:");
        addTerminalLine("🐍 Python");
        addTerminalLine("🌐 HTML / CSS / JavaScript");
        addTerminalLine("⚡ FastAPI");
        addTerminalLine("🤖 AI Integration");
        addTerminalLine("🔗 APIs");
        addTerminalLine("⚙️ Automation");

    }

    else if (command === "stack") {

        addTerminalLine("🛠️ Tech Stack:");
        addTerminalLine("Python");
        addTerminalLine("JavaScript");
        addTerminalLine("HTML / CSS");
        addTerminalLine("FastAPI");
        addTerminalLine("Groq");
        addTerminalLine("OpenRouter");
        addTerminalLine("Make.com");
        addTerminalLine("Zapier");
        addTerminalLine("GitHub");

    }

    else if (command === "whoami") {

        addTerminalLine("👤 BRUHH");
        addTerminalLine("🎓 Student Developer");
        addTerminalLine("🤖 AI Builder");
        addTerminalLine("🌐 Web Developer");
        addTerminalLine("⚡ Tech Explorer");

    }

    else if (command === "time") {

        const currentTime = new Date().toLocaleTimeString();

        addTerminalLine(`🕒 Current time: ${currentTime}`);

    }

    // =========================
    // COMMAND: STATUS
    // =========================

    else if (command === "status") {

        addTerminalLine("🟢 Developer Mode: ACTIVE");
        addTerminalLine("🟢 Portfolio: ONLINE");
        addTerminalLine("🟢 AI Chatbot: CONNECTED");
        addTerminalLine("🟢 Email Assistant: ONLINE");

    }


    // =========================
    // COMMAND: CLEAR
    // =========================

    else if (command === "clear") {

        terminalOutput.innerHTML = "";

    }


    // =========================
    // UNKNOWN COMMAND
    // =========================

    else {

        addTerminalLine(
            `❌ Unknown command: ${command}`
        );

        addTerminalLine(
            "Type 'help' to see available commands."
        );

    }


    // Scroll terminal down

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;

});


// =========================
// TERMINAL OUTPUT HELPER
// =========================

function addTerminalLine(text) {

    const line = document.createElement("p");

    line.textContent = text;

    terminalOutput.appendChild(line);

}

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
