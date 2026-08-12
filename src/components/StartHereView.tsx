import React from 'react';
import {
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Target,
  Sparkles,
  Award,
} from 'lucide-react';
import { AppState } from '../types';

interface StartHereViewProps {
  state: AppState;
  onSelectTab: (tab: AppState['activeTab']) => void;
  onSelectToolkit?: (id: number) => void;
}

export const StartHereView: React.FC<StartHereViewProps> = ({
  onSelectTab,
  onSelectToolkit,
}) => {
  const steps = [
    {
      num: '01',
      title: 'ASSESS',
      subtitle: 'EXISTING MANAGER SUCCESS ASSESSMENT',
      desc: 'Rate your current leadership behaviors honestly across the eight core management competencies.',
      outcome: 'OUTCOME: A clear baseline of how you lead today.',
      tab: 'assessment' as const,
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      subtitle: 'SCORING GUIDE + RESULTS PROFILE',
      desc: 'Calculate your results and identify the patterns behind your strongest behaviors and greatest opportunities.',
      outcome: 'OUTCOME: Self-awareness supported by evidence.',
      tab: 'results' as const,
    },
    {
      num: '03',
      title: 'PRIORITIZE',
      subtitle: 'LEADERSHIP PRIORITY PLANNER',
      desc: 'Select the one or two behaviors that will create the greatest positive impact for your team and operation.',
      outcome: 'OUTCOME: A focused improvement target.',
      tab: 'priority' as const,
    },
    {
      num: '04',
      title: 'APPLY THE TOOLS',
      subtitle: 'COMPETENCY TOOLKITS + RESOURCES',
      desc: 'Choose the scripts, templates, checklists and practical tools connected to your priority area.',
      outcome: 'OUTCOME: Practical support for real workplace situations.',
      tab: 'toolkits' as const,
    },
    {
      num: '05',
      title: 'PRACTICE FOR 30 DAYS',
      subtitle: '30-DAY LEADERSHIP IMPROVEMENT PLAN',
      desc: 'Practice the selected behaviors consistently, document your actions and monitor the response of your team.',
      outcome: 'OUTCOME: New behaviors reinforced through repetition.',
      tab: 'reassessment' as const,
    },
    {
      num: '06',
      title: 'REASSESS',
      subtitle: 'PROGRESS REVIEW + REASSESSMENT',
      desc: 'Measure what changed, recognize progress and determine the next leadership behavior that needs your attention.',
      outcome: 'OUTCOME: Measurable progress and a new improvement cycle.',
      tab: 'reassessment' as const,
    },
  ];

  const packageContents = [
    { num: '01', title: 'Start Here + Leadership Path', desc: 'Understand the purpose, mindset and six-step improvement process.', page: 'PAGE 4', tab: 'start-here' },
    { num: '02', title: 'Leadership-to-Results Framework', desc: 'Connect manager behavior to People, Process and Performance evidence.', page: 'PAGE 6', tab: 'framework' },
    { num: '03', title: 'Meet the Creator', desc: 'Learn the experience and leadership philosophy behind the system.', page: 'PAGE 7', tab: 'framework' },
    { num: '04', title: 'Existing Manager Success Assessment', desc: 'Assess eight leadership competencies and select a focused development priority.', page: 'PAGE 9', tab: 'assessment' },
    { num: '05', title: 'Scoring Guide + Results Profile', desc: 'Calculate the weighted score, apply safeguards and understand the final profile.', page: 'PAGE 26', tab: 'results' },
    { num: '06', title: 'Leadership Priority Planner', desc: 'Turn your results into one clear, observable leadership priority for the next 30 days.', page: 'PAGE 31', tab: 'priority' },
    { num: '07', title: 'Leadership Presence + Credibility Toolkit', desc: 'Practice visibility, composure, ownership and reliable follow-through for 30 days.', page: 'PAGE 35', tab: 'toolkits', toolkitId: 1 },
    { num: '08', title: 'Communication + Expectations Toolkit', desc: 'Build clear priorities, shared understanding, reliable handoffs and consistent communication.', page: 'PAGE 45', tab: 'toolkits', toolkitId: 2 },
    { num: '09', title: 'Trust + Employee Engagement Toolkit', desc: 'Strengthen fairness, recognition, psychological safety, relationships and visible follow-through.', page: 'PAGE 55', tab: 'toolkits', toolkitId: 3 },
    { num: '10', title: 'Coaching + Accountability Toolkit', desc: 'Diagnose performance gaps, coach effectively, clarify expectations and complete follow-through.', page: 'PAGE 65', tab: 'toolkits', toolkitId: 4 },
    { num: '11', title: 'Delegation + Time Management Toolkit', desc: 'Transfer meaningful ownership, match work to readiness and reinvest management time.', page: 'PAGE 75', tab: 'toolkits', toolkitId: 5 },
    { num: '12', title: 'Employee Development + Retention Toolkit', desc: 'Create growth opportunities, evaluate readiness fairly and address retention risk.', page: 'PAGE 85', tab: 'toolkits', toolkitId: 6 },
    { num: '13', title: 'Operational Execution Toolkit', desc: 'Build observable standards, clear ownership, verification and repeatable systems.', page: 'PAGE 95', tab: 'toolkits', toolkitId: 7 },
    { num: '14', title: 'Business + Results Leadership Toolkit', desc: 'Translate business data into focused team action and balanced performance decisions.', page: 'PAGE 105', tab: 'toolkits', toolkitId: 8 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Hero Welcome Card */}
      <div className="bg-[#0F2537] text-white rounded-2xl overflow-hidden shadow-xl border border-blue-900">
        <div className="p-6 md:p-10 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-blue-900/60 border border-blue-400/30 text-blue-200 text-xs px-3 py-1 rounded-full font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>UNLOCKED BUSINESS SOLUTIONS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
              UNLOCKED MANAGER SUCCESS SYSTEM
            </h1>
            <p className="text-blue-200 text-sm sm:text-base font-medium">
              EXISTING MANAGER EDITION — A practical system for honest assessment, focused action and measurable growth.
            </p>
            <div className="bg-[#112A46] border-l-4 border-amber-500 p-4 rounded-r-lg text-slate-200 text-xs sm:text-sm font-medium italic">
              "LEADERSHIP IS DEMONSTRATED THROUGH CONSISTENT BEHAVIOR."
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onSelectTab('assessment')}
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-md flex items-center space-x-2 transition-all"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('framework')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-slate-700 transition-all"
              >
                Learn Framework
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Message & Mindset Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Personal Message */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              A PERSONAL MESSAGE TO THE MANAGER
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Welcome.</h2>
          </div>
          <p className="text-slate-700 text-sm leading-relaxed">
            Whether you are an experienced manager, preparing for your next opportunity or working to rebuild an underperforming operation, this system is not about proving that you are perfect. It is about being honest enough to recognize what is working, courageous enough to acknowledge what is not and disciplined enough to make meaningful changes.
          </p>
          <p className="text-slate-700 text-sm leading-relaxed">
            I encourage you to approach every assessment, reflection and exercise with an open mind. Your results do not define your potential - they reveal where your attention is needed next. The goal is not simply to become a better manager. The goal is to become the kind of leader whose consistent behavior helps employees grow, strengthens the operation and produces sustainable results.
          </p>
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 text-base">Randy Locke</div>
              <div className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                FOUNDER | UNLOCKED BUSINESS SOLUTIONS
              </div>
              <div className="text-xs text-slate-500">
                General Manager | People Developer | Entrepreneur
              </div>
            </div>
          </div>
        </div>

        {/* Mindset Card */}
        <div className="lg:col-span-5 bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-4 border-b border-blue-900/60 pb-2">
              THE MINDSET THAT MAKES THIS SYSTEM WORK
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="font-bold text-sm text-white uppercase tracking-wide">
                    BE HONEST
                  </div>
                  <div className="text-xs text-slate-300 leading-snug mt-0.5">
                    Answer based on what you consistently do - not what you intend to do.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="font-bold text-sm text-white uppercase tracking-wide">
                    STAY FOCUSED
                  </div>
                  <div className="text-xs text-slate-300 leading-snug mt-0.5">
                    Work on one or two high-impact behaviors instead of trying to fix everything at once.
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="font-bold text-sm text-white uppercase tracking-wide">
                    PRACTICE CONSISTENTLY
                  </div>
                  <div className="text-xs text-slate-300 leading-snug mt-0.5">
                    Lasting leadership growth comes from repeated action, reflection and adjustment.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#112A46] border border-blue-800 p-4 rounded-lg space-y-2">
            <div className="text-amber-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>YOUR COMMITMENT</span>
            </div>
            <p className="text-xs text-slate-300 italic">
              "Complete the process with objectivity, patience and a willingness to act on what you discover."
            </p>
          </div>
        </div>
      </div>

      {/* Leadership Path Step-by-Step */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              HOW TO USE THE SYSTEM
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              YOUR LEADERSHIP PATH
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md">
            Move through the steps in order. Each stage builds on the one before it, creating a repeatable cycle of assessment, action and measurable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              onClick={() => onSelectTab(s.tab)}
              className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl p-5 cursor-pointer transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-[#0F2537] text-white text-xs font-bold px-2.5 py-1 rounded">
                    {s.num}
                  </span>
                  <span className="text-[10px] font-bold text-blue-900 tracking-wider uppercase group-hover:underline">
                    {s.title}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {s.subtitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-blue-950 font-semibold">
                <span className="text-[11px] text-blue-900 italic">{s.outcome}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Contents Index Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              COMPLETE PACKAGE INDEX
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              PACKAGE CONTENTS
            </h2>
          </div>
          <BookOpen className="w-5 h-5 text-blue-900" />
        </div>

        <div className="space-y-2">
          {packageContents.map((item) => (
            <div
              key={item.num}
              onClick={() => {
                onSelectTab(item.tab as AppState['activeTab']);
                if (item.toolkitId && onSelectToolkit) {
                  onSelectToolkit(item.toolkitId);
                }
              }}
              className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors group"
            >
              <div className="flex items-start sm:items-center space-x-3">
                <span className="bg-[#0F2537] text-white font-bold text-xs px-2.5 py-1 rounded flex-shrink-0">
                  {item.num}
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 pl-2">
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase hidden sm:inline-block">
                  {item.page}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0F2537] text-white p-4 rounded-xl border border-blue-900 mt-4 text-xs space-y-1">
          <div className="font-bold text-amber-400 uppercase tracking-wider">
            HOW TO USE THIS PACKAGE
          </div>
          <p className="text-slate-300 leading-relaxed">
            Begin with Start Here, complete the assessment honestly and use the scoring guide to understand your results. Use the Leadership Priority Planner to select one behavior, complete the matching connected toolkit for 30 days and review the evidence of change.
          </p>
        </div>
      </div>
    </div>
  );
};
