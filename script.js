const API_URL = "https://my-portfolio-bot-test-2.onrender.com";

const agentStatus = document.getElementById("agentStatus");
const agentToggle = document.getElementById("agentToggle");
const refreshButton = document.getElementById("refreshButton");

const inboxCount = document.getElementById("inboxCount");
const draftCount = document.getElementById("draftCount");
const ignoredCount = document.getElementById("ignoredCount");
const emailList = document.getElementById("emailList");

const connection = document.querySelector(".connection");
const connectionText = connection.querySelector("span:last-child");
const statusDot = connection.querySelector(".status-dot");


// ===============================
// AGENT STATUS
// ===============================

async function getAgentStatus() {

    try {

        const response = await fetch(
            `${API_URL}/agent/status`
        );

        const data = await response.json();

        updateAgentUI(data.agent_enabled);

    } catch (error) {

        agentStatus.textContent = "Backend unavailable";
        agentToggle.textContent = "Error";

        console.error(error);
    }
}


function updateAgentUI(enabled) {

    if (enabled) {

        agentStatus.textContent = "Agent is ON";
        agentToggle.textContent = "Turn OFF";

    } else {

        agentStatus.textContent = "Agent is OFF";
        agentToggle.textContent = "Turn ON";
    }
}


async function toggleAgent() {

    try {

        const currentResponse = await fetch(
            `${API_URL}/agent/status`
        );

        const currentData =
            await currentResponse.json();

        const endpoint =
            currentData.agent_enabled
                ? "/agent/off"
                : "/agent/on";

        const response = await fetch(
            `${API_URL}${endpoint}`,
            {
                method: "POST"
            }
        );

        const data = await response.json();

        updateAgentUI(data.agent_enabled);

    } catch (error) {

        console.error(error);

        agentStatus.textContent =
            "Connection error";
    }
}


// ===============================
// GMAIL CONNECTION
// ===============================

async function checkGmailStatus() {

    try {

        const response = await fetch(
            `${API_URL}/gmail/status`
        );

        const data = await response.json();

        if (data.connected) {

            connectionText.textContent =
                "Gmail Connected";

            statusDot.style.background =
                "#35d07f";

            loadFilteredEmails();

        } else {

            connectionText.textContent =
                "Gmail Not Connected";

            statusDot.style.background =
                "#ff5c5c";

            showConnectButton();
        }

    } catch (error) {

        connectionText.textContent =
            "Gmail Unavailable";

        statusDot.style.background =
            "#ff5c5c";

        console.error(error);
    }
}


function showConnectButton() {

    if (
        document.getElementById(
            "connectGmailButton"
        )
    ) {
        return;
    }

    const button =
        document.createElement("button");

    button.id =
        "connectGmailButton";

    button.textContent =
        "Connect Gmail";

    button.style.marginLeft =
        "10px";

    button.style.padding =
        "10px 15px";

    button.style.border =
        "none";

    button.style.borderRadius =
        "9px";

    button.style.cursor =
        "pointer";

    button.style.fontWeight =
        "bold";

    button.addEventListener(
        "click",
        connectGmail
    );

    connection.appendChild(button);
}


