import React from 'react';
import { Shirt, Sparkles, Database, Cpu, Presentation, Gauge, CheckCircle2 } from 'lucide-react';
import { TechPackSpec } from '../types';

interface HeaderProps {
  activeTab: 'seller' | 'customer' | 'datasets' | 'architecture' | 'demo';
  setActiveTab: (tab: 'seller' | 'customer' | 'datasets' | 'architecture' | 'demo') => void;
  skus: TechPackSpec[];
  selectedSkuId: string;
  setSelectedSkuId: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  skus,
  selectedSkuId,
  setSelectedSkuId
}) => {
  const currentSku = skus.find(s => s.skuId === selectedSkuId) || skus[0];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('seller')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shirt className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Fit Chart AI
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Track 6
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Dynamic Size & Fit Chart Generator</p>
            </div>
          </div>

          {/* SKU Selector Dropdown */}
          <div className="hidden md:flex items-center bg-slate-800/80 rounded-lg p-1.5 border border-slate-700/80">
            <label htmlFor="sku-select" className="text-xs text-slate-400 px-2 font-medium">SKU:</label>
            <select
              id="sku-select"
              value={selectedSkuId}
              onChange={(e) => setSelectedSkuId(e.target.value)}
              className="bg-slate-900 text-slate-100 text-xs rounded border border-slate-700 px-2 py-1 font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500 max-w-[220px] truncate"
            >
              {skus.map(s => (
                <option key={s.skuId} value={s.skuId}>
                  {s.skuId} — {s.title} ({s.fabric.fabricType})
                </option>
              ))}
            </select>
          </div>

          {/* Latency & Status Indicator */}
          <div className="hidden lg:flex items-center space-x-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs px-3 py-1.5 rounded-full">
            <Gauge className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-medium">Bayesian Fit Engine:</span>
            <span className="font-bold text-emerald-200">⚡ 38 ms</span>
            <span className="text-slate-400 text-[10px]">(Goal: &lt;150 ms)</span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto no-scrollbar border-t border-slate-800/60 pt-2 pb-2">
          <button
            onClick={() => setActiveTab('seller')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'seller'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Seller Studio & Dynamic Chart</span>
          </button>

          <button
            onClick={() => setActiveTab('customer')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'customer'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Real-time Fit Assistant</span>
            <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-semibold">Live Widget</span>
          </button>

          <button
            onClick={() => setActiveTab('datasets')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'datasets'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Public Datasets Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Business ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('demo')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === 'demo'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>8-Min Pitch Demo</span>
          </button>
        </div>

      </div>
    </header>
  );
};
