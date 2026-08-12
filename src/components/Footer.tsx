import React from 'react';
import { Lock } from 'lucide-react';
import { AppState } from '../types';

interface FooterProps {
  onSelectTab: (tab: AppState['activeTab']) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-[#0F2537] text-white border-t border-blue-900 mt-12 py-8 px-4 sm:px-6 lg:px-8 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#112A46] border border-blue-800 p-2 rounded-lg">
            <Lock className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-white uppercase font-sans">
              UnLocked Business Solutions
            </div>
            <div className="text-[11px] text-blue-300">
              UNLOCKED MANAGER SUCCESS SYSTEM — EXISTING MANAGER EDITION
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center md:text-right">
          <div className="text-amber-400 font-bold tracking-wider uppercase text-xs">
            LEADERSHIP IS DEMONSTRATED THROUGH CONSISTENT BEHAVIOR.
          </div>
          <div className="text-slate-400 text-[10px] mt-1">
            End-User Development Package © {new Date().getFullYear()} UnLocked Business Solutions. Created by Randy Locke.
          </div>
        </div>
      </div>
    </footer>
  );
};
