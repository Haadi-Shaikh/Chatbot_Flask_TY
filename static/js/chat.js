const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const sendBtn  = document.getElementById("sendBtn");

// Auto-resize textarea
userInput.addEventListener("input", () => {
  userInput.style.height = "auto";
  userInput.style.height = Math.min(userInput.scrollHeight, 140) + "px";
});

// Send on Enter (Shift+Enter = newline)
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function clearWelcome() {
  const welcome = chatArea.querySelector(".welcome");
  if (welcome) welcome.remove();
}

function appendMessage(role, text) {
  clearWelcome();
  const wrapper = document.createElement("div");
  wrapper.className = `msg ${role}`;

  const label = document.createElement("div");
  label.className = "msg-label";
  label.textContent = role === "user" ? "You" : "Neural";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;

  wrapper.appendChild(label);
  wrapper.appendChild(bubble);
  chatArea.appendChild(wrapper);
  chatArea.scrollTop = chatArea.scrollHeight;
  return wrapper;
}

function showTyping() {
  clearWelcome();
  const wrapper = document.createElement("div");
  wrapper.className = "msg bot typing";
  wrapper.id = "typing-indicator";

  const label = document.createElement("div");
  label.className = "msg-label";
  label.textContent = "Neural";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;

  wrapper.appendChild(label);
  wrapper.appendChild(bubble);
  chatArea.appendChild(wrapper);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("typing-indicator");
  if (el) el.remove();
}

async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  userInput.value = "";
  userInput.style.height = "auto";
  sendBtn.disabled = true;
  showTyping();

  try {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    removeTyping();

    if (data.reply) {
      appendMessage("bot", data.reply);
    } else {
      appendMessage("bot", `⚠ Error: ${data.error || "Unknown error"}`);
    }
  } catch (err) {
    removeTyping();
    appendMessage("bot", "⚠ Network error. Please try again.");
  } finally {
    sendBtn.disabled = false;
    userInput.focus();
  }
}
