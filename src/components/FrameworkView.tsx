import React from 'react';
import {
  Layers,
  Users,
  Settings,
  TrendingUp,
  Award,
  Quote,
  CheckCircle2,
  Building,
  Target,
} from 'lucide-react';

export const FrameworkView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Leadership to Results Chain Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-blue-900" />
            <span>LEADERSHIP-TO-RESULTS | FRAMEWORK</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            HOW LEADERSHIP BECOMES BUSINESS PERFORMANCE
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Business results do not improve through numbers alone. Performance changes when managers demonstrate the right behaviors consistently, employees understand and own the work, and reliable processes turn that effort into repeatable execution.
          </p>
        </div>

        {/* 4 Stage Chain Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 01 Manager Behavior */}
          <div className="bg-slate-50 border-t-4 border-blue-900 rounded-xl p-5 border-x border-b border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                01
              </span>
              <Users className="w-4 h-4 text-blue-900" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                MANAGER BEHAVIOR
              </h3>
              <p className="text-[11px] font-semibold text-blue-900 uppercase tracking-wide">
                Creates the conditions
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-200/80">
              <li className="flex items-start space-x-1.5">
                <span className="text-blue-900 font-bold">•</span>
                <span>Sets clear priorities and standards</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-blue-900 font-bold">•</span>
                <span>Models consistent behavior</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-blue-900 font-bold">•</span>
                <span>Coaches, delegates and follows through</span>
              </li>
            </ul>
          </div>

          {/* 02 Team Response */}
          <div className="bg-slate-50 border-t-4 border-blue-700 rounded-xl p-5 border-x border-b border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                02
              </span>
              <Target className="w-4 h-4 text-blue-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">TEAM RESPONSE</h3>
              <p className="text-[11px] font-semibold text-blue-700 uppercase tracking-wide">
                Builds understanding & ownership
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-200/80">
              <li className="flex items-start space-x-1.5">
                <span className="text-blue-700 font-bold">•</span>
                <span>Employees understand what matters</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-blue-700 font-bold">•</span>
                <span>Capability and accountability grow</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-blue-700 font-bold">•</span>
                <span>Trust and engagement strengthen</span>
              </li>
            </ul>
          </div>

          {/* 03 Operational Execution */}
          <div className="bg-slate-50 border-t-4 border-indigo-700 rounded-xl p-5 border-x border-b border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                03
              </span>
              <Settings className="w-4 h-4 text-indigo-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                OPERATIONAL EXECUTION
              </h3>
              <p className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wide">
                Makes performance repeatable
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-200/80">
              <li className="flex items-start space-x-1.5">
                <span className="text-indigo-700 font-bold">•</span>
                <span>Standards are executed consistently</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-indigo-700 font-bold">•</span>
                <span>Root causes are addressed</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-indigo-700 font-bold">•</span>
                <span>Ownership, handoffs and follow-up improve</span>
              </li>
            </ul>
          </div>

          {/* 04 Business Results */}
          <div className="bg-slate-50 border-t-4 border-emerald-700 rounded-xl p-5 border-x border-b border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                04
              </span>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                BUSINESS RESULTS
              </h3>
              <p className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wide">
                Produces sustainable outcomes
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 pt-1 border-t border-slate-200/80">
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Customer experience improves</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Productivity and quality strengthen</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <span className="text-emerald-700 font-bold">•</span>
                <span>Retention and key results move</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Three Lenses of Evidence */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">
            THREE LENSES OF EVIDENCE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-2">
              <div className="font-bold text-sm text-blue-900 uppercase tracking-wide">
                PEOPLE
              </div>
              <p className="text-xs text-slate-700 font-medium">
                What are employees experiencing differently?
              </p>
              <p className="text-[11px] text-slate-500">
                Look for clarity, trust, capability, ownership and engagement.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                PROCESS
              </div>
              <p className="text-xs text-slate-700 font-medium">
                What is being executed more consistently?
              </p>
              <p className="text-[11px] text-slate-500">
                Look for standards, handoffs, quality, efficiency and follow-through.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 space-y-2">
              <div className="font-bold text-sm text-emerald-900 uppercase tracking-wide">
                PERFORMANCE
              </div>
              <p className="text-xs text-slate-700 font-medium">
                What result is beginning to change?
              </p>
              <p className="text-[11px] text-slate-500">
                Look for customer outcomes, productivity, retention and KPI movement.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#0F2537] text-white p-4 rounded-xl border border-blue-900 text-xs space-y-1">
          <span className="font-bold text-amber-400 uppercase tracking-wider block">
            THE LEADERSHIP-TO-RESULTS STANDARD
          </span>
          <p className="text-slate-300 leading-relaxed">
            Every 30-day priority should connect one observable manager behavior to evidence across People, Process and Performance. Results may take time to move, but the chain of influence should be clear.
          </p>
        </div>
      </div>

      {/* Meet the Creator Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              SYSTEM FOUNDER & CREATOR
            </span>
            <h2 className="text-2xl font-bold text-slate-900">Randy Locke</h2>
            <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide mt-0.5">
              GENERAL MANAGER | BUSINESS PERFORMANCE STRATEGIST | EVENT PLANNER | FOUNDER
            </p>
            <p className="text-xs text-slate-500 font-medium">UnLocked Business Solutions</p>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0F2537] text-white p-5 rounded-xl border border-blue-900">
          <div className="text-center p-2 border-r border-blue-800/80 last:border-none">
            <div className="text-2xl font-extrabold text-blue-300">20+</div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Business Leadership
            </div>
          </div>
          <div className="text-center p-2 border-r border-blue-800/80 last:border-none">
            <div className="text-2xl font-extrabold text-blue-300">25+</div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Event Planning
            </div>
          </div>
          <div className="text-center p-2 border-r border-blue-800/80 last:border-none">
            <div className="text-2xl font-extrabold text-amber-300">$5M+</div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Operations Revenue
            </div>
          </div>
          <div className="text-center p-2">
            <div className="text-2xl font-extrabold text-blue-300">19-31</div>
            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
              Locations Expansion
            </div>
          </div>
        </div>

        {/* Bio Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              Randy Locke is an entrepreneur and General Manager with more than 20 years of experience leading high-volume, multimillion-dollar businesses, including operations generating more than $5 million in annual revenue. Throughout his career, he has developed particular expertise in recruiting and retaining quality employees, developing managerial talent and transforming underperforming businesses into successful operations. His approach combines rigorous root-cause analysis, process and standard operating procedure improvement, performance measurement and servant leadership.
            </p>
            <p>
              Randy began his management career with McDonald's, one of the world's most recognized and successful restaurant brands. There, he was frequently challenged to support underperforming locations, partner with their General Managers and create focused action plans to improve and optimize performance. He later entered the call-center industry, where he developed a reputation for improving key performance indicators and using operational data to produce measurable results. As a Multi-Unit Manager, he helped an organization expand from 19 to 31 locations throughout Metro Detroit while strengthening its leadership, processes and operational foundation.
            </p>
            <p>
              Randy subsequently became an Area Training Manager for KFC, where he trained and developed emerging managerial talent while providing coaching, retraining and performance support to existing General Managers. In 2024, he relocated to Maryland to lead the launch of a new casual-dining restaurant in Baltimore. After successfully completing that assignment, he was recruited by a national convenience retailer, where he currently serves as General Manager of a location generating more than $4 million in annual revenue.
            </p>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <Quote className="w-6 h-6 text-blue-900" />
              <p className="text-xs text-slate-800 font-semibold italic">
                "Whether strengthening a business or producing an event, success begins with a clear vision, the right people and disciplined execution."
              </p>
              <div className="text-[11px] text-slate-500 font-bold uppercase">— Randy Locke</div>
            </div>

            <div className="bg-[#112A46] text-white p-5 rounded-xl border border-blue-800 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                WHY I STAY CLOSE TO THE FRONT LINE
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Remaining at store level is a deliberate professional choice. The greatest opportunities for growth are revealed on the front line, where strategy meets reality and the daily experiences of employees and customers expose what a business truly needs.
              </p>
              <div className="text-xs font-bold text-white pt-2 border-t border-blue-800/80 uppercase">
                THE FRONT LINE IS WHERE STRATEGY MEETS REALITY.
              </div>
            </div>
          </div>
        </div>

        {/* Why Created System & Philosophy */}
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-4">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
            THE LEADERSHIP PHILOSOPHY BEHIND UNLOCKED
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            I believe leadership is demonstrated through consistent behavior - not title, authority or intention. Employees deserve leaders who provide clarity, accountability, support and meaningful opportunities to grow. Strong business results and employee development are not competing priorities. Effective leaders understand that creating both is their responsibility.
          </p>
          <div className="bg-white border-l-4 border-blue-900 p-3 text-xs font-bold text-slate-900">
            LEADERSHIP IS DEMONSTRATED THROUGH CONSISTENT BEHAVIOR.
          </div>
        </div>
      </div>
    </div>
  );
};