async function connectGmail() {

    try {

        const response = await fetch(
            `${API_URL}/gmail/auth`
        );

        const data =
            await response.json();

        if (data.authorization_url) {

            window.location.href =
                data.authorization_url;

        } else {

            alert(
                "Could not start Gmail connection."
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Could not connect to the backend."
        );
    }
}


// ===============================
// LOAD EMAILS
// ===============================

async function loadFilteredEmails() {

    try {

        emailList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⏳</div>
                <h3>Loading emails...</h3>
                <p>AI is checking your inbox.</p>
            </div>
        `;

        const response = await fetch(
            `${API_URL}/gmail/filtered-emails`
        );

        const data =
            await response.json();

        if (!data.connected) {

            emailList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📭</div>
                    <h3>Gmail not connected</h3>
                    <p>
                        Connect Gmail to view your emails.
                    </p>
                </div>
            `;

            return;
        }

        const emails =
            data.emails || [];

        updateCounters(emails);

        await displayEmails(emails);

    } catch (error) {

        console.error(error);

        emailList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3>Could not load emails</h3>
                <p>
                    There was a problem connecting
                    to the backend.
                </p>
            </div>
        `;
    }
}


// ===============================
// COUNTERS
// ===============================

function updateCounters(emails) {

    const totalEmails =
        emails.length;

    const ignoredEmails =
        emails.filter(
            email =>
                email.classification === "IGNORE"
        ).length;

    const processEmails =
        emails.filter(
            email =>
                email.classification === "PROCESS"
        ).length;

    inboxCount.textContent =
        totalEmails;

    ignoredCount.textContent =
        ignoredEmails;

    draftCount.textContent =
        processEmails;
}


// ===============================
// DISPLAY EMAILS
// ===============================

async function displayEmails(emails) {

    if (emails.length === 0) {

        emailList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <h3>No emails yet</h3>
                <p>
                    Your email activity will appear here.
                </p>
            </div>
        `;

        return;
    }

    emailList.innerHTML = "";

    for (const email of emails) {

        const emailCard =
            document.createElement("div");

        emailCard.style.background =
            "#0b0f19";

        emailCard.style.border =
            "1px solid #202a3b";

        emailCard.style.borderRadius =
            "12px";

        emailCard.style.padding =
            "18px";

        emailCard.style.marginBottom =
            "12px";


        const status =
            email.classification === "PROCESS"
                ? "🤖 Process"
                : "🚫 Ignore";


        emailCard.innerHTML = `
            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    gap:15px;
                "
            >

                <div style="flex:1;">

                    <strong>
                        ${escapeHTML(email.from)}
                    </strong>

                    <p
                        style="
                            margin-top:6px;
                            color:#ffffff;
                        "
                    >
                        ${escapeHTML(
                            email.subject ||
                            "(No subject)"
                        )}
                    </p>

                    <p
                        style="
                            margin-top:8px;
                            color:#8d96a8;
                            font-size:13px;
                        "
                    >
                        ${escapeHTML(
                            email.snippet || ""
                        )}
                    </p>

                </div>

                <span
                    class="email-status"
                    style="
                        white-space:nowrap;
                        color:#b8c1d1;
                    "
                >
                    ${status}
                </span>

            </div>
        `;


        emailList.appendChild(
            emailCard
        );


        if (
            email.classification === "PROCESS"
        ) {

            await addDraft(
                email,
                emailCard
            );
        }
    }
}


// ===============================
// GENERATE AI DRAFT
// ===============================

async function addDraft(
    email,
    emailCard
) {

    const draftBox =
        document.createElement("div");

    draftBox.style.marginTop =
        "16px";

    draftBox.style.padding =
        "15px";

    draftBox.style.background =
        "#111827";

    draftBox.style.border =
        "1px solid #2d3a52";

    draftBox.style.borderRadius =
        "10px";


    draftBox.innerHTML = `
        <strong style="color:#ffffff;">
            ✍️ AI Draft
        </strong>

        <p
            style="
                margin-top:10px;
                color:#c8d1df;
            "
        >
            Generating draft...
        </p>
    `;


    emailCard.appendChild(
        draftBox
    );


    try {

        const response = await fetch(
            `${API_URL}/gmail/draft/${email.id}`,
            {
                method: "POST"
            }
        );

        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.detail ||
                "Draft generation failed"
            );
        }


        showDraft(
            email,
            draftBox,
            data.draft
        );


    } catch (error) {

        console.error(error);

        draftBox.innerHTML = `
            <strong
                style="color:#ff8b8b;"
            >
                ⚠️ Draft generation failed
            </strong>

            <p
                style="
                    margin-top:8px;
                    color:#8d96a8;
                "
            >
                Could not generate an AI reply.
            </p>
        `;
    }
}


// ===============================
// SHOW AI DRAFT
// ===============================

function showDraft(
    email,
    draftBox,
    draft
) {

    /*
        Convert Markdown-style **bold**
        into real bold text.

        escapeHTML() runs first so the
        AI cannot inject HTML.
    */

    const formattedDraft =
        escapeHTML(draft)
            .replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
            );


    draftBox.innerHTML = `
        <strong style="color:#ffffff;">
            ✍️ AI Draft Ready
        </strong>

        <div
            class="draft-content"
            style="
                margin-top:10px;
                padding:12px;
                background:#0b0f19;
                border-radius:8px;
                color:#c8d1df;
                white-space:pre-wrap;
                line-height:1.5;
            "
        >
            ${formattedDraft}
        </div>

        <div
            style="
                margin-top:12px;
                display:flex;
                gap:10px;
            "
        >

            <button
                class="approve-button"
                style="
                    padding:9px 14px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                    font-weight:bold;
                "
            >
                ✓ Approve & Send
            </button>

            <button
                class="edit-button"
                style="
                    padding:9px 14px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                ✏️ Edit
            </button>

        </div>
    `;


    const approveButton =
        draftBox.querySelector(
            ".approve-button"
        );

    const editButton =
        draftBox.querySelector(
            ".edit-button"
        );


    approveButton.addEventListener(
        "click",
        () => {

            sendDraft(
                email,
                draftBox,
                draft
            );
        }
    );


    editButton.addEventListener(
        "click",
        () => {

            editDraft(
                email,
                draftBox,
                draft
            );
        }
    );
}


