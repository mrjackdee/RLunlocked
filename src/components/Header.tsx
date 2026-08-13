import React, { useState } from 'react';
import { Lock, Sparkles, RotateCcw, Download, User, CheckCircle2 } from 'lucide-react';
import { AppState } from '../types';

interface HeaderProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onResetState: () => void;
  onOpenAICoach: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onUpdateState,
  onResetState,
  onOpenAICoach,
}) => {
  const [isEditingManager, setIsEditingManager] = useState(false);
  const [tempName, setTempName] = useState(state.managerName);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveName = () => {
    onUpdateState((prev) => ({ ...prev, managerName: tempName || 'Manager' }));
    setIsEditingManager(false);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `unlocked_manager_system_${state.managerName.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <header className="bg-[#0F2537] text-white border-b border-[#1E3A8A] sticky top-0 z-40 shadow-md">
      {/* Top Banner Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & System Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#112A46] border border-blue-400/30 p-2 rounded-lg flex items-center justify-center shadow-inner">
            <Lock className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg tracking-wide text-white uppercase font-sans">
                UNLOCKED BY RANDY LOCKE
              </span>
            </div>
            <h1 className="text-xs text-slate-300 font-medium tracking-tight">
              MANAGER SUCCESS SYSTEM <span className="text-blue-300 font-semibold">• Existing Manager Edition</span>
            </h1>
          </div>
        </div>

        {/* User Info & Quick Actions */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Manager Badge */}
          <div className="bg-[#112A46] border border-slate-700 rounded-full px-3 py-1 flex items-center space-x-2 text-xs text-slate-200">
            <User className="w-3.5 h-3.5 text-blue-400" />
            {isEditingManager ? (
              <div className="flex items-center space-x-1">
                <input
                  type="text"
                  className="bg-slate-800 text-white border border-blue-500 rounded px-1.5 py-0.5 text-xs outline-none"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingManager(true)}
                title="Click to edit manager name"
                className="hover:text-blue-300 font-medium transition-colors"
              >
                {state.managerName}
              </button>
            )}
          </div>

          {/* AI Coach Button */}
          <button
            onClick={onOpenAICoach}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI Leadership Coach</span>
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            title="Export your assessment & toolkits data as JSON"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs flex items-center space-x-1 transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Export Data</span>
          </button>

          {/* Reset System */}
          <button
            onClick={onResetState}
            title="Reset to fresh default assessment state"
            className="bg-slate-800/80 hover:bg-red-900/60 text-slate-300 hover:text-red-200 p-1.5 sm:px-2 sm:py-1.5 rounded-lg text-xs flex items-center space-x-1 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="bg-emerald-900/80 text-emerald-200 text-xs py-1 px-4 text-center flex items-center justify-center space-x-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>System data exported successfully!</span>
        </div>
      )}
    </header>
  );
};
