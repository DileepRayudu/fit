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
