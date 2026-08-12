import React from 'react';
import {
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Award,
  Sparkles,
} from 'lucide-react';
import { calculateCompetencyScores, calculateProfileResult } from '../lib/scoring';
import { COMPETENCIES } from '../data/assessmentData';
import { AppState } from '../types';

interface ResultsViewProps {
  state: AppState;
  onSelectTab: (tab: AppState['activeTab']) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ state, onSelectTab }) => {
  const scores = calculateCompetencyScores(state.answers);
  const profileResult = calculateProfileResult(scores);

  const classificationsList = [
    { range: '4.50 - 5.00', name: 'Signature Strength', desc: 'Consistently demonstrated and can be modeled for others.' },
    { range: '3.75 - 4.49', name: 'Effective', desc: 'Strong performance with minor opportunities.' },
    { range: '3.00 - 3.74', name: 'Inconsistent', desc: 'Capability exists but is not demonstrated reliably.' },
    { range: '2.00 - 2.99', name: 'Development Priority', desc: 'The gap may be affecting the team or operation.' },
    { range: '1.00 - 1.99', name: 'Immediate Attention', desc: 'Requires a focused improvement plan and support.' },
  ];

  const profilesMeaning = [
    {
      num: '01',
      name: 'CONSISTENT LEADERSHIP MODEL',
      means: 'Leadership behaviors are strong, balanced and consistently experienced by employees. Credibility, accountability and execution remain dependable across the operation.',
      rec: 'Continue strengthening minor opportunities, mentor other managers and guard against complacency.',
    },
    {
      num: '02',
      name: 'EFFECTIVE LEADER WITH A FOCUSED OPPORTUNITY',
      means: 'Leadership is generally dependable, but one or two areas require more intentional attention. Addressing these opportunities could meaningfully improve overall effectiveness.',
      rec: 'Select one focused behavior and complete the 30-day improvement process.',
    },
    {
      num: '03',
      name: 'CAPABLE BUT INCONSISTENT MANAGER',
      means: 'Important leadership capabilities are present, but employees may not experience them reliably across situations, shifts or periods of pressure.',
      rec: 'Choose the highest-impact inconsistency and establish clear weekly actions, evidence and accountability.',
    },
    {
      num: '04',
      name: 'DEVELOPING MANAGER',
      means: 'Multiple leadership behaviors require strengthening and may be affecting engagement, execution, retention or business performance.',
      rec: 'Create a structured development plan, involve a supporting leader or mentor and review progress frequently.',
    },
    {
      num: '05',
      name: 'LEADERSHIP RESET REQUIRED',
      means: 'Foundational leadership behaviors require immediate attention. Without focused intervention, current patterns may continue to negatively affect employees and operational performance.',
      rec: 'Establish immediate expectations, concentrated support and frequent follow-up. Reassess priority competencies after 30 days.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              SCORING GUIDE + RESULTS PROFILE
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold">
              YOUR ASSESSMENT RESULTS
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              "A score becomes valuable only when it inspires different behavior."
            </p>
          </div>

          {/* Profile Badge */}
          <div className="bg-[#112A46] border border-blue-700 rounded-xl p-4 min-w-[240px] text-right">
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              Weighted Reference Score
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">
              {profileResult.weightedScore.toFixed(2)}
            </div>
            <div className="text-xs font-bold text-blue-200 uppercase mt-1">
              {profileResult.finalProfile}
            </div>
          </div>
        </div>

        {/* Safeguard Alert Box */}
        {profileResult.safeguardTriggered ? (
          <div className="bg-amber-950/80 border border-amber-500 p-4 rounded-xl text-amber-200 text-xs space-y-1">
            <div className="flex items-center space-x-2 font-bold text-amber-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>LEADERSHIP SAFEGUARD RULE APPLIED</span>
            </div>
            <p className="leading-relaxed">{profileResult.safeguardReason}</p>
            <div className="text-[11px] text-slate-300 font-mono pt-1">
              Provisional Profile: {profileResult.provisionalProfile} → Final Profile: {profileResult.finalProfile}
            </div>
          </div>
        ) : (
          <div className="bg-blue-900/40 border border-blue-700/80 p-3 rounded-lg text-xs text-blue-200 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Balanced Performance Confirmed: Provisional Profile matched Final Profile with no overriding critical gap safeguards.
            </span>
          </div>
        )}
      </div>

      {/* Competency Scorecard Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              STEP 1 - STEP 3 CALCULATIONS
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              COMPETENCY SCORECARD
            </h2>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500">
            Critical = 15% | Supporting = 10%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#0F2537] text-white font-semibold">
                <th className="p-3 rounded-tl-lg">Management Competency</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-center">Weight</th>
                <th className="p-3 text-center">Average</th>
                <th className="p-3 text-center">Weighted Points</th>
                <th className="p-3 rounded-tr-lg">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {scores.map((s) => (
                <tr key={s.competencyId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-semibold text-slate-900">
                    {s.competencyId}. {s.title}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        s.type === 'Critical'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {s.type}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-slate-600">
                    {(COMPETENCIES.find((c) => c.id === s.competencyId)?.weight || 0) * 100}%
                  </td>
                  <td className="p-3 text-center font-bold font-mono text-slate-900">
                    {s.average.toFixed(2)}
                  </td>
                  <td className="p-3 text-center font-mono font-bold text-blue-900">
                    {s.weightedPoints.toFixed(4)}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] inline-block ${
                        s.classification === 'Signature Strength'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : s.classification === 'Effective'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : s.classification === 'Inconsistent'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : s.classification === 'Development Priority'
                          ? 'bg-orange-100 text-orange-900 border border-orange-300'
                          : 'bg-red-100 text-red-900 border border-red-300'
                      }`}
                    >
                      {s.classification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300">
                <td colSpan={4} className="p-3 text-right text-slate-900 uppercase">
                  WEIGHTED REFERENCE SCORE TOTAL:
                </td>
                <td className="p-3 text-center font-mono text-sm text-blue-900">
                  {profileResult.weightedScore.toFixed(2)}
                </td>
                <td className="p-3 text-blue-900 font-bold uppercase">
                  {profileResult.finalProfile}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-900 p-3 rounded-r text-xs text-slate-700">
          <strong>IMPORTANT:</strong> A respectable overall score can still conceal a serious weakness in accountability, delegation, engagement or another critical behavior. Use individual competency scores to choose your priority.
        </div>
      </div>

      {/* Profile Descriptions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            PROFILE DEFINITIONS
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            WHAT YOUR PROFILE MEANS
          </h2>
          <p className="text-xs text-slate-500">
            A development snapshot - not a permanent label. It reflects the leadership behaviors your employees are currently experiencing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {profilesMeaning.map((p) => {
            const isMyProfile = profileResult.finalProfile.toUpperCase().includes(p.name.split(' ')[0]);
            return (
              <div
                key={p.num}
                className={`p-5 rounded-xl border transition-all ${
                  isMyProfile
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#0F2537] text-white font-bold text-xs px-2.5 py-1 rounded">
                    {p.num}
                  </span>
                  {isMyProfile && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Your Current Profile
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{p.name}</h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-blue-900 uppercase block text-[10px]">
                      WHAT IT MEANS:
                    </span>
                    <p className="text-slate-700 leading-snug">{p.means}</p>
                  </div>
                  <div className="bg-white p-2.5 rounded border border-slate-200">
                    <span className="font-bold text-amber-700 uppercase block text-[10px]">
                      RECOMMENDED RESPONSE:
                    </span>
                    <p className="text-slate-800 leading-snug">{p.rec}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Worked Profile Examples from PDF Page 30 */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            SCORING GUIDE | PAGE 30
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            WORKED PROFILE EXAMPLES
          </h2>
          <p className="text-xs text-slate-500">
            How the weighted score and safeguards work together to protect the operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">EXAMPLE 1</span>
              <span className="font-mono font-bold text-blue-900 text-lg">4.52</span>
            </div>
            <div className="font-bold text-xs text-slate-900 uppercase">
              CONSISTENT LEADERSHIP MODEL
            </div>
            <p className="text-[11px] text-slate-600">
              <strong>Key Evidence:</strong> No competency below 3.75. All four critical competencies are above 4.00.
            </p>
            <div className="text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200">
              Provisional profile is confirmed.
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">EXAMPLE 2</span>
              <span className="font-mono font-bold text-amber-800 text-lg">4.16</span>
            </div>
            <div className="font-bold text-xs text-slate-900 uppercase">
              CAPABLE BUT INCONSISTENT MANAGER
            </div>
            <p className="text-[11px] text-slate-600">
              <strong>Key Evidence:</strong> Trust & Engagement scored 2.80, despite seven strong competency scores.
            </p>
            <div className="text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200">
              Safeguard prevents trust gap from being hidden.
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">EXAMPLE 3</span>
              <span className="font-mono font-bold text-red-700 text-lg">2.32</span>
            </div>
            <div className="font-bold text-xs text-slate-900 uppercase">
              LEADERSHIP RESET REQUIRED
            </div>
            <p className="text-[11px] text-slate-600">
              <strong>Key Evidence:</strong> Trust & Engagement, a critical competency, scored 1.80.
            </p>
            <div className="text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200">
              Critical-gap safeguard overrides provisional profile.
            </div>
          </div>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="bg-[#0F2537] text-white p-6 rounded-xl border border-blue-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
            NEXT STEP
          </div>
          <h3 className="font-bold text-lg text-white mt-0.5">
            Proceed to the Leadership Priority Planner
          </h3>
          <p className="text-xs text-slate-300">
            Turn your assessment results into one clear, observable leadership priority for the next 30 days.
          </p>
        </div>
        <button
          onClick={() => onSelectTab('priority')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg shadow-md flex items-center space-x-2 transition-all flex-shrink-0"
        >
          <span>Open Priority Planner</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
