import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(bodyParser.json());

const __dirname = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/+([A-Za-z]:)/, "$1")
);
const PROMPT_DIR = path.join(__dirname, "../prompts");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

function loadPrompt(type) {
  const promptPath = path.join(PROMPT_DIR, `${type}.json`);
  if (!fs.existsSync(promptPath)) throw new Error("Prompt not found");
  const promptObj = JSON.parse(fs.readFileSync(promptPath, "utf-8"));
  return promptObj.prompt;
}

// Gemini API call implementation using @google/genai
async function generateWithGemini(prompt) {
  if (!GEMINI_API_KEY) throw new Error("Missing Gemini API key");
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: prompt,
    });
    return response.text || "[No content generated]";
  } catch (err) {
    throw new Error(err.message || "Gemini API error");
  }
}

app.post("/generate", async (req, res) => {
  const { content, type, retries = 1 } = req.body;
  if (!content || !type)
    return res.status(400).json({ error: "Missing content or type" });
  let result = null;
  let lastError = null;
  for (let i = 0; i < retries; i++) {
    try {
      const promptTemplate = loadPrompt(type);
      const prompt = promptTemplate.replace("{{content}}", content);
      result = await generateWithGemini(prompt);
      break;
    } catch (err) {
      lastError = err;
    }
  }
  if (result) return res.json({ result });
  res
    .status(500)
    .json({ error: lastError ? lastError.message : "Failed to generate post" });
});

// Supported social media types
const SUPPORTED_TYPES = ["linkedin", "twitter", "medium", "article"];

// New route to generate all supported social media posts in one call
app.post("/generate-all", async (req, res) => {
  const { content, retries = 1 } = req.body;
  if (!content) return res.status(400).json({ error: "Missing content" });
  const results = {};
  for (const type of SUPPORTED_TYPES) {
    let result = null;
    let lastError = null;
    for (let i = 0; i < retries; i++) {
      try {
        const promptTemplate = loadPrompt(type);
        const prompt = promptTemplate.replace("{{content}}", content);
        result = await generateWithGemini(prompt);
        break;
      } catch (err) {
        lastError = err;
      }
    }
    results[type] = result || {
      error: lastError ? lastError.message : "Failed to generate post",
    };
  }
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
