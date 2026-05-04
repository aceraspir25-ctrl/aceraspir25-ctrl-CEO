import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Route for Gemini (Proxy)
app.post("/api/ai/check-status", (req, res) => {
  const hasKey = !!process.env.GEMINI_API_KEY;
  res.json({ valid: hasKey });
});

// Example proxy for other keys requested
app.get("/api/config/check", (req, res) => {
  res.json({
    gemini: !!process.env.GEMINI_API_KEY,
    news: !!process.env.NEWS_API_KEY,
    weather: !!process.env.WEATHERS_API_KEY
  });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Only listen if we're not on Vercel
  if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
