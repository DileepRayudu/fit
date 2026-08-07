import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SellerStudio } from './components/SellerStudio';
import { CustomerFitAssistant } from './components/CustomerFitAssistant';
import { DatasetsExplorer } from './components/DatasetsExplorer';
import { ArchitectureRoi } from './components/ArchitectureRoi';
import { PitchDemoHub } from './components/PitchDemoHub';

import { TechPackSpec, LocalizedSizeChart, DatasetSample } from './types';
import { MOCK_SKUS, MOCK_DATASETS } from './data/mockSkus';

export default function App() {
  const [activeTab, setActiveTab] = useState<'seller' | 'customer' | 'datasets' | 'architecture' | 'demo'>('seller');
  
  const [skus, setSkus] = useState<TechPackSpec[]>(MOCK_SKUS);
  const [selectedSkuId, setSelectedSkuId] = useState<string>(MOCK_SKUS[0].skuId);
  
  const [localizedCharts, setLocalizedCharts] = useState<LocalizedSizeChart[]>([]);
  const [anomalyAlerts, setAnomalyAlerts] = useState<any[]>([]);
  const [datasets, setDatasets] = useState<DatasetSample[]>(MOCK_DATASETS);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const currentSku = skus.find(s => s.skuId === selectedSkuId) || skus[0];

  // Fetch SKU details & Localized charts
  const fetchSkuDetails = async (skuId: string) => {
    try {
      const res = await fetch(`/api/skus/${skuId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.localizedCharts) {
          setLocalizedCharts(data.localizedCharts);
        }
      }
    } catch (err) {
      console.error("Error fetching SKU detail:", err);
    }
  };

  // Re-Analyze SKU with Gemini CV & NLP Engine
  const handleTriggerAiAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-sku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skuId: currentSku.skuId,
          imageUrl: currentSku.sampleImages.flatLay,
          techPackText: currentSku.techPackSource,
          fabricSpec: currentSku.fabric
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.analysis) {
          setAnomalyAlerts(data.analysis.sellerAnomalies || []);
        }
        if (data.localizedCharts) {
          setLocalizedCharts(data.localizedCharts);
        }
      }
    } catch (err) {
      console.error("Error in AI analysis trigger:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    fetchSkuDetails(selectedSkuId);
    handleTriggerAiAnalysis();
  }, [selectedSkuId]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        skus={skus}
        selectedSkuId={selectedSkuId}
        setSelectedSkuId={setSelectedSkuId}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'seller' && (
          <SellerStudio
            sku={currentSku}
            localizedCharts={localizedCharts}
            onTriggerAiAnalysis={handleTriggerAiAnalysis}
            isAnalyzing={isAnalyzing}
            anomalyAlerts={anomalyAlerts}
          />
        )}

        {activeTab === 'customer' && (
          <CustomerFitAssistant
            sku={currentSku}
          />
        )}

        {activeTab === 'datasets' && (
          <DatasetsExplorer
            datasets={datasets}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureRoi />
        )}

        {activeTab === 'demo' && (
          <PitchDemoHub />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-200">Fit Chart Generator AI Engine</span>
            <span className="text-slate-500 mx-2">|</span>
            <span>Retail & Apparel Merchandising</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span>Latency Guardrail: &lt;150ms Guaranteed</span>
            <span>•</span>
            <span>ModCloth / DeepFashion2 / Cloth3D / VITON-HD / INDIA SIZE Specs</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
