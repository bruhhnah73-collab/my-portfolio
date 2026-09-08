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
        "BRUHH Developer Terminal v2.0",
        "",
        "Initializing developer environment...",
        "Loading portfolio........ OK",
        "Loading projects......... OK",
        "Loading AI systems....... OK",
        "Loading automation....... OK",
        "Loading developer tools.. OK",
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

        setTimeout(showBootLine, 150);
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

    let command = terminalInput.value.trim().toLowerCase();

    if (!command) {
        return;
    }


    // =========================
    // COMMAND ALIASES
    // =========================

    if (command === "cls") {
        command = "clear";
    }

    if (command === "ls") {
        command = "projects";
    }

    if (command === "dir") {
        command = "projects";
    }


    // =========================
    // SHOW ENTERED COMMAND
    // =========================

    const commandLine = document.createElement("p");

    commandLine.textContent = `> ${command}`;

    terminalOutput.appendChild(commandLine);


    // Clear input

    terminalInput.value = "";


    // =========================
    // COMMAND: HELP
    // =========================

    if (command === "help") {

        addTerminalLine("Available commands:");
        addTerminalLine("");
        addTerminalLine("help - Show available commands");
        addTerminalLine("projects - Show my projects");
        addTerminalLine("about - About BRUHH");
        addTerminalLine("skills - Show my skills");
        addTerminalLine("stack - Show my tech stack");
        addTerminalLine("whoami - Show developer profile");
        addTerminalLine("info - Show system overview");
        addTerminalLine("system - Show browser information");
        addTerminalLine("time - Show current time");
        addTerminalLine("date - Show current date");
        addTerminalLine("uptime - Show portfolio uptime");
        addTerminalLine("contact - Show contact information");
        addTerminalLine("banner - Show developer banner");
        addTerminalLine("dashboard - Show developer dashboard");
        addTerminalLine("");
        addTerminalLine("open projects - Open projects section");
        addTerminalLine("open chatbot - Open AI chatbot");
        addTerminalLine("open email - Open AI Email Assistant");
        addTerminalLine("open portfolio - Close terminal");
        addTerminalLine("");
        addTerminalLine("theme dark - Switch to dark mode");
        addTerminalLine("theme light - Switch to light mode");
        addTerminalLine("");
        addTerminalLine("clear - Clear terminal");

    }


    // =========================
    // COMMAND: PROJECTS
    // =========================

    else if (command === "projects") {

        addTerminalLine("📁 PROJECTS");
        addTerminalLine("────────────────────────");

        addTerminalLine("[1] 🏫 School Admin Dashboard");
        addTerminalLine("[2] 🌐 Gyanodaya School Website");
        addTerminalLine("[3] 💬 Portfolio AI Chatbot");
        addTerminalLine("[4] 🤖 Custom Python AI Chatbot");
        addTerminalLine("[5] 📬 AI Email Assistant");
        addTerminalLine("[6] ☁️ Autonomous AI Social Media Pipeline");
        addTerminalLine("[7] 🚀 Project Showcase");


        addTerminalLine("────────────────────────");
        addTerminalLine("Total projects: 7");

    }


    // =========================
    // COMMAND: ABOUT
    // =========================

    else if (command === "about") {

        addTerminalLine("BRUHH");
        addTerminalLine("");
        addTerminalLine(
            "Student | AI Builder | Web Developer | Tech Explorer"
        );
        addTerminalLine("");
        addTerminalLine(
            "Currently experimenting with AI, automation, APIs and web development."
        );

    }


    // =========================
    // COMMAND: SKILLS
    // =========================

    else if (command === "skills") {

        addTerminalLine("🧠 SKILLS");
        addTerminalLine("────────────────────────");

        addTerminalLine("🐍 Python");
        addTerminalLine("🌐 HTML / CSS / JavaScript");
        addTerminalLine("⚡ FastAPI");
        addTerminalLine("🤖 AI Integration");
        addTerminalLine("🔗 APIs");
        addTerminalLine("⚙️ Automation");

    }


    // =========================
    // COMMAND: STACK
    // =========================

    else if (command === "stack") {

        addTerminalLine("🛠️ TECH STACK");
        addTerminalLine("────────────────────────");

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


    // =========================
    // COMMAND: WHOAMI
    // =========================

    else if (command === "whoami") {

        addTerminalLine("👤 BRUHH");
        addTerminalLine("");
        addTerminalLine("🎓 Student Developer");
        addTerminalLine("🤖 AI Builder");
        addTerminalLine("🌐 Web Developer");
        addTerminalLine("⚡ Tech Explorer");

    }


    // =========================
    // COMMAND: INFO
    // =========================

    else if (command === "info") {

        addTerminalLine("ℹ️ SYSTEM OVERVIEW");
        addTerminalLine("────────────────────────");

        addTerminalLine("Portfolio       🟢 ONLINE");
        addTerminalLine("AI Chatbot      🟢 CONNECTED");
        addTerminalLine("Email Assistant 🟢 ONLINE");
        addTerminalLine("Developer Mode  🟢 ACTIVE");
        addTerminalLine("Projects        7");
        addTerminalLine("AI Systems      2+");

    }


    // =========================
    // COMMAND: SYSTEM
    // =========================

    else if (command === "system") {

        addTerminalLine("💻 SYSTEM INFORMATION");
        addTerminalLine("────────────────────────");

        addTerminalLine(`Browser: ${navigator.userAgent}`);
        addTerminalLine(`Platform: ${navigator.platform}`);
        addTerminalLine(`Language: ${navigator.language}`);
        addTerminalLine(
            `Screen: ${window.screen.width} × ${window.screen.height}`
        );

    }


    // =========================
    // COMMAND: TIME
    // =========================

    else if (command === "time") {

        const currentTime = new Date().toLocaleTimeString();

        addTerminalLine(`🕒 Current time: ${currentTime}`);

    }


    // =========================
    // COMMAND: DATE
    // =========================

    else if (command === "date") {

        const currentDate = new Date().toLocaleDateString();

        addTerminalLine(`📅 Current date: ${currentDate}`);

    }


    // =========================
    // COMMAND: UPTIME
    // =========================

    else if (command === "uptime") {

        const launchDate = new Date("2026-01-01T00:00:00");
        const now = new Date();

        const difference = now - launchDate;

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        addTerminalLine("⏱️ PORTFOLIO UPTIME");
        addTerminalLine("────────────────────────");
        addTerminalLine(`${days} days since developer system launch`);

    }


    // =========================
    // COMMAND: CONTACT
    // =========================

    else if (command === "contact") {

        addTerminalLine("📡 CONTACT");
        addTerminalLine("────────────────────────");

        addTerminalLine("Check the Contact section of the portfolio.");
        addTerminalLine("You can also use the Email Assistant.");

    }


    // =========================
    // COMMAND: BANNER
    // =========================

    else if (command === "banner") {

        addTerminalLine("");
        addTerminalLine("██████╗ ██████╗ ██╗   ██╗██╗  ██╗");
        addTerminalLine("██╔══██╗██╔══██╗██║   ██║██║  ██║");
        addTerminalLine("██████╔╝██████╔╝██║   ██║███████║");
        addTerminalLine("██╔══██╗██╔══██╗██║   ██║██╔══██║");
        addTerminalLine("██████╔╝██║  ██║╚██████╔╝██║  ██║");
        addTerminalLine("╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝");
        addTerminalLine("");
        addTerminalLine("AI BUILDER • WEB DEVELOPER • AUTOMATION");

    }


    // =========================
    // COMMAND: DASHBOARD
    // =========================

    else if (command === "dashboard") {

        addTerminalLine("");
        addTerminalLine("╔══════════════════════════════╗");
        addTerminalLine("║     BRUHH DEVELOPER SYSTEM   ║");
        addTerminalLine("╠══════════════════════════════╣");
        addTerminalLine("║ Portfolio       🟢 ONLINE     ║");
        addTerminalLine("║ AI Chatbot      🟢 ONLINE     ║");
        addTerminalLine("║ Email Agent     🟢 ONLINE     ║");
        addTerminalLine("║ Projects        07            ║");
        addTerminalLine("║ Developer Mode  🟢 ACTIVE     ║");
        addTerminalLine("╚══════════════════════════════╝");
        addTerminalLine("");

    }


    // =========================
    // OPEN PROJECTS
    // =========================

    else if (command === "open projects") {

        addTerminalLine("📁 Opening projects...");

        const projectsSection =
            document.querySelector(".portfolio-container");

        if (projectsSection) {

            projectsSection.scrollIntoView({
                behavior: "smooth"
            });

        } else {

            addTerminalLine("❌ Projects section not found.");

        }

    }


    // =========================
    // OPEN CHATBOT
    // =========================

    else if (command === "open chatbot") {

        addTerminalLine("💬 Opening Portfolio AI Chatbot...");

        developerTerminal.classList.remove("active");

        document.body.classList.remove("developer-mode");

        chatbotModal.classList.add("active");

        chatUserInput.focus();

    }


    // =========================
    // OPEN EMAIL
    // =========================

    else if (command === "open email") {

        addTerminalLine("📬 Opening AI Email Assistant...");

        window.open(
            "https://email-agent-panel.onrender.com/",
            "_blank"
        );

    }


    // =========================
    // OPEN PORTFOLIO
    // =========================

    else if (command === "open portfolio") {

        addTerminalLine("🌐 Returning to portfolio...");

        setTimeout(() => {

            developerTerminal.classList.remove("active");

            document.body.classList.remove("developer-mode");

        }, 300);

    }


    // =========================
    // THEME DARK
    // =========================

    else if (command === "theme dark") {

        document.body.classList.remove("light-mode");

        themeToggle.textContent = "☀️ Light Mode";

        addTerminalLine("🌙 Dark mode activated.");

    }


    // =========================
    // THEME LIGHT
    // =========================

    else if (command === "theme light") {

        document.body.classList.add("light-mode");

        themeToggle.textContent = "🌙 Dark Mode";

        addTerminalLine("☀️ Light mode activated.");

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


    // =========================
    // SCROLL TERMINAL DOWN
    // =========================

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


// =========================
// CHATBOT ELEMENTS
// =========================

const chatBubbleButton =
    document.getElementById("ai-chat-bubble-button");

const chatbotModal =
    document.getElementById("ai-chatbot-modal");

const closeChatbot =
    document.getElementById("close-chatbot");

const chatMessagesContainer =
    document.getElementById("chat-messages-container");

const chatUserInput =
    document.getElementById("chat-user-input");

const chatSendButton =
    document.getElementById("chat-send-btn");

const emailAssistantButton =
    document.getElementById("email-assistant-button");


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

            throw new Error(
                "Backend request failed."
            );

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
// ADD CHAT MESSAGE
// =========================

function addMessage(message, sender) {

    const messageBubble =
        document.createElement("div");

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
