import React, { useState } from 'react';
import { Cpu, DollarSign, Clock, ShieldCheck, Zap, Layers, ArrowRight, TrendingUp } from 'lucide-react';

export const ArchitectureRoi: React.FC = () => {
  // ROI Calculator Sliders
  const [monthlyOrders, setMonthlyOrders] = useState<number>(40000);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(75);
  const [currentReturnRate, setCurrentReturnRate] = useState<number>(26);

  // Financial ROI Calculations
  const returnReductionPercent = 22; // 22% reduction in return rate
  const monthlyReturnsCount = Math.round((monthlyOrders * currentReturnRate) / 100);
  const returnsSavedMonthly = Math.round((monthlyReturnsCount * returnReductionPercent) / 100);
  
  // Cost per return processing = ~$14 (shipping + restocking + depreciation)
  const returnProcessingCost = 14;
  const netMonthlySavings = returnsSavedMonthly * returnProcessingCost;
  const netAnnualSavings = netMonthlySavings * 12;

  // AI Transaction Cost
  const costPerRecommendation = 0.0031; // $0.0031 per sub-150ms Bayesian API call
  const monthlyAiCost = monthlyOrders * costPerRecommendation;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              System Architecture & Business ROI Engine
            </h1>
            <p className="text-xs text-slate-400">
              Clean microservice orchestration, deterministic guardrails, and return reduction economics.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Architecture Diagram */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Multi-Agent System Architecture</span>
          </h2>
          <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
            Sub-150ms Latency Guaranteed
          </span>
        </div>

        {/* Architecture Diagram Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          
          {/* Node 1: Inputs */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800 shadow">
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">1. Multi-Modal Inputs</span>
            <h3 className="text-sm font-bold">Data Ingestion Layer</h3>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Flat-Lay & On-Model Images</li>
              <li>PDF Tech Pack Sheets</li>
              <li>Fabric Specs (GSM, Stretch %)</li>
              <li>Historical Return Logs</li>
            </ul>
          </div>

          {/* Node 2: Multi-Agent Processing */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800 shadow">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">2. Core AI Engines</span>
            <h3 className="text-sm font-bold">Vision & NLP Pipeline</h3>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Gemini 3.6 Flash CV Keypoints</li>
              <li>Tech Pack Spec NLP Parser</li>
              <li>DeepFashion2 Landmark Mapping</li>
              <li>Seller Anomaly Guardrail</li>
            </ul>
          </div>

          {/* Node 3: Bayesian Engine */}
          <div className="bg-indigo-950 text-white p-4 rounded-xl space-y-2 border border-indigo-800 shadow ring-2 ring-indigo-500/40">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">3. Bayesian Engine</span>
            <h3 className="text-sm font-bold">Fast Estimator (&lt;150ms)</h3>
            <ul className="text-xs text-indigo-200 space-y-1 list-disc list-inside">
              <li>Prior Body Metric Distribution</li>
              <li>Fabric Physics Strain Math</li>
              <li>Cross-Brand Size Alignment</li>
              <li>Uncertainty Confidence Interval</li>
            </ul>
          </div>

          {/* Node 4: Outputs */}
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2 border border-slate-800 shadow">
            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">4. Deliverables</span>
            <h3 className="text-sm font-bold">Dynamic Size Output</h3>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Dynamic Size Chart (S-2XL)</li>
              <li>Localized US/UK/EU/IN/JP</li>
              <li>Consumer Fit Recommendation</li>
              <li>Explainable Natural Reasoning</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Business ROI & Transaction Cost Calculator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              <span>Business ROI & Transaction Economics</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulate return cost savings and operational efficiency for retail e-commerce stores.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sliders (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Monthly Orders Volume:</span>
                <span className="font-mono text-indigo-600">{monthlyOrders.toLocaleString()} orders/mo</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Average Garment Order Value ($):</span>
                <span className="font-mono text-indigo-600">${avgOrderValue}</span>
              </div>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                <span>Current Size Return Rate (%):</span>
                <span className="font-mono text-rose-600">{currentReturnRate}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={currentReturnRate}
                onChange={(e) => setCurrentReturnRate(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* ROI Metric Cards (6 Cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-950 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                Net Annual Return Savings
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-900 block font-mono">
                ${netAnnualSavings.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700 block">
                Based on ${returnProcessingCost} handling cost saved per return
              </span>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-indigo-950 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block">
                Cost per Recommendation
              </span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-900 block font-mono">
                ${costPerRecommendation}
              </span>
              <span className="text-[10px] text-indigo-700 block">
                Total monthly AI infrastructure cost: ${monthlyAiCost.toFixed(2)}
              </span>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 text-purple-950 space-y-1 col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block">
                Size Chart Creation Speedup
              </span>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-xl font-bold text-slate-500 line-through">45 Min / SKU</span>
                <ArrowRight className="w-4 h-4 text-purple-600" />
                <span className="text-2xl font-black text-purple-900 font-mono">&lt; 10 Seconds / SKU</span>
              </div>
              <span className="text-[10px] text-purple-700 block">
                99.6% reduction in catalog operational onboarding time
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
