import React, { useState } from 'react';
import { Database, Code2, CheckCircle2, Layers, ExternalLink, Filter } from 'lucide-react';
import { DatasetSample } from '../types';

interface DatasetsExplorerProps {
  datasets: DatasetSample[];
}

export const DatasetsExplorer: React.FC<DatasetsExplorerProps> = ({ datasets }) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(datasets[0]?.id || '');

  const activeDataset = datasets.find(d => d.id === selectedDatasetId) || datasets[0];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              Public Dataset Benchmark Explorer
            </h1>
            <p className="text-xs text-slate-400">
              Integrated foundational datasets powering CV landmark extraction, NLP fit log parsing, and Bayesian body metrics.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: List of Datasets (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider px-1">
            Integrated Training Datasets
          </h2>

          <div className="space-y-2.5">
            {datasets.map((ds) => {
              const isSelected = ds.id === selectedDatasetId;
              return (
                <div
                  key={ds.id}
                  onClick={() => setSelectedDatasetId(ds.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white border-indigo-500 ring-2 ring-indigo-500/30 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isSelected ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {ds.source}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {ds.recordCount}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold truncate">{ds.name}</h3>
                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {ds.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dataset Details & JSON Inspector (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          {activeDataset && (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">
                    Dataset Schema & Feature Mapping
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-0.5">{activeDataset.name}</h2>
                </div>
                <span className="text-xs font-mono font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                  {activeDataset.recordCount}
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Primary Features Extracted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeDataset.keyFeatures.map((feat, idx) => (
                    <span key={idx} className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-lg border border-indigo-100 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <Code2 className="w-4 h-4 text-slate-600" />
                    <span>Sample Record Structure</span>
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">JSON Format</span>
                </div>

                <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                  <pre>{JSON.stringify(activeDataset.sampleRecord, null, 2)}</pre>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">System Utilization:</span>
                <p className="text-slate-600 leading-relaxed">
                  Used by our Multi-Agent Orchestrator to condition Bayesian prior distributions for body heights, bust-to-waist ratios, and zero-stretch fabric strain models.
                </p>
              </div>
            </>
          )}
        </div>

      </div>

    </div>
  );
};
