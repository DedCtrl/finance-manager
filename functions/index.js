const { onCall } = require("firebase-functions/v2/https");
const { genkit } = require("genkit");
const { googleAI, gemini15Flash } = require("@genkit-ai/google-genai");

// Initialize Genkit with Gemini
const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY })],
  model: gemini15Flash,
});

// Firebase Function that React will call
exports.extractTransactions = onCall(async (request) => {
  try {
    const { fileData, fileType } = request.data;

    // Prompt telling Gemini exactly what to extract and how to return it
    const prompt = `
      You are a financial data extraction assistant.
      Analyze this transaction statement and extract all transactions.
      Return ONLY a valid JSON array with no extra text, no markdown, no explanation.
      Each transaction object must have these exact fields:
      - date: (string, format DD/MM/YYYY)
      - description: (string, merchant or transaction name)
      - amount: (number, always positive)
      - type: (string, either "credit" or "debit")
      - category: (string, best guess like Food, Transport, Shopping, Bills, Entertainment, Other)

      Example format:
      [
        {
          "date": "01/05/2025",
          "description": "Swiggy Order",
          "amount": 450,
          "type": "debit",
          "category": "Food"
        }
      ]

      Transaction statement content:
      ${fileData}
    `;

    const { text } = await ai.generate(prompt);

    // Clean the response and parse it as JSON
    const cleaned = text.replace(/```json|```/g, "").trim();
    const transactions = JSON.parse(cleaned);

    return { success: true, transactions };

  } catch (error) {
    console.error("Extraction error:", error);
    return { success: false, error: error.message };
  }
});