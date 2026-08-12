import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { COMPETENCIES } from '../data/assessmentData';
import { AppState, PriorityPlannerState } from '../types';

interface PriorityPlannerViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  onSelectTab: (tab: AppState['activeTab']) => void;
  onSelectToolkit: (toolkitId: number) => void;
  onOpenAICoach: () => void;
}

export const PriorityPlannerView: React.FC<PriorityPlannerViewProps> = ({
  state,
  onUpdateState,
  onSelectTab,
  onSelectToolkit,
  onOpenAICoach,
}) => {
  const pState = state.priorityPlanner;
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleUpdatePlanner = (field: keyof PriorityPlannerState, value: any) => {
    onUpdateState((prev) => ({
      ...prev,
      priorityPlanner: {
        ...prev.priorityPlanner,
        [field]: value,
      },
    }));
  };

  const handleShortlistToggle = (compId: number) => {
    const list = pState.initialShortlist || [];
    let newList: number[];
    if (list.includes(compId)) {
      newList = list.filter((id) => id !== compId);
    } else {
      if (list.length >= 3) {
        newList = [...list.slice(1), compId];
      } else {
        newList = [...list, compId];
      }
    }
    handleUpdatePlanner('initialShortlist', newList);
  };

  // Construct final statement whenever formula fields change
  const handleFormulaChange = (when: string, will: string, soThat: string) => {
    const constructed = `When ${when.trim()}, I will ${will.trim()} so that ${soThat.trim()}.`;
    onUpdateState((prev) => ({
      ...prev,
      priorityPlanner: {
        ...prev.priorityPlanner,
        priorityStatementWhen: when,
        priorityStatementWill: will,
        priorityStatementSoThat: soThat,
        finalPriorityStatement: constructed,
      },
    }));
  };

  const handleRefineWithAI = async () => {
    setIsAiLoading(true);
    try {
      const selectedComp = COMPETENCIES.find(
        (c) => c.id === pState.selectedCompetencyId
      );
      const promptText = `Help me refine my 30-Day Leadership Priority Statement for the UnLocked Manager Success System.
Competency: ${selectedComp?.title || 'Leadership Presence'}
Pattern: ${pState.currentPattern || 'Inconsistent visibility during rushes'}
Trigger: ${pState.trigger || 'Understaffing or rush hours'}
Root Cause: ${pState.rootCause || 'Belief that paperwork takes priority'}

Format the output strictly as JSON with keys: "when", "will", "soThat", "fullStatement"`;

      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          context: 'Priority Statement Builder',
          type: 'Refinement',
        }),
      });

      const data = await response.json();
      if (data.reply) {
        // Try to extract JSON or apply reply
        try {
          const jsonMatch = data.reply.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.when && parsed.will && parsed.soThat) {
              handleFormulaChange(parsed.when, parsed.will, parsed.soThat);
            }
          } else {
            handleUpdatePlanner('finalPriorityStatement', data.reply);
          }
        } catch (e) {
          handleUpdatePlanner('finalPriorityStatement', data.reply);
        }
      }
    } catch (err) {
      console.error('AI Refinement failed', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              LEADERSHIP PRIORITY PLANNER
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold">
              IDENTIFY & COMMIT TO YOUR PRIORITY
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              "Focused improvement outperforms scattered intention."
            </p>
          </div>

          <button
            onClick={onOpenAICoach}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 shadow self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Priority Assistant</span>
          </button>
        </div>

        <div className="bg-[#112A46] p-4 rounded-lg border border-blue-800 text-xs text-slate-300 space-y-1">
          <strong className="text-amber-400 block uppercase">WHY THIS STEP MATTERS</strong>
          <p>
            A low score is not automatically the right priority, and a high overall score does not erase a serious gap. Review the pattern, apply the safeguards and select ONE observable leadership behavior to practice for 30 days.
          </p>
        </div>
      </div>

      {/* Step 1: Initial Opportunity Shortlist */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              PLANNER | PAGE 1
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              1. INITIAL OPPORTUNITY SHORTLIST (Pick up to 3)
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-blue-900">
            Shortlist: {pState.initialShortlist?.length || 0}/3 Selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COMPETENCIES.map((comp) => {
            const isSelected = pState.initialShortlist?.includes(comp.id);
            return (
              <div
                key={comp.id}
                onClick={() => handleShortlistToggle(comp.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-blue-900">
                    C{comp.id}
                  </span>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                </div>
                <div className="font-semibold text-xs text-slate-900 leading-snug">
                  {comp.title}
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">
                  Type: {comp.type}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 2: Impact vs Control Test Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            PLANNER | PAGE 2
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            2. TEST THE IMPACT (Control vs Impact Matrix)
          </h2>
          <p className="text-xs text-slate-500">
            Compare your shortlisted competencies. Select the behavior with the greatest meaningful impact and direct manager control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-1">
            <div className="font-bold text-xs text-emerald-900 uppercase">
              GREATER CONTROL + HIGHER IMPACT → ACT IMMEDIATELY
            </div>
            <p className="text-xs text-slate-700">
              High leverage behaviors where manager actions directly produce visible team improvements within 30 days.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl space-y-1">
            <div className="font-bold text-xs text-amber-900 uppercase">
              LIMITED CONTROL + HIGHER IMPACT → INFLUENCE OR ESCALATE
            </div>
            <p className="text-xs text-slate-700">
              Systemic barriers or cross-department issues requiring partnership with supporting leaders.
            </p>
          </div>
        </div>

        {/* Selected Primary Competency Choice */}
        <div className="pt-2 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">
            PRIMARY COMPETENCY SELECTED FOR 30-DAY FOCUS:
          </label>
          <select
            value={pState.selectedCompetencyId || 1}
            onChange={(e) =>
              handleUpdatePlanner('selectedCompetencyId', parseInt(e.target.value))
            }
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs font-bold text-slate-900 outline-none focus:border-blue-600"
          >
            {COMPETENCIES.map((c) => (
              <option key={c.id} value={c.id}>
                Competency {c.id}: {c.title} ({c.type})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 3: Name the Behavior (Root Cause Thinking) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              PLANNER | PAGE 3
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              3. NAME THE BEHAVIOR (Root-Cause Thinking)
            </h2>
          </div>
          <button
            onClick={handleRefineWithAI}
            disabled={isAiLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 font-semibold transition-colors disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isAiLoading ? 'Refining...' : 'AI Refine Statement'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 uppercase">
              1. THE CURRENT PATTERN
            </label>
            <textarea
              rows={2}
              value={pState.currentPattern}
              onChange={(e) => handleUpdatePlanner('currentPattern', e.target.value)}
              placeholder="What do I currently do, delay, avoid or handle inconsistently?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 uppercase">
              2. THE TRIGGER
            </label>
            <textarea
              rows={2}
              value={pState.trigger}
              onChange={(e) => handleUpdatePlanner('trigger', e.target.value)}
              placeholder="When or under what conditions does this pattern usually occur?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 uppercase">
              3. THE ROOT CAUSE
            </label>
            <textarea
              rows={2}
              value={pState.rootCause}
              onChange={(e) => handleUpdatePlanner('rootCause', e.target.value)}
              placeholder="What belief, habit, skill gap or pressure is driving it?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 uppercase">
              4. BEHAVIOR EMPLOYEES NEED TO EXPERIENCE
            </label>
            <textarea
              rows={2}
              value={pState.behaviorToExperience}
              onChange={(e) => handleUpdatePlanner('behaviorToExperience', e.target.value)}
              placeholder="Write what you will do differently in clear, observable language."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        {/* Priority Statement Builder Formula */}
        <div className="bg-[#0F2537] text-white p-5 rounded-xl border border-blue-900 space-y-4">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            BUILD YOUR PRIORITY STATEMENT
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-blue-300 font-bold block mb-1">When (Trigger):</span>
              <input
                type="text"
                value={pState.priorityStatementWhen}
                onChange={(e) =>
                  handleFormulaChange(
                    e.target.value,
                    pState.priorityStatementWill,
                    pState.priorityStatementSoThat
                  )
                }
                placeholder="the operation becomes demanding..."
                className="w-full bg-[#112A46] text-white border border-blue-800 rounded p-2 text-xs outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <span className="text-blue-300 font-bold block mb-1">I will (Action):</span>
              <input
                type="text"
                value={pState.priorityStatementWill}
                onChange={(e) =>
                  handleFormulaChange(
                    pState.priorityStatementWhen,
                    e.target.value,
                    pState.priorityStatementSoThat
                  )
                }
                placeholder="conduct two purposeful check-ins..."
                className="w-full bg-[#112A46] text-white border border-blue-800 rounded p-2 text-xs outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <span className="text-blue-300 font-bold block mb-1">so that (Impact):</span>
              <input
                type="text"
                value={pState.priorityStatementSoThat}
                onChange={(e) =>
                  handleFormulaChange(
                    pState.priorityStatementWhen,
                    pState.priorityStatementWill,
                    e.target.value
                  )
                }
                placeholder="employees experience consistent leadership..."
                className="w-full bg-[#112A46] text-white border border-blue-800 rounded p-2 text-xs outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="bg-[#112A46] p-3 rounded-lg border border-blue-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">
              FINAL PRIORITY STATEMENT:
            </span>
            <div className="text-xs sm:text-sm font-semibold text-amber-300 mt-1 italic">
              "{pState.finalPriorityStatement}"
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: Commit to the Priority */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            PLANNER | PAGE 4
          </span>
          <h2 className="text-lg font-bold text-slate-900">
            4. COMMIT TO THE PRIORITY (30-Day Practice Plan)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">EVIDENCE I WILL COLLECT</label>
            <textarea
              rows={2}
              value={pState.evidenceToCollect}
              onChange={(e) => handleUpdatePlanner('evidenceToCollect', e.target.value)}
              placeholder="What observations, employee responses or results will show progress?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">SUPPORT I MAY NEED</label>
            <textarea
              rows={2}
              value={pState.supportNeeded}
              onChange={(e) => handleUpdatePlanner('supportNeeded', e.target.value)}
              placeholder="Which toolkit resource, mentor or process will help me follow through?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">ACCOUNTABILITY PARTNER</label>
            <input
              type="text"
              value={pState.accountabilityPartner}
              onChange={(e) => handleUpdatePlanner('accountabilityPartner', e.target.value)}
              placeholder="Who will review my progress and provide honest feedback?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">REVIEW RHYTHM</label>
            <input
              type="text"
              value={pState.reviewRhythm}
              onChange={(e) => handleUpdatePlanner('reviewRhythm', e.target.value)}
              placeholder="When will I pause each week to review actions and evidence?"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">START DATE</label>
            <input
              type="date"
              value={pState.startDate}
              onChange={(e) => handleUpdatePlanner('startDate', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-800 uppercase">REASSESSMENT DATE</label>
            <input
              type="date"
              value={pState.reassessmentDate}
              onChange={(e) => handleUpdatePlanner('reassessmentDate', e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <div className="space-y-1 text-xs">
          <label className="font-bold text-slate-800 uppercase">WHAT MEANINGFUL PROGRESS WILL LOOK LIKE</label>
          <textarea
            rows={2}
            value={pState.meaningfulProgressDescription}
            onChange={(e) => handleUpdatePlanner('meaningfulProgressDescription', e.target.value)}
            placeholder="Describe the change you expect employees or the operation to experience if you practice this behavior consistently."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs outline-none focus:border-blue-600"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Next: Open the connected toolkit for Competency {pState.selectedCompetencyId || 1}.
          </div>
          <button
            onClick={() => {
              onSelectTab('toolkits');
              if (pState.selectedCompetencyId) {
                onSelectToolkit(pState.selectedCompetencyId);
              }
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md flex items-center space-x-2 transition-all"
          >
            <span>Open Connected Competency Toolkit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
