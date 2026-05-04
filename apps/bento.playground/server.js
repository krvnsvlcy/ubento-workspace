import { generateText } from "ai";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8900;

app.post("/api/generate", async (req, res) => {
  const { prompt, model } = req.body;

  try {
    const { text } = await generateText({
      model,
      prompt: prompt,
      temperature: 0.7,
    });

    // Return raw text as requested, parsing happens on the client
    res.json({ text });
  } catch (error) {
    console.error("Error during generation:", error);
    res.status(500).json({
      error: "Failed to generate response",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
