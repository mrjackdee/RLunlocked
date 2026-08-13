import React, { useState, useEffect } from 'react';
import { AppState } from './types';
import { loadAppState, saveAppState, resetAppState } from './lib/storage';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { StartHereView } from './components/StartHereView';
import { FrameworkView } from './components/FrameworkView';
import { AssessmentView } from './components/AssessmentView';
import { ResultsView } from './components/ResultsView';
import { PriorityPlannerView } from './components/PriorityPlannerView';
import { ToolkitsView } from './components/ToolkitsView';
import { ReassessmentView } from './components/ReassessmentView';
import { Footer } from './components/Footer';
import { QUESTIONS } from './data/assessmentData';

export default function App() {
  const [state, setState] = useState<AppState>(() => loadAppState());

  // Auto-save state updates to local storage
  useEffect(() => {
    saveAppState(state);
  }, [state]);

  const handleUpdateState = (updater: (prev: AppState) => AppState) => {
    setState((prev) => updater(prev));
  };

  const handleSelectTab = (tab: AppState['activeTab']) => {
    setState((prev) => ({ ...prev, activeTab: tab }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectToolkit = (toolkitId: number) => {
    setState((prev) => ({
      ...prev,
      activeTab: 'toolkits',
      selectedToolkitId: toolkitId,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetState = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all assessment answers, toolkits logs, and progress reviews to default state?'
      )
    ) {
      const fresh = resetAppState();
      setState(fresh);
    }
  };

  const answersCount = Object.keys(state.answers || {}).length;
  const totalQuestions = QUESTIONS.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-200 relative">
      {/* Strong DRAFT Watermark Overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden select-none">
        <div className="transform -rotate-30 border-8 sm:border-[12px] border-slate-900/15 bg-slate-900/5 px-8 sm:px-16 py-4 rounded-3xl border-dashed text-center">
          <div className="text-[14vw] sm:text-[12vw] font-black tracking-widest text-slate-900/15 uppercase leading-none">
            DRAFT
          </div>
          <div className="text-xs sm:text-lg font-black tracking-widest text-slate-900/25 uppercase mt-1">
            PROTOTYPE DEVELOPED BY DONORA GLOBAL
          </div>
        </div>
      </div>

      {/* Top Prototype Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold px-4 py-2 text-xs sm:text-sm text-center shadow-md border-b border-amber-600 flex items-center justify-center space-x-2 tracking-wider uppercase relative z-50">
        <span className="bg-slate-950 text-amber-300 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full tracking-widest flex items-center gap-1 shadow-2xs">
          PROTOTYPE
        </span>
        <span className="font-extrabold text-slate-950">
          This app is a prototype developed by DonOra Global
        </span>
      </div>

      {/* Sticky Header Bar */}
      <Header
        state={state}
        onUpdateState={handleUpdateState}
        onResetState={handleResetState}
      />

      {/* Main Tab Navigation */}
      <Navigation
        activeTab={state.activeTab}
        onSelectTab={handleSelectTab}
        answersCount={answersCount}
        totalQuestions={totalQuestions}
      />

      {/* Primary Workspace View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-6">
        {state.activeTab === 'start-here' && (
          <StartHereView
            state={state}
            onSelectTab={handleSelectTab}
            onSelectToolkit={handleSelectToolkit}
          />
        )}

        {state.activeTab === 'framework' && <FrameworkView />}

        {state.activeTab === 'assessment' && (
          <AssessmentView
            state={state}
            onUpdateState={handleUpdateState}
            onSelectTab={handleSelectTab}
            onSelectToolkit={handleSelectToolkit}
          />
        )}

        {state.activeTab === 'results' && (
          <ResultsView state={state} onSelectTab={handleSelectTab} />
        )}

        {state.activeTab === 'priority' && (
          <PriorityPlannerView
            state={state}
            onUpdateState={handleUpdateState}
            onSelectTab={handleSelectTab}
            onSelectToolkit={handleSelectToolkit}
          />
        )}

        {state.activeTab === 'toolkits' && (
          <ToolkitsView
            state={state}
            onUpdateState={handleUpdateState}
            selectedToolkitId={state.selectedToolkitId || 1}
            onSelectToolkit={(id) =>
              setState((prev) => ({ ...prev, selectedToolkitId: id }))
            }
          />
        )}

        {state.activeTab === 'reassessment' && (
          <ReassessmentView state={state} onUpdateState={handleUpdateState} />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={handleSelectTab} />
    </div>
  );
}
