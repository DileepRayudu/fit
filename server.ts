import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

import { MOCK_SKUS, MOCK_DATASETS } from "./src/data/mockSkus";
import { calculateBayesianFit, generateLocalizedCharts } from "./server/bayesianEngine";
import { analyzeGarmentWithGemini, getAiFitAdvice } from "./server/geminiService";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // ==========================================
  // API ROUTES
  // ==========================================

  // 1. Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "Fit Chart Generator AI Engine",
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY)
    });
  });

  // 2. SKUs catalog
  app.get("/api/skus", (req, res) => {
    res.json({ skus: MOCK_SKUS });
  });

  app.get("/api/skus/:id", (req, res) => {
    const sku = MOCK_SKUS.find(s => s.skuId === req.params.id) || MOCK_SKUS[0];
    const localizedCharts = generateLocalizedCharts(sku);
    res.json({ sku, localizedCharts });
  });

  // 3. Analyze Garment & Tech Pack via Computer Vision + NLP (Gemini)
  app.post("/api/analyze-sku", async (req, res) => {
    try {
      const { skuId, imageUrl, techPackText, fabricSpec } = req.body;
      const sku = MOCK_SKUS.find(s => s.skuId === skuId) || MOCK_SKUS[0];

      const fabricToUse = fabricSpec || sku.fabric;
      const textToUse = techPackText || sku.techPackSource;
      const imgToUse = imageUrl || sku.sampleImages.flatLay;

      const analysis = await analyzeGarmentWithGemini(imgToUse, textToUse, fabricToUse);
      const localizedCharts = generateLocalizedCharts(sku);

      res.json({
        skuId: sku.skuId,
        analysis,
        localizedCharts,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      console.error("Error analyzing SKU:", err);
      res.status(500).json({ error: "Failed to analyze garment", details: err.message });
    }
  });

  // 4. Real-time Bayesian Fit Recommendation API (<150ms execution!)
  app.post("/api/recommend-fit", (req, res) => {
    try {
      const { customerInput, skuId } = req.body;
      const sku = MOCK_SKUS.find(s => s.skuId === skuId) || MOCK_SKUS[0];

      const fitResult = calculateBayesianFit(customerInput, sku);
      res.json({ fitResult, skuId: sku.skuId });
    } catch (err: any) {
      console.error("Error in fit recommendation:", err);
      res.status(500).json({ error: "Recommendation error", details: err.message });
    }
  });

  // 5. Fit Assistant Chat API
  app.post("/api/chat-fit-assistant", async (req, res) => {
    try {
      const { userQuery, skuId, recommendedSize } = req.body;
      const sku = MOCK_SKUS.find(s => s.skuId === skuId) || MOCK_SKUS[0];

      const responseText = await getAiFitAdvice(
        userQuery,
        sku.title,
        recommendedSize || "M",
        sku.fabric.fabricType,
        sku.fabric.stretchPercent
      );

      res.json({ text: responseText });
    } catch (err: any) {
      res.status(500).json({ error: "Fit assistant error", details: err.message });
    }
  });

  // 6. Datasets Explorer API
  app.get("/api/datasets", (req, res) => {
    res.json({ datasets: MOCK_DATASETS });
  });

  // ==========================================
  // AUTHENTICATION API ROUTES (In-Memory + Session)
  // ==========================================
  const usersDb: Record<string, any> = {
    "seller@zara.com": {
      id: "usr_zara_01",
      name: "Zara Merchandising Team",
      email: "seller@zara.com",
      password: "password123",
      role: "seller",
      brandName: "Zara Apparel",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      createdAt: new Date().toISOString()
    },
    "shopper@demo.com": {
      id: "usr_shopper_02",
      name: "Alex Rivera",
      email: "shopper@demo.com",
      password: "password123",
      role: "shopper",
      brandName: "",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      createdAt: new Date().toISOString(),
      savedSizes: {
        heightCm: 176,
        weightKg: 72,
        chestCm: 98,
        waistCm: 84,
        preferredFit: "regular"
      }
    }
  };

  const sessionsDb: Record<string, any> = {};

  app.post("/api/auth/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = usersDb[email.toLowerCase()];
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = "tok_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const { password: _, ...userWithoutPassword } = user;
    sessionsDb[token] = userWithoutPassword;

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  });

  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password, role, brandName } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" });
    }

    const lowerEmail = email.toLowerCase();
    if (usersDb[lowerEmail]) {
      return res.status(400).json({ error: "An account with this email already exists" });
    }

    const newUser = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name,
      email: lowerEmail,
      password,
      role: role || "shopper",
      brandName: brandName || (role === "seller" ? "Independent Fashion Brand" : ""),
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`,
      createdAt: new Date().toISOString()
    };

    usersDb[lowerEmail] = newUser;

    const token = "tok_" + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const { password: _, ...userWithoutPassword } = newUser;
    sessionsDb[token] = userWithoutPassword;

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  });

  app.post("/api/auth/signout", (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token && sessionsDb[token]) {
      delete sessionsDb[token];
    }
    res.json({ success: true, message: "Signed out successfully" });
  });

  app.get("/api/auth/me", (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token && sessionsDb[token]) {
      return res.json({ user: sessionsDb[token] });
    }
    res.status(401).json({ error: "Unauthenticated" });
  });

  // ==========================================
  // VITE MIDDLEWARE & STATIC ASSET HANDLING
  // ==========================================
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Fit Chart Generator Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
