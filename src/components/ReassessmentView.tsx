import React from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  FileCheck,
  Download,
  PenTool,
} from 'lucide-react';
import { AppState, ReassessmentState } from '../types';

interface ReassessmentViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
}

export const ReassessmentView: React.FC<ReassessmentViewProps> = ({
  state,
  onUpdateState,
}) => {
  const rState = state.reassessmentState;

  const handleUpdateReassessment = (field: keyof ReassessmentState, value: any) => {
    onUpdateState((prev) => ({
      ...prev,
      reassessmentState: {
        ...prev.reassessmentState,
        [field]: value,
      },
    }));
  };

  const handleUpdateWeeklyReview = (
    weekIdx: number,
    field: 'progressAndEvidence' | 'barrier' | 'nextAction',
    value: string
  ) => {
    const newReviews = [...rState.weeklyReviews];
    newReviews[weekIdx] = {
      ...newReviews[weekIdx],
      [field]: value,
    };
    handleUpdateReassessment('weeklyReviews', newReviews);
  };

  const scoreChange = (rState.day30Score - rState.originalScore).toFixed(2);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              30-DAY PROGRESS & REASSESSMENT
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold">
              MEASURE WHAT CHANGED
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              "Growth is proven by what you do differently next."
            </p>
          </div>

          <div className="bg-[#112A46] border border-blue-800 rounded-xl p-4 text-center min-w-[200px]">
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              30-Day Score Change
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              {Number(scoreChange) >= 0 ? `+${scoreChange}` : scoreChange}
            </div>
            <div className="text-[10px] text-slate-400">
              {rState.originalScore.toFixed(2)} → {rState.day30Score.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* 4-Week Practice Map & Weekly Reviews */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              MANAGER SUCCESS ASSESSMENT | PAGE 16
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              WEEKLY PROGRESS REVIEWS
            </h2>
          </div>
          <Calendar className="w-5 h-5 text-blue-900" />
        </div>

        <div className="space-y-4">
          {rState.weeklyReviews.map((rev, idx) => (
            <div
              key={rev.week}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="bg-[#0F2537] text-white font-bold text-xs px-2.5 py-1 rounded">
                  WEEK {rev.week}
                </span>
                <span className="text-xs font-semibold text-blue-900 italic">
                  Focus: {rev.practiceFocus}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-800 uppercase block mb-1">
                    PROGRESS AND EVIDENCE
                  </label>
                  <textarea
                    rows={2}
                    value={rev.progressAndEvidence}
                    onChange={(e) =>
                      handleUpdateWeeklyReview(idx, 'progressAndEvidence', e.target.value)
                    }
                    placeholder="What actions were completed and what evidence was gathered?"
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 uppercase block mb-1">
                    BARRIER / CHALLENGE
                  </label>
                  <textarea
                    rows={2}
                    value={rev.barrier}
                    onChange={(e) =>
                      handleUpdateWeeklyReview(idx, 'barrier', e.target.value)
                    }
                    placeholder="What interfered or made consistency difficult?"
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 uppercase block mb-1">
                    NEXT ACTION
                  </label>
                  <textarea
                    rows={2}
                    value={rev.nextAction}
                    onChange={(e) =>
                      handleUpdateWeeklyReview(idx, 'nextAction', e.target.value)
                    }
                    placeholder="What specific adjustment will you make for next week?"
                    className="w-full bg-white border border-slate-300 rounded p-2 text-xs outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-Day Reassessment Comparison */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            MANAGER SUCCESS ASSESSMENT | PAGE 17
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            30-DAY REASSESSMENT QUESTIONS
          </h2>
          <p className="text-xs text-slate-500">
            Re-rate the five statements in your selected competency, then answer the questions below.
          </p>
        </div>

        {/* Score Comparison Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div>
            <label className="font-bold text-slate-800 uppercase block mb-1">
              ORIGINAL COMPETENCY SCORE
            </label>
            <input
              type="number"
              step="0.01"
              value={rState.originalScore}
              onChange={(e) =>
                handleUpdateReassessment('originalScore', parseFloat(e.target.value) || 0)
              }
              className="w-full bg-white border border-slate-300 rounded p-2 font-mono font-bold text-slate-900 text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 uppercase block mb-1">
              30-DAY REASSESSMENT SCORE
            </label>
            <input
              type="number"
              step="0.01"
              value={rState.day30Score}
              onChange={(e) =>
                handleUpdateReassessment('day30Score', parseFloat(e.target.value) || 0)
              }
              className="w-full bg-white border border-slate-300 rounded p-2 font-mono font-bold text-emerald-900 text-sm"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 uppercase block mb-1">
              MEASURABLE SCORE CHANGE
            </label>
            <div className="bg-white border border-slate-300 rounded p-2 font-mono font-extrabold text-blue-900 text-sm">
              {scoreChange}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">
              WHICH BEHAVIOR IMPROVED MOST?
            </label>
            <textarea
              rows={2}
              value={rState.behaviorImprovedMost}
              onChange={(e) =>
                handleUpdateReassessment('behaviorImprovedMost', e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">
              WHAT MEASURABLE EVIDENCE DEMONSTRATES PROGRESS?
            </label>
            <textarea
              rows={2}
              value={rState.measurableEvidence}
              onChange={(e) =>
                handleUpdateReassessment('measurableEvidence', e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">
              WHAT DID EMPLOYEES EXPERIENCE DIFFERENTLY?
            </label>
            <textarea
              rows={2}
              value={rState.whatEmployeesExperienced}
              onChange={(e) =>
                handleUpdateReassessment('whatEmployeesExperienced', e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">
              WHAT ACTION WAS MOST EFFECTIVE?
            </label>
            <textarea
              rows={2}
              value={rState.mostEffectiveAction}
              onChange={(e) =>
                handleUpdateReassessment('mostEffectiveAction', e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label className="font-bold text-slate-800 uppercase">
            SHOULD THIS PRIORITY CONTINUE, OR IS ANOTHER COMPETENCY NOW MORE IMPORTANT?
          </label>
          <textarea
            rows={2}
            value={rState.continueOrSelectNew}
            onChange={(e) =>
              handleUpdateReassessment('continueOrSelectNew', e.target.value)
            }
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Manager Commitment Sign-off */}
      <div className="bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-blue-900 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              COMMITMENT
            </span>
            <h2 className="text-xl font-bold">MANAGER COMMITMENT SIGN-OFF</h2>
          </div>
          <PenTool className="w-5 h-5 text-amber-400" />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed italic bg-[#112A46] p-4 rounded-lg border border-blue-800">
          "Leadership is demonstrated through consistent behavior. I understand that intention, knowledge or title alone does not make me effective. I will take responsibility for how my leadership affects employees, customers, operations and business results. I commit to one focused improvement priority and will evaluate my progress honestly after 30 days."
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="text-blue-300 font-bold block mb-1 uppercase">
              MANAGER SIGNATURE
            </label>
            <input
              type="text"
              value={rState.managerSignature}
              onChange={(e) =>
                handleUpdateReassessment('managerSignature', e.target.value)
              }
              className="w-full bg-[#112A46] text-amber-300 border border-blue-800 rounded p-2 font-serif font-bold text-sm outline-none"
            />
          </div>

          <div>
            <label className="text-blue-300 font-bold block mb-1 uppercase">
              DATE
            </label>
            <input
              type="date"
              value={rState.signatureDate}
              onChange={(e) =>
                handleUpdateReassessment('signatureDate', e.target.value)
              }
              className="w-full bg-[#112A46] text-white border border-blue-800 rounded p-2 outline-none"
            />
          </div>

          <div>
            <label className="text-blue-300 font-bold block mb-1 uppercase">
              ACCOUNTABILITY PARTNER
            </label>
            <input
              type="text"
              value={rState.accountabilityPartner}
              onChange={(e) =>
                handleUpdateReassessment('accountabilityPartner', e.target.value)
              }
              className="w-full bg-[#112A46] text-white border border-blue-800 rounded p-2 outline-none"
            />
          </div>

          <div>
            <label className="text-blue-300 font-bold block mb-1 uppercase">
              REVIEW DATE
            </label>
            <input
              type="date"
              value={rState.reviewDate}
              onChange={(e) =>
                handleUpdateReassessment('reviewDate', e.target.value)
              }
              className="w-full bg-[#112A46] text-white border border-blue-800 rounded p-2 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
