const API_KEY = "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"; // Replace this with your OpenAI API key
const API_URL = "https://api.openai.com/v1/chat/completions";

async function fetchGPTResponse(messages) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4", // Change this to the model you want to use (e.g., gpt-3.5-turbo)
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Failed to fetch GPT response:", error);
    return "I'm sorry, but I couldn't process your request. Please try again later.";
  }
}
