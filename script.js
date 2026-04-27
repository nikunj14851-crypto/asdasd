document.getElementById("send-btn").addEventListener("click", async () => {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  displayMessage(userInput, "user");
  document.getElementById("user-input").value = "";

  const response = await getGPTResponse(userInput);
  displayMessage(response, "bot");
});

function displayMessage(message, sender) {
  const chatDisplay = document.getElementById("chat-display");
  const messageElement = document.createElement("div");
  messageElement.className = sender === "user" ? "user-message" : "bot-message";
  messageElement.textContent = message;
  chatDisplay.appendChild(messageElement);
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

async function getGPTResponse(query) {
  const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your key.
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error communicating with GPT API:", error);
    return "Sorry, I'm having trouble connecting to the server.";
  }
}
