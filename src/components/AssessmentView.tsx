import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { COMPETENCIES, QUESTIONS } from '../data/assessmentData';
import { AppState, RatingValue } from '../types';

interface AssessmentViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onSelectTab: (tab: AppState['activeTab']) => void;
  onSelectToolkit: (toolkitId: number) => void;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({
  state,
  onUpdateState,
  onSelectTab,
  onSelectToolkit,
}) => {
  const [expandedCompetency, setExpandedCompetency] = useState<number | null>(1);

  const handleRatingChange = (questionId: number, rating: RatingValue) => {
    onUpdateState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: rating,
      },
    }));
  };

  const answeredCount = Object.keys(state.answers).length;
  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleFillDefaults = () => {
    // Fill all un-rated questions with rating 3 or 4
    const newAnswers: Record<number, RatingValue> = { ...state.answers };
    QUESTIONS.forEach((q) => {
      if (!newAnswers[q.id]) {
        newAnswers[q.id] = (q.id % 2 === 0 ? 3 : 4) as RatingValue;
      }
    });
    onUpdateState((prev) => ({ ...prev, answers: newAnswers }));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Assessment Header Banner */}
      <div className="bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              LEADERSHIP DEVELOPMENT SERIES
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold">
              MANAGER SUCCESS ASSESSMENT
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              "Honest reflection is where meaningful improvement begins."
            </p>
          </div>

          <div className="bg-[#112A46] border border-blue-800 rounded-xl p-3.5 flex flex-col justify-between min-w-[200px]">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-300 font-semibold">Completion Progress</span>
              <span className="text-amber-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-amber-400 h-2 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-1 text-right">
              {answeredCount} of {totalQuestions} statements rated
            </div>
          </div>
        </div>

        {/* Rating Scale Legend */}
        <div className="bg-[#112A46] p-4 rounded-lg border border-blue-800/80 space-y-2">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center justify-between">
            <span>RATING SCALE (1 = Rarely or Never, 5 = Consistently)</span>
            <button
              onClick={handleFillDefaults}
              className="text-[10px] text-blue-300 hover:text-white underline font-normal"
            >
              Fill Sample Baseline Ratings
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1 text-center text-xs">
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
              <span className="font-bold text-red-400 block">1</span>
              <span className="text-[10px] text-slate-300">Rarely/Never</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
              <span className="font-bold text-orange-400 block">2</span>
              <span className="text-[10px] text-slate-300">Occasionally</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
              <span className="font-bold text-amber-400 block">3</span>
              <span className="text-[10px] text-slate-300">Sometimes</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
              <span className="font-bold text-blue-300 block">4</span>
              <span className="text-[10px] text-slate-300">Usually</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded border border-slate-700">
              <span className="font-bold text-emerald-400 block">5</span>
              <span className="text-[10px] text-slate-300">Consistently</span>
            </div>
          </div>
        </div>
      </div>

      {/* Competency Sections */}
      <div className="space-y-6">
        {COMPETENCIES.map((comp) => {
          const isExpanded = expandedCompetency === comp.id;
          const compQuestions = QUESTIONS.filter((q) => q.competencyId === comp.id);
          const compRatings = compQuestions.map((q) => state.answers[q.id] || 0);
          const answeredInComp = compRatings.filter((r) => r > 0).length;
          const compSum = compRatings.reduce((a, b) => a + b, 0);
          const compAvg = answeredInComp === 5 ? (compSum / 5).toFixed(2) : '--';

          return (
            <div
              key={comp.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              {/* Competency Header Bar */}
              <div
                onClick={() => setExpandedCompetency(isExpanded ? null : comp.id)}
                className="bg-slate-50 hover:bg-slate-100/80 p-4 sm:p-5 border-b border-slate-200 cursor-pointer flex items-center justify-between gap-3 select-none"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center flex-shrink-0 ${
                      comp.type === 'Critical'
                        ? 'bg-[#0F2537] text-amber-300 border border-amber-500/40'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    C{comp.id}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900">
                        {comp.title}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase ${
                          comp.type === 'Critical'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {comp.type} ({comp.weight * 100}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {comp.evaluates}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Average
                    </div>
                    <div className="text-base font-extrabold text-blue-900">
                      {compAvg}
                    </div>
                  </div>

                  <div className="p-1 rounded bg-slate-200 text-slate-600">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Competency Content Body */}
              {isExpanded && (
                <div className="p-4 sm:p-6 space-y-6 animate-fadeIn">
                  {/* Reality Check Banner */}
                  <div className="bg-blue-50 border-l-4 border-blue-900 p-4 rounded-r-lg text-xs space-y-1">
                    <span className="font-bold text-blue-900 uppercase tracking-wider block">
                      MANAGER REALITY CHECK
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {comp.realityCheck}
                    </p>
                  </div>

                  {/* 5 Assessment Statements */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">
                      SELF-ASSESSMENT STATEMENTS (Rate 1 - 5)
                    </h4>

                    {compQuestions.map((q, idx) => {
                      const currentRating = state.answers[q.id];
                      return (
                        <div
                          key={q.id}
                          className="bg-slate-50/70 p-3.5 sm:p-4 rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                          <div className="flex items-start space-x-2 max-w-xl">
                            <span className="font-bold text-xs text-blue-900 mt-0.5">
                              {idx + 1}.
                            </span>
                            <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                              {q.statement}
                            </span>
                          </div>

                          {/* 1-5 Button Group */}
                          <div className="flex items-center space-x-1.5 self-end md:self-center">
                            {[1, 2, 3, 4, 5].map((val) => {
                              const isSelected = currentRating === val;
                              return (
                                <button
                                  key={val}
                                  onClick={() =>
                                    handleRatingChange(q.id, val as RatingValue)
                                  }
                                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                    isSelected
                                      ? 'bg-[#0F2537] text-white shadow ring-2 ring-blue-500'
                                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reflection & Practical Exercise */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>PRACTICAL EXERCISE</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-800">
                        {comp.exerciseTitle}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{comp.exercisePrompt}"
                      </p>
                    </div>

                    <div className="bg-[#0F2537] text-white p-4 rounded-xl border border-blue-900 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          CONNECTED COMPETENCY TOOLKIT
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          Tools available: {comp.connectedTools.slice(0, 3).join(', ')}...
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          onSelectTab('toolkits');
                          onSelectToolkit(comp.id);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center justify-between w-full transition-colors"
                      >
                        <span>Open Toolkit {comp.id}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA to View Scoring & Results */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            Ready to review your Weighted Score & Profile?
          </h3>
          <p className="text-xs text-slate-500">
            {answeredCount} of {totalQuestions} statements completed. You can view your scorecard and safeguards anytime.
          </p>
        </div>
        <button
          onClick={() => onSelectTab('results')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md flex items-center space-x-2 transition-all flex-shrink-0"
        >
          <span>Calculate Results & Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
