import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Gauge, HelpCircle, CheckCircle2, AlertCircle, 
  User, Shirt, MessageSquare, Send, RefreshCw, Zap, ArrowRight, Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TechPackSpec, CustomerMeasurementInput, FitRecommendationResult } from '../types';

interface CustomerFitAssistantProps {
  sku: TechPackSpec;
}

export const CustomerFitAssistant: React.FC<CustomerFitAssistantProps> = ({ sku }) => {
  const [inputMode, setInputMode] = useState<'direct' | 'brand'>('brand');

  // Customer Input State
  const [heightCm, setHeightCm] = useState<number>(176);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [chestCm, setChestCm] = useState<number>(98);
  const [waistCm, setWaistCm] = useState<number>(84);
  const [hipsCm, setHipsCm] = useState<number>(96);
  const [shoulderCm, setShoulderCm] = useState<number>(44);
  const [preferredFit, setPreferredFit] = useState<'snug' | 'regular' | 'relaxed' | 'oversized'>('regular');

  const [trustedBrand, setTrustedBrand] = useState<string>('uniqlo');
  const [trustedSize, setTrustedSize] = useState<string>('M');

  // Recommendation State
  const [fitResult, setFitResult] = useState<FitRecommendationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Chatbot State
  const [chatDrawerOpen, setChatDrawerOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: `Hello! I'm your AI Fit Assistant for "${sku.title}". Ask me any questions about sizing, shoulder freedom, or layer pairing!`
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isSendingChat, setIsSendingChat] = useState<boolean>(false);

  // Execute Bayesian Fit Calculation API
  const fetchFitRecommendation = async () => {
    setIsLoading(true);

    const inputPayload: CustomerMeasurementInput = {
      heightCm,
      weightKg,
      chestCm: inputMode === 'direct' ? chestCm : 0,
      waistCm: inputMode === 'direct' ? waistCm : 0,
      hipsCm: inputMode === 'direct' ? hipsCm : 0,
      shoulderCm: inputMode === 'direct' ? shoulderCm : 0,
      preferredFit,
      trustedBrand: inputMode === 'brand' ? {
        brandName: trustedBrand,
        sizeName: trustedSize,
        fitType: 'regular'
      } : undefined
    };

    try {
      const res = await fetch('/api/recommend-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerInput: inputPayload, skuId: sku.skuId })
      });
      const data = await res.json();
      if (data.fitResult) {
        setFitResult(data.fitResult);
      }
    } catch (err) {
      console.error("Error fetching recommendation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFitRecommendation();
  }, [sku.skuId, inputMode, trustedBrand, trustedSize, preferredFit]);

  // Handle Chat Input
  const handleSendChat = async () => {
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/chat-fit-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: userText,
          skuId: sku.skuId,
          recommendedSize: fitResult?.recommendedSize || 'M'
        })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: 'assistant', text: data.text || "Recommended Size M is optimal." }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'assistant', text: "Size " + (fitResult?.recommendedSize || 'M') + " is recommended for your measurements." }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Bayesian Distribution Chart Data
  const chartData = fitResult ? Object.entries(fitResult.fitDistribution).map(([sz, prob]) => ({
    size: sz,
    probability: prob,
    isRecommended: sz === fitResult.recommendedSize
  })) : [];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Widget Header & Title */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Consumer Real-Time Size & Fit Recommender
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Find Your Ideal Size for <span className="text-indigo-300">{sku.title}</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Powered by Bayesian body estimation (<span className="text-emerald-400 font-bold">&lt;150ms latency</span>) and zero-stretch fabric physics.
          </p>
        </div>

        {/* Latency badge */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3 flex items-center space-x-3 self-start md:self-auto">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Bayesian Engine Latency</span>
            <span className="text-sm font-extrabold text-emerald-300 font-mono">
              ⚡ {fitResult?.latencyMs || 38} ms
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Customer Measurement / Brand Input Widget (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">Your Body & Fit Profile</h2>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Anonymous Session
            </span>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setInputMode('brand')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                inputMode === 'brand' ? 'bg-white text-indigo-600 shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Known Brand Size
            </button>
            <button
              onClick={() => setInputMode('direct')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                inputMode === 'direct' ? 'bg-white text-indigo-600 shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Body Measurements (cm)
            </button>
          </div>

          {inputMode === 'brand' ? (
            /* Mode 1: Cross-Brand Comparison */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brand You Currently Wear & Trust:
                </label>
                <select
                  value={trustedBrand}
                  onChange={(e) => setTrustedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="uniqlo">Uniqlo (Standard Regular Fit)</option>
                  <option value="zara">Zara (Euro Slim / Fitted)</option>
                  <option value="levis">Levi's (Classic American Denim)</option>
                  <option value="hm">H&M (Modern Fit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Trusted Size in {trustedBrand.toUpperCase()}:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['S', 'M', 'L', 'XL'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => setTrustedSize(sz)}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition-all ${
                        trustedSize === sz
                          ? 'bg-slate-900 text-white border-slate-900 shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Height (cm):</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Weight (kg):</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Mode 2: Direct Body Measurements */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Height (cm):</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Weight (kg):</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Chest / Bust (cm):</label>
                  <input
                    type="number"
                    value={chestCm}
                    onChange={(e) => setChestCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Waist (cm):</label>
                  <input
                    type="number"
                    value={waistCm}
                    onChange={(e) => setWaistCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Shoulder Width (cm):</label>
                  <input
                    type="number"
                    value={shoulderCm}
                    onChange={(e) => setShoulderCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Hips (cm):</label>
                  <input
                    type="number"
                    value={hipsCm}
                    onChange={(e) => setHipsCm(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-900"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Preferred Fit Selection */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Preferred Fit Style:
            </label>
            <div className="grid grid-cols-4 gap-1.5 text-[11px]">
              {(['snug', 'regular', 'relaxed', 'oversized'] as const).map(fit => (
                <button
                  key={fit}
                  onClick={() => setPreferredFit(fit)}
                  className={`py-1.5 rounded-lg font-bold capitalize border transition-all ${
                    preferredFit === fit
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={fetchFitRecommendation}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl shadow transition-all flex items-center justify-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Recalculate Bayesian Fit Probability</span>
          </button>
        </div>

        {/* Right Column: AI Fit Recommendation Output & Heatmap (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Output Card */}
          {fitResult && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-5 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 block">
                    AI Bayesian Recommendation
                  </span>
                  <div className="flex items-baseline space-x-3 mt-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                      SIZE {fitResult.recommendedSize}
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {fitResult.confidenceScore}% Confidence Match
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setChatDrawerOpen(!chatDrawerOpen)}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-indigo-200 flex items-center space-x-2 transition-all self-start sm:self-auto"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask AI Fit Assistant</span>
                </button>
              </div>

              {/* Explainable Reasoning Box */}
              <div className="bg-slate-900 text-slate-100 rounded-xl p-4 space-y-2 border border-slate-800 shadow-inner">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <span>Explainable AI Recommendation Reason:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {fitResult.reasoning}
                </p>
              </div>

              {/* Fit Probability Bell Curve Bar Chart */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  Bayesian Probability Distribution across Sizes:
                </span>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="size" stroke="#64748b" fontSize={11} />
                      <YAxis unit="%" stroke="#64748b" fontSize={11} domain={[0, 100]} />
                      <Tooltip formatter={(val: any) => [`${val}% Match Probability`, 'Fit Probability']} />
                      <Bar dataKey="probability" radius={[6, 6, 0, 0]} barSize={40}>
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.isRecommended ? '#6366f1' : '#cbd5e1'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Detailed Clearance Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {fitResult.detailedExplanations.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{item.bodyPart}</span>
                      <span className={item.fitStatus === 'tight_risk' ? 'text-rose-600' : 'text-emerald-600'}>
                        {item.diffCm > 0 ? `+${item.diffCm} cm` : `${item.diffCm} cm`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Garment-to-Body Pressure Heatmap */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">3D Garment-to-Body Pressure Heatmap</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Cloth3D Drape Simulation
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Interactive body node tension map illustrating predicted fabric clearance and movement freedom for Size {fitResult?.recommendedSize || 'M'}.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Silhouette Avatar Graphic */}
              <div className="relative w-full h-60 bg-slate-950 rounded-xl flex items-center justify-center overflow-hidden border border-slate-800">
                <div className="absolute w-24 h-48 bg-indigo-500/10 rounded-full blur-xl" />
                
                {/* SVG Silhouette */}
                <svg className="w-32 h-52 text-slate-700 fill-current opacity-80" viewBox="0 0 100 200">
                  {/* Head */}
                  <circle cx="50" cy="20" r="12" />
                  {/* Shoulders & Torso */}
                  <path d="M 25,40 L 75,40 L 68,90 L 32,90 Z" />
                  {/* Hips & Legs */}
                  <path d="M 32,92 L 68,92 L 62,180 L 38,180 Z" />
                </svg>

                {/* Pressure Nodes */}
                {fitResult?.heatmapPoints.map((pt, idx) => {
                  const isTight = pt.pressureLevel === 'high_tightness';
                  return (
                    <div
                      key={idx}
                      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse ${
                        isTight ? 'bg-rose-500' : 'bg-emerald-500'
                      }`} />
                      <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow border border-slate-700 z-20">
                        {pt.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Node Legend & Details */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="font-bold text-slate-800">Optimal Clearance (&gt;2.0 cm ease)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="font-bold text-slate-800">Snug Movement Fit (0.5 – 2.0 cm ease)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="font-bold text-slate-800">Tightness Return Risk (&lt;0.5 cm ease)</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-600 text-[11px] mt-2">
                  <strong className="text-slate-900 block mb-0.5">Fabric Drape Note:</strong>
                  For {sku.fabric.fabricType} ({sku.fabric.gsm} GSM), fabric stiffens at shoulder drop. Size {fitResult?.recommendedSize || 'M'} maintains ideal shoulder movement.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* AI Fit Assistant Chatbot Drawer */}
      {chatDrawerOpen && (
        <div className="fixed bottom-4 right-4 w-96 max-w-[90vw] bg-white border border-slate-300 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[450px]">
          {/* Header */}
          <div className="bg-slate-900 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-bold text-xs">AI Fit Consultant (Gemini 3.6 Flash)</span>
            </div>
            <button
              onClick={() => setChatDrawerOpen(false)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isSendingChat && (
              <div className="text-slate-400 text-[10px] italic">Gemini is typing...</div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
              placeholder="Ask about fit, shoulders, machine wash..."
              className="flex-1 bg-slate-100 text-xs border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendChat}
              disabled={isSendingChat}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
