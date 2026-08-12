import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Leadership Coach API route
  app.post("/api/ai-coach", async (req, res) => {
    try {
      const { prompt, context, type } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          reply:
            "AI Leadership Coach is running in offline mode. Configure your GEMINI_API_KEY in secrets to enable real-time custom Gemini insights.",
          mode: "offline",
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `You are Randy Locke, Founder of UnLocked Business Solutions and creator of the UnLocked Manager Success System (Existing Manager Edition).
You have 20+ years of experience leading high-volume operations ($5M+ revenue, McDonald's, KFC, convenience retail, Quick Service, Casual Dining).
Your leadership philosophy: "Leadership is demonstrated through consistent behavior - not title, authority or intention."

Your goal is to provide concise, practical, empowering, and actionable leadership advice to managers using the UnLocked Manager Success System.
Key frameworks you use:
- 8 Core Competencies: Leadership Presence & Credibility, Communication & Expectations, Trust & Employee Engagement, Coaching & Accountability, Delegation & Time Management, Employee Development & Retention, Operational Execution, Business & Results Leadership.
- 3 Lenses of Evidence: People, Process, Performance.
- Leadership-to-Results Chain: Manager Behavior -> Team Response -> Operational Execution -> Business Results.
- Priority Statement Format: "When [trigger], I will [observable action] so that [impact/outcome]."

Keep responses professional, empathetic, practical, and structured with clean bullet points or step-by-step guidance. Avoid generic SaaS buzzwords.`;

      const contents = [
        {
          role: "user",
          parts: [
            {
              text: `[Context: ${context || "General Leadership Query"} - Mode: ${type || "Advice"}]\n\nUser Question/Request: ${prompt}`,
            },
          ],
        },
      ];

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "No response generated from AI Coach.";
      return res.json({ reply: replyText, mode: "online" });
    } catch (error: any) {
      console.error("AI Coach Error:", error);
      return res.status(500).json({
        error: "Failed to query AI Leadership Coach.",
        details: error?.message || String(error),
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`UnLocked Manager Success System running on http://localhost:${PORT}`);
  });
}

startServer();
