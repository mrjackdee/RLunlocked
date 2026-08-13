import React from 'react';
import {
  Compass,
  Layers,
  ClipboardCheck,
  BarChart3,
  Target,
  Wrench,
  TrendingUp,
} from 'lucide-react';
import { AppState } from '../types';

interface NavigationProps {
  activeTab: AppState['activeTab'];
  onSelectTab: (tab: AppState['activeTab']) => void;
  answersCount: number;
  totalQuestions: number;
}

interface TabItem {
  id: AppState['activeTab'];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  sub: string;
  badge?: string;
  highlight?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  answersCount,
  totalQuestions,
}) => {
  const tabs: TabItem[] = [
    {
      id: 'start-here',
      label: '01. Start Here',
      icon: Compass,
      sub: 'Overview & Path',
    },
    {
      id: 'framework',
      label: '02. Framework & Creator',
      icon: Layers,
      sub: 'Results Chain & Bio',
    },
    {
      id: 'assessment',
      label: '03. Assessment',
      icon: ClipboardCheck,
      sub: `${answersCount}/${totalQuestions} Completed`,
      badge: answersCount < totalQuestions ? `${answersCount}/${totalQuestions}` : '100%',
    },
    {
      id: 'results',
      label: '04. Scoring & Profile',
      icon: BarChart3,
      sub: 'Weighted Score & Safeguards',
    },
    {
      id: 'priority',
      label: '05. Priority Planner',
      icon: Target,
      sub: 'Behavior Naming & Matrix',
    },
    {
      id: 'toolkits',
      label: '06. Connected Toolkits',
      icon: Wrench,
      sub: 'Toolkits 1 - 8',
    },
    {
      id: 'reassessment',
      label: '07. 30-Day Progress',
      icon: TrendingUp,
      sub: 'Reassessment & Logs',
    },
  ];

  return (
    <nav className="bg-[#112A46] border-b border-slate-700/80 sticky top-[53px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id as AppState['activeTab'])}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#0F2537] text-white border border-blue-400/40 shadow-sm'
                    : tab.highlight
                    ? 'bg-blue-900/40 text-blue-200 hover:bg-blue-800/60 border border-blue-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-blue-400'
                      : tab.highlight
                      ? 'text-amber-300'
                      : 'text-slate-400'
                  }`}
                />
                <div className="text-left">
                  <div className="font-semibold whitespace-nowrap flex items-center gap-1.5">
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-sans">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-normal leading-tight hidden md:block">
                    {tab.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
