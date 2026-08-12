import React, { useState } from 'react';
import {
  Wrench,
  Calendar,
  CheckSquare,
  Clock,
  MessageSquare,
  UserCheck,
  TrendingUp,
  Plus,
  Trash2,
  Sparkles,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { COMPETENCIES } from '../data/assessmentData';
import { AppState, ToolkitsDataState } from '../types';

interface ToolkitsViewProps {
  state: AppState;
  onUpdateState: (updater: (prev: AppState) => AppState) => void;
  selectedToolkitId: number;
  onSelectToolkit: (id: number) => void;
  onOpenAICoach: () => void;
}

export const ToolkitsView: React.FC<ToolkitsViewProps> = ({
  state,
  onUpdateState,
  selectedToolkitId,
  onSelectToolkit,
  onOpenAICoach,
}) => {
  const tState = state.toolkitsState;
  const currentComp = COMPETENCIES.find((c) => c.id === selectedToolkitId) || COMPETENCIES[0];

  const handleUpdateToolkits = (updater: (prev: ToolkitsDataState) => ToolkitsDataState) => {
    onUpdateState((prev) => ({
      ...prev,
      toolkitsState: updater(prev.toolkitsState),
    }));
  };

  // Helper additions for lists
  const handleAddFollowThrough = () => {
    const newItem = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      commitment: 'New commitment / next step',
      personOrTeam: 'Team member',
      due: 'Tomorrow',
      status: 'Open' as const,
      evidence: '',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      followThroughLog: [newItem, ...prev.followThroughLog],
    }));
  };

  const handleAddHandoff = () => {
    const newItem = {
      id: Date.now().toString(),
      openIssue: 'New operational issue / handoff fact',
      currentStatus: 'In progress',
      owner: 'Shift Supervisor',
      nextAction: 'Verify resolution',
      deadline: 'Next shift',
      whoNeedsUpdate: 'Incoming Manager',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      shiftHandoffs: [newItem, ...prev.shiftHandoffs],
    }));
  };

  const handleAddCoachingLog = () => {
    const newItem = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      employeeName: 'Employee',
      gapOrExpectation: 'Performance expectation gap',
      employeeCommitment: 'Agreed action',
      managerSupport: 'Support promised',
      followUpDate: 'In 7 days',
      resultNextStep: 'Pending review',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      coachingLogs: [newItem, ...prev.coachingLogs],
    }));
  };

  const handleAddWorkloadAudit = () => {
    const newItem = {
      id: Date.now().toString(),
      task: 'New task or responsibility',
      frequency: 'Daily',
      timeUsed: '1 hr',
      decision: 'DELEGATE' as const,
      why: 'Develop team capability',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      workloadAudits: [newItem, ...prev.workloadAudits],
    }));
  };

  const handleAddTalentReview = () => {
    const newItem = {
      id: Date.now().toString(),
      employeeName: 'Team Member',
      strength: 'Key strength',
      developmentNeed: 'Growth focus',
      careerInterest: 'Aspirations',
      retentionRisk: 'Low' as const,
      nextConversation: 'Next week 1-on-1',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      talentReviews: [newItem, ...prev.talentReviews],
    }));
  };

  const handleAddWalkRecord = () => {
    const newItem = {
      id: Date.now().toString(),
      areaRoutine: 'Work Station / Routine',
      observableStandard: 'Standard description',
      whatObserved: 'Direct observation',
      gapRisk: 'Identified gap',
      ownerFollowUp: 'Assigned owner',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      operationalWalks: [newItem, ...prev.operationalWalks],
    }));
  };

  const handleAddKPICard = () => {
    const newItem = {
      id: Date.now().toString(),
      measure: 'New KPI Measure',
      definition: 'Measurement definition',
      target: '100%',
      actual: '95%',
      gap: '-5%',
      trend: 'Up' as const,
      owner: 'Manager',
    };
    handleUpdateToolkits((prev) => ({
      ...prev,
      kpiScorecard: [newItem, ...prev.kpiScorecard],
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-[#0F2537] text-white rounded-xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-900 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              CONNECTED COMPETENCY TOOLKITS
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold">
              TOOLKIT {selectedToolkitId}: {currentComp.title.toUpperCase()}
            </h1>
            <p className="text-xs text-blue-200 mt-1">
              {currentComp.evaluates}
            </p>
          </div>

          <button
            onClick={onOpenAICoach}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 shadow self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Toolkit Assistant</span>
          </button>
        </div>

        {/* Toolkit Selector Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {COMPETENCIES.map((c) => {
            const isSelected = c.id === selectedToolkitId;
            return (
              <button
                key={c.id}
                onClick={() => onSelectToolkit(c.id)}
                className={`p-2 rounded-lg text-center text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md ring-2 ring-blue-400/30'
                    : 'bg-[#112A46] text-slate-300 hover:bg-slate-800 border-blue-900'
                }`}
              >
                <div className="text-[10px] text-blue-300 font-mono">TK {c.id}</div>
                <div className="truncate text-[11px] mt-0.5">{c.title.split(' ')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 Core Behaviors Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-3">
        <div className="text-xs font-bold text-blue-900 uppercase tracking-wider">
          THE FIVE {currentComp.title.toUpperCase()} BEHAVIORS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {currentComp.fiveBehaviors.map((b, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center font-bold text-xs text-slate-900 flex items-center justify-center space-x-2 shadow-2xs"
            >
              <span className="w-5 h-5 rounded-full bg-[#0F2537] text-white text-[10px] flex items-center justify-center font-mono">
                {idx + 1}
              </span>
              <span className="text-[11px] uppercase tracking-wide">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RENDER TOOLKIT SPECIFIC FORMS */}

      {/* TOOLKIT 1: Leadership Presence & Credibility */}
      {selectedToolkitId === 1 && (
        <div className="space-y-6">
          {/* Manager Visibility Planner */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 1 | PAGE 5
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  MANAGER VISIBILITY PLANNER
                </h3>
              </div>
              <Calendar className="w-5 h-5 text-blue-900" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 uppercase block mb-1">
                  WEEK OF
                </label>
                <input
                  type="date"
                  value={tState.visibilityWeekOf}
                  onChange={(e) =>
                    handleUpdateToolkits((prev) => ({
                      ...prev,
                      visibilityWeekOf: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 uppercase block mb-1">
                  PRIMARY VISIBILITY GOAL
                </label>
                <input
                  type="text"
                  value={tState.visibilityGoal}
                  onChange={(e) =>
                    handleUpdateToolkits((prev) => ({
                      ...prev,
                      visibilityGoal: e.target.value,
                    }))
                  }
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs outline-none"
                />
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5 rounded-tl">Day</th>
                    <th className="p-2.5">Critical Window / Location</th>
                    <th className="p-2.5">Visible Leadership Action</th>
                    <th className="p-2.5 rounded-tr">Employee Need / Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.visibilitySchedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-bold text-slate-900">{row.day}</td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={row.criticalWindow}
                          onChange={(e) => {
                            const newSched = [...tState.visibilitySchedule];
                            newSched[idx].criticalWindow = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              visibilitySchedule: newSched,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={row.action}
                          onChange={(e) => {
                            const newSched = [...tState.visibilitySchedule];
                            newSched[idx].action = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              visibilitySchedule: newSched,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={row.evidence}
                          onChange={(e) => {
                            const newSched = [...tState.visibilitySchedule];
                            newSched[idx].evidence = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              visibilitySchedule: newSched,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Follow-Through Tracker */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 1 | PAGE 6
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  FOLLOW-THROUGH TRACKER
                </h3>
              </div>
              <button
                onClick={handleAddFollowThrough}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Commitment</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Commitment / Next Step</th>
                    <th className="p-2.5">Person or Team</th>
                    <th className="p-2.5">Due</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Close-Loop Evidence</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.followThroughLog.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2 text-slate-600">{item.date}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.commitment}
                          onChange={(e) => {
                            const newLog = [...tState.followThroughLog];
                            newLog[idx].commitment = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              followThroughLog: newLog,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.personOrTeam}
                          onChange={(e) => {
                            const newLog = [...tState.followThroughLog];
                            newLog[idx].personOrTeam = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              followThroughLog: newLog,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.due}
                          onChange={(e) => {
                            const newLog = [...tState.followThroughLog];
                            newLog[idx].due = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              followThroughLog: newLog,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={item.status}
                          onChange={(e) => {
                            const newLog = [...tState.followThroughLog];
                            newLog[idx].status = e.target.value as any;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              followThroughLog: newLog,
                            }));
                          }}
                          className="bg-slate-50 border border-slate-200 rounded p-1 text-xs font-bold"
                        >
                          <option value="Open">Open</option>
                          <option value="Pending">Pending</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.evidence}
                          onChange={(e) => {
                            const newLog = [...tState.followThroughLog];
                            newLog[idx].evidence = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              followThroughLog: newLog,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              followThroughLog: prev.followThroughLog.filter(
                                (i) => i.id !== item.id
                              ),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TOOLKIT 2: Communication & Expectations */}
      {selectedToolkitId === 2 && (
        <div className="space-y-6">
          {/* Daily Shift Huddle Planner */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 2 | PAGE 5
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  DAILY SHIFT HUDDLE PLANNER
                </h3>
              </div>
              <Clock className="w-5 h-5 text-blue-900" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-800 uppercase block mb-1">DATE / SHIFT</label>
                <input
                  type="text"
                  value={tState.huddlePlanner.dateShift}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleUpdateToolkits((prev) => ({
                      ...prev,
                      huddlePlanner: { ...prev.huddlePlanner, dateShift: val },
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 uppercase block mb-1">TEAM / LOCATION</label>
                <input
                  type="text"
                  value={tState.huddlePlanner.location}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleUpdateToolkits((prev) => ({
                      ...prev,
                      huddlePlanner: { ...prev.huddlePlanner, location: val },
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 uppercase block mb-1">HUDDLE LEADER</label>
                <input
                  type="text"
                  value={tState.huddlePlanner.leader}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleUpdateToolkits((prev) => ({
                      ...prev,
                      huddlePlanner: { ...prev.huddlePlanner, leader: val },
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs"
                />
              </div>
            </div>

            {/* 3 Priorities Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase">
                TODAY'S THREE PRIORITIES
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0F2537] text-white">
                      <th className="p-2.5">Priority</th>
                      <th className="p-2.5">What Success Looks Like</th>
                      <th className="p-2.5">Owner(s)</th>
                      <th className="p-2.5">Known Risk / Support Needed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {tState.huddlePlanner.priorities.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 font-bold text-slate-900">Priority {idx + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={p.successLooksLike}
                            onChange={(e) => {
                              const newP = [...tState.huddlePlanner.priorities];
                              newP[idx].successLooksLike = e.target.value;
                              handleUpdateToolkits((prev) => ({
                                ...prev,
                                huddlePlanner: { ...prev.huddlePlanner, priorities: newP },
                              }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={p.owner}
                            onChange={(e) => {
                              const newP = [...tState.huddlePlanner.priorities];
                              newP[idx].owner = e.target.value;
                              handleUpdateToolkits((prev) => ({
                                ...prev,
                                huddlePlanner: { ...prev.huddlePlanner, priorities: newP },
                              }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            value={p.riskSupport}
                            onChange={(e) => {
                              const newP = [...tState.huddlePlanner.priorities];
                              newP[idx].riskSupport = e.target.value;
                              handleUpdateToolkits((prev) => ({
                                ...prev,
                                huddlePlanner: { ...prev.huddlePlanner, priorities: newP },
                              }));
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Shift Handoff Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 2 | PAGE 6
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  SHIFT-HANDOFF COMMUNICATION FORM
                </h3>
              </div>
              <button
                onClick={handleAddHandoff}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Handoff Fact</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Open Issue / Fact</th>
                    <th className="p-2.5">Current Status</th>
                    <th className="p-2.5">Owner</th>
                    <th className="p-2.5">Next Action</th>
                    <th className="p-2.5">Deadline</th>
                    <th className="p-2.5">Who Needs Update</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.shiftHandoffs.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.openIssue}
                          onChange={(e) => {
                            const newH = [...tState.shiftHandoffs];
                            newH[idx].openIssue = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: newH,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.currentStatus}
                          onChange={(e) => {
                            const newH = [...tState.shiftHandoffs];
                            newH[idx].currentStatus = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: newH,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.owner}
                          onChange={(e) => {
                            const newH = [...tState.shiftHandoffs];
                            newH[idx].owner = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: newH,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.nextAction}
                          onChange={(e) => {
                            const newH = [...tState.shiftHandoffs];
                            newH[idx].nextAction = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: newH,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.deadline}
                          onChange={(e) => {
                            const newH = [...tState.shiftHandoffs];
                            newH[idx].deadline = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: newH,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.whoNeedsUpdate}
                          onChange={(e) => {
                            const newH = [...tState.shiftHandoffs];
                            newH[idx].whoNeedsUpdate = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: newH,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              shiftHandoffs: prev.shiftHandoffs.filter((i) => i.id !== item.id),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TOOLKIT 4: Coaching & Accountability */}
      {selectedToolkitId === 4 && (
        <div className="space-y-6">
          {/* Performance Gap Diagnostic */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 4 | PAGE 3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  PERFORMANCE GAP DIAGNOSTIC
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-lg space-y-1">
                <div className="font-bold text-blue-900 uppercase">1. CLARITY</div>
                <p className="text-slate-700">Was the expectation specific and connected to a deadline or standard?</p>
                <p className="text-[10px] font-semibold text-blue-900 italic">First Response: Reset expectations & confirm understanding.</p>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-lg space-y-1">
                <div className="font-bold text-slate-900 uppercase">2. CAPABILITY</div>
                <p className="text-slate-700">Does the employee know how and have enough practice to perform?</p>
                <p className="text-[10px] font-semibold text-slate-900 italic">First Response: Coach, demonstrate, practice & observe.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-lg space-y-1">
                <div className="font-bold text-amber-900 uppercase">3. CAPACITY / RESOURCES</div>
                <p className="text-slate-700">Do time, staffing, tools or workflow block performance?</p>
                <p className="text-[10px] font-semibold text-amber-900 italic">First Response: Remove or escalate the operational barrier.</p>
              </div>

              <div className="bg-red-50 border border-red-200 p-3.5 rounded-lg space-y-1">
                <div className="font-bold text-red-900 uppercase">4. COMMITMENT</div>
                <p className="text-slate-700">Could the employee perform but chose not to follow the expectation?</p>
                <p className="text-[10px] font-semibold text-red-900 italic">First Response: Hold an accountability conversation.</p>
              </div>
            </div>
          </div>

          {/* Coaching Log */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 4 | PAGE 7
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  COACHING AND FOLLOW-UP LOG
                </h3>
              </div>
              <button
                onClick={handleAddCoachingLog}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Coaching Record</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Date</th>
                    <th className="p-2.5">Employee</th>
                    <th className="p-2.5">Gap / Expectation</th>
                    <th className="p-2.5">Employee Commitment</th>
                    <th className="p-2.5">Manager Support</th>
                    <th className="p-2.5">Follow-Up</th>
                    <th className="p-2.5">Result / Next Step</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.coachingLogs.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2 text-slate-600">{item.date}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.employeeName}
                          onChange={(e) => {
                            const newC = [...tState.coachingLogs];
                            newC[idx].employeeName = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: newC,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.gapOrExpectation}
                          onChange={(e) => {
                            const newC = [...tState.coachingLogs];
                            newC[idx].gapOrExpectation = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: newC,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.employeeCommitment}
                          onChange={(e) => {
                            const newC = [...tState.coachingLogs];
                            newC[idx].employeeCommitment = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: newC,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.managerSupport}
                          onChange={(e) => {
                            const newC = [...tState.coachingLogs];
                            newC[idx].managerSupport = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: newC,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.followUpDate}
                          onChange={(e) => {
                            const newC = [...tState.coachingLogs];
                            newC[idx].followUpDate = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: newC,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.resultNextStep}
                          onChange={(e) => {
                            const newC = [...tState.coachingLogs];
                            newC[idx].resultNextStep = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: newC,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              coachingLogs: prev.coachingLogs.filter((i) => i.id !== item.id),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TOOLKIT 5: Delegation & Time Management */}
      {selectedToolkitId === 5 && (
        <div className="space-y-6">
          {/* Workload Audit */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 5 | PAGE 3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  WORKLOAD AND TIME AUDIT (Four Decisions)
                </h3>
              </div>
              <button
                onClick={handleAddWorkloadAudit}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Task Audit</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Task or Responsibility</th>
                    <th className="p-2.5">Frequency</th>
                    <th className="p-2.5">Time Used</th>
                    <th className="p-2.5">Decision</th>
                    <th className="p-2.5">Why / Reasoning</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.workloadAudits.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.task}
                          onChange={(e) => {
                            const newW = [...tState.workloadAudits];
                            newW[idx].task = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              workloadAudits: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.frequency}
                          onChange={(e) => {
                            const newW = [...tState.workloadAudits];
                            newW[idx].frequency = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              workloadAudits: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.timeUsed}
                          onChange={(e) => {
                            const newW = [...tState.workloadAudits];
                            newW[idx].timeUsed = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              workloadAudits: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={item.decision}
                          onChange={(e) => {
                            const newW = [...tState.workloadAudits];
                            newW[idx].decision = e.target.value as any;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              workloadAudits: newW,
                            }));
                          }}
                          className="bg-slate-50 border border-slate-200 rounded p-1 text-xs font-bold"
                        >
                          <option value="RETAIN">RETAIN (Manager Only)</option>
                          <option value="DELEGATE">DELEGATE (Ready Now)</option>
                          <option value="DEVELOP">DEVELOP (Stretch Goal)</option>
                          <option value="REDUCE">REDUCE (Stop/Simplify)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.why}
                          onChange={(e) => {
                            const newW = [...tState.workloadAudits];
                            newW[idx].why = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              workloadAudits: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              workloadAudits: prev.workloadAudits.filter((i) => i.id !== item.id),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TOOLKIT 6: Employee Development & Retention */}
      {selectedToolkitId === 6 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 6 | PAGE 3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  TEAM TALENT REVIEW
                </h3>
              </div>
              <button
                onClick={handleAddTalentReview}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Employee Review</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Employee</th>
                    <th className="p-2.5">Demonstrated Strength</th>
                    <th className="p-2.5">Development Need</th>
                    <th className="p-2.5">Career Interest</th>
                    <th className="p-2.5">Retention Risk</th>
                    <th className="p-2.5">Next Conversation</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.talentReviews.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.employeeName}
                          onChange={(e) => {
                            const newT = [...tState.talentReviews];
                            newT[idx].employeeName = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: newT,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.strength}
                          onChange={(e) => {
                            const newT = [...tState.talentReviews];
                            newT[idx].strength = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: newT,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.developmentNeed}
                          onChange={(e) => {
                            const newT = [...tState.talentReviews];
                            newT[idx].developmentNeed = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: newT,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.careerInterest}
                          onChange={(e) => {
                            const newT = [...tState.talentReviews];
                            newT[idx].careerInterest = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: newT,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={item.retentionRisk}
                          onChange={(e) => {
                            const newT = [...tState.talentReviews];
                            newT[idx].retentionRisk = e.target.value as any;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: newT,
                            }));
                          }}
                          className="bg-slate-50 border border-slate-200 rounded p-1 text-xs font-bold"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.nextConversation}
                          onChange={(e) => {
                            const newT = [...tState.talentReviews];
                            newT[idx].nextConversation = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: newT,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              talentReviews: prev.talentReviews.filter((i) => i.id !== item.id),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TOOLKIT 7: Operational Execution */}
      {selectedToolkitId === 7 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 7 | PAGE 3
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  MANAGER OPERATIONAL WALK RECORD
                </h3>
              </div>
              <button
                onClick={handleAddWalkRecord}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Walk Observation</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Area / Routine</th>
                    <th className="p-2.5">Observable Standard</th>
                    <th className="p-2.5">What I Observed</th>
                    <th className="p-2.5">Gap / Risk</th>
                    <th className="p-2.5">Owner / Follow-Up</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.operationalWalks.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.areaRoutine}
                          onChange={(e) => {
                            const newW = [...tState.operationalWalks];
                            newW[idx].areaRoutine = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              operationalWalks: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.observableStandard}
                          onChange={(e) => {
                            const newW = [...tState.operationalWalks];
                            newW[idx].observableStandard = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              operationalWalks: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.whatObserved}
                          onChange={(e) => {
                            const newW = [...tState.operationalWalks];
                            newW[idx].whatObserved = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              operationalWalks: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.gapRisk}
                          onChange={(e) => {
                            const newW = [...tState.operationalWalks];
                            newW[idx].gapRisk = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              operationalWalks: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.ownerFollowUp}
                          onChange={(e) => {
                            const newW = [...tState.operationalWalks];
                            newW[idx].ownerFollowUp = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              operationalWalks: newW,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              operationalWalks: prev.operationalWalks.filter(
                                (i) => i.id !== item.id
                              ),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TOOLKIT 8: Business & Results Leadership */}
      {(selectedToolkitId === 8 || (selectedToolkitId !== 1 && selectedToolkitId !== 2 && selectedToolkitId !== 4 && selectedToolkitId !== 5 && selectedToolkitId !== 6 && selectedToolkitId !== 7)) && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  TOOLKIT 8 | PAGE 4
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  WEEKLY KPI SCORECARD
                </h3>
              </div>
              <button
                onClick={handleAddKPICard}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add KPI Measure</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0F2537] text-white">
                    <th className="p-2.5">Measure / KPI</th>
                    <th className="p-2.5">Definition</th>
                    <th className="p-2.5">Target</th>
                    <th className="p-2.5">Actual</th>
                    <th className="p-2.5">Gap</th>
                    <th className="p-2.5">Trend</th>
                    <th className="p-2.5">Owner</th>
                    <th className="p-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {tState.kpiScorecard.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.measure}
                          onChange={(e) => {
                            const newK = [...tState.kpiScorecard];
                            newK[idx].measure = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: newK,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.definition}
                          onChange={(e) => {
                            const newK = [...tState.kpiScorecard];
                            newK[idx].definition = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: newK,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.target}
                          onChange={(e) => {
                            const newK = [...tState.kpiScorecard];
                            newK[idx].target = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: newK,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.actual}
                          onChange={(e) => {
                            const newK = [...tState.kpiScorecard];
                            newK[idx].actual = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: newK,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 font-mono font-bold text-slate-900">
                        {item.gap}
                      </td>
                      <td className="p-2">
                        <select
                          value={item.trend}
                          onChange={(e) => {
                            const newK = [...tState.kpiScorecard];
                            newK[idx].trend = e.target.value as any;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: newK,
                            }));
                          }}
                          className="bg-slate-50 border border-slate-200 rounded p-1 text-xs font-bold"
                        >
                          <option value="Up">Up ▲</option>
                          <option value="Down">Down ▼</option>
                          <option value="Flat">Flat ➔</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.owner}
                          onChange={(e) => {
                            const newK = [...tState.kpiScorecard];
                            newK[idx].owner = e.target.value;
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: newK,
                            }));
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded p-1 text-xs"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => {
                            handleUpdateToolkits((prev) => ({
                              ...prev,
                              kpiScorecard: prev.kpiScorecard.filter((i) => i.id !== item.id),
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