// ===============================
// SEND EMAIL
// ===============================

async function sendDraft(
    email,
    draftBox,
    draft
) {

    const approveButton =
        draftBox.querySelector(
            ".approve-button"
        );


    approveButton.disabled =
        true;

    approveButton.textContent =
        "⏳ Sending...";


    try {

        const response = await fetch(
            `${API_URL}/gmail/send/${email.id}`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    draft: draft
                })
            }
        );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Failed to send email"
            );
        }


        approveButton.textContent =
            "✓ Sent";

        approveButton.disabled =
            true;


        const editButton =
            draftBox.querySelector(
                ".edit-button"
            );


        if (editButton) {

            editButton.disabled =
                true;
        }


        setTimeout(() => {

            draftBox.remove();

            const statusElement =
                emailCardStatus(draftBox);

        }, 700);


    } catch (error) {

        console.error(error);


        approveButton.disabled =
            false;

        approveButton.textContent =
            "✓ Approve & Send";


        alert(
            error.message ||
            "Could not send the email."
        );
    }
}


// ===============================
// EMAIL STATUS AFTER SEND
// ===============================

function emailCardStatus(draftBox) {

    const emailCard =
        draftBox.parentElement;

    if (!emailCard) {
        return;
    }

    const statusElement =
        emailCard.querySelector(
            ".email-status"
        );

    if (statusElement) {

        statusElement.textContent =
            "✅ Sent";
    }
}


// ===============================
// EDIT DRAFT
// ===============================

function editDraft(
    email,
    draftBox,
    currentDraft
) {

    draftBox.innerHTML = `
        <strong style="color:#ffffff;">
            ✏️ Edit AI Draft
        </strong>

        <textarea
            class="draft-editor"
            style="
                width:100%;
                min-height:180px;
                margin-top:10px;
                padding:12px;
                box-sizing:border-box;
                background:#0b0f19;
                border:1px solid #38465f;
                border-radius:8px;
                color:#ffffff;
                font-family:inherit;
                font-size:14px;
                line-height:1.5;
                resize:vertical;
            "
        >${escapeHTML(currentDraft)}</textarea>

        <div
            style="
                margin-top:12px;
                display:flex;
                gap:10px;
            "
        >

            <button
                class="save-edit-button"
                style="
                    padding:9px 14px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                    font-weight:bold;
                "
            >
                💾 Save Edit
            </button>

            <button
                class="cancel-edit-button"
                style="
                    padding:9px 14px;
                    border:none;
                    border-radius:8px;
                    cursor:pointer;
                "
            >
                Cancel
            </button>

        </div>
    `;


    const textarea =
        draftBox.querySelector(
            ".draft-editor"
        );

    const saveButton =
        draftBox.querySelector(
            ".save-edit-button"
        );

    const cancelButton =
        draftBox.querySelector(
            ".cancel-edit-button"
        );


    saveButton.addEventListener(
        "click",
        () => {

            const editedDraft =
                textarea.value.trim();


            if (!editedDraft) {

                alert(
                    "The draft cannot be empty."
                );

                return;
            }


            showDraft(
                email,
                draftBox,
                editedDraft
            );
        }
    );


    cancelButton.addEventListener(
        "click",
        () => {

            showDraft(
                email,
                draftBox,
                currentDraft
            );
        }
    );
}


// ===============================
// SECURITY
// ===============================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text || "";

    return div.innerHTML;
}


// ===============================
// EVENT LISTENERS
// ===============================

refreshButton.addEventListener(
    "click",
    () => {

        getAgentStatus();
        checkGmailStatus();
    }
);


agentToggle.addEventListener(
    "click",
    toggleAgent
);


// ===============================
// START APPLICATION
// ===============================

getAgentStatus();
checkGmailStatus();
