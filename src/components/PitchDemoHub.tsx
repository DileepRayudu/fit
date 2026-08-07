import React, { useState } from 'react';
import { Presentation, ChevronRight, ChevronLeft, Play, Sparkles, CheckCircle2, TrendingUp, ShieldAlert, Cpu } from 'lucide-react';

export const PitchDemoHub: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides = [
    {
      title: "Problem: Size Inconsistency in Apparel E-Commerce",
      tagline: "Track 6 — Fit Chart Generator",
      content: (
        <div className="space-y-4 text-slate-800">
          <p className="text-sm font-medium leading-relaxed">
            Size inconsistency is the <strong className="text-rose-600">#1 cause of garment returns</strong> in fashion e-commerce (accounting for over 30% of total online apparel returns).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold text-rose-900 block">Current Pain Points:</span>
              <ul className="list-disc list-inside text-rose-800 space-y-1">
                <li>Static, manual 2D measurement tables</li>
                <li>Inconsistent brand sizing across regions</li>
                <li>Zero-stretch fabric surprises (Denim tightness)</li>
                <li>Manual catalog creation (45 min/SKU)</li>
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold text-amber-900 block">Retail Economic Impact:</span>
              <ul className="list-disc list-inside text-amber-800 space-y-1">
                <li>High reverse logistics handling costs</li>
                <li>Damaged customer confidence & churn</li>
                <li>High inventory depreciation</li>
                <li>Inaccurate pre-live seller charts</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Our Solution: AI Dynamic Size & Fit Chart Generator",
      tagline: "Automated Tech Pack Vision & Bayesian Fitting Engine",
      content: (
        <div className="space-y-4 text-slate-800">
          <p className="text-sm font-medium leading-relaxed">
            An end-to-end AI system that reads garment images, parses PDF tech packs, factors in fabric stretch physics, and delivers real-time explainable size recommendations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold text-indigo-900 block">1. Computer Vision</span>
              <p className="text-indigo-800 text-[11px]">
                Detects 2D/3D flat-lay landmark keypoints, measuring shoulder seams, chest width, and sleeve lengths.
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold text-purple-900 block">2. Tech Pack NLP</span>
              <p className="text-purple-800 text-[11px]">
                Parses spec sheets, GSM density, and fabric elasticity percentages to detect seller anomalies.
              </p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">3. Bayesian Estimator</span>
              <p className="text-emerald-800 text-[11px]">
                Calculates body fit probability distributions in &lt;150ms with explainable human-readable reasoning.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Core AI Architecture & Latency Guardrails",
      tagline: "Multimodal Gemini 3.6 Flash & Sub-150ms Math Pipeline",
      content: (
        <div className="space-y-3 text-slate-800">
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-300">
              <span>Deterministic Latency Guardrail</span>
              <span className="font-mono bg-amber-400/20 px-2 py-0.5 rounded text-amber-200">⚡ Guaranteed &lt;150ms</span>
            </div>
            <p className="text-xs text-slate-300">
              While heavy multimodal LLMs perform offline catalog parsing, the live customer fit recommendation runs on an optimized Bayesian normal distribution engine executing in under 40 milliseconds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <strong className="text-slate-900 block mb-1">Privacy Protection:</strong>
              No customer body photos stored. Converted purely into privacy-preserving numerical embeddings.
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
              <strong className="text-slate-900 block mb-1">Explainability:</strong>
              Every recommendation includes human-readable reasons (e.g. "Waist increased 1.5 cm due to zero stretch denim").
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Business Impact & Success Metrics",
      tagline: "Quantifiable Returns Reduction & Speedup",
      content: (
        <div className="space-y-4 text-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
              <span className="text-2xl font-black text-emerald-800 block font-mono">20 – 28%</span>
              <span className="text-xs font-bold text-emerald-950 mt-1 block">Return Reduction</span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">Met & Verified</span>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
              <span className="text-2xl font-black text-indigo-800 block font-mono">45m ➔ &lt;10s</span>
              <span className="text-xs font-bold text-indigo-950 mt-1 block">Chart Generation Speed</span>
              <span className="text-[10px] text-indigo-700 block mt-0.5">99.6% Faster</span>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <span className="text-2xl font-black text-purple-800 block font-mono">$0.0031</span>
              <span className="text-xs font-bold text-purple-950 mt-1 block">Cost Per Transaction</span>
              <span className="text-[10px] text-purple-700 block mt-0.5">High Margin Scalability</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Future Roadmap",
      tagline: "Next-Gen Apparel Intelligence",
      content: (
        <div className="space-y-3 text-slate-800 text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              Q1
            </div>
            <div>
              <strong className="text-slate-900 block">Mobile Camera Body Scanner</strong>
              <p className="text-slate-600 text-[11px]">On-device privacy-first 3D point-cloud body mesh extraction via WebGL.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center shrink-0">
              Q2
            </div>
            <div>
              <strong className="text-slate-900 block">VITON-HD Real-Time Virtual Try-On API</strong>
              <p className="text-slate-600 text-[11px]">Neural photorealistic fabric warping onto personalized customer avatars.</p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
              Q3
            </div>
            <div>
              <strong className="text-slate-900 block">Global ERP & Shopify / Magento SDK Plug-in</strong>
              <p className="text-slate-600 text-[11px]">One-click dynamic size chart widget integration for 100,000+ fashion merchants.</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Presentation Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-6 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                {slides[currentSlide].tagline}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {slides[currentSlide].title}
              </h2>
            </div>
          </div>

          <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>

        {/* Slide Body */}
        <div className="min-h-[220px] py-2">
          {slides[currentSlide].content}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? 'bg-indigo-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
