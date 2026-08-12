import { AppState, ToolkitsDataState, ReassessmentState, PriorityPlannerState } from '../types';

const STORAGE_KEY = 'unlocked_manager_success_system_v1';

export const initialToolkitsState: ToolkitsDataState = {
  visibilityGoal: 'Remain visible and available during peak lunch rush',
  visibilityWeekOf: new Date().toISOString().split('T')[0],
  visibilitySchedule: [
    { day: 'Monday', criticalWindow: '11:00 AM - 1:00 PM', action: 'Purposeful floor walk & team check-in', evidence: 'Spoke with 4 team members' },
    { day: 'Tuesday', criticalWindow: '2:00 PM - 3:00 PM', action: 'Mid-shift huddle', evidence: 'Shared daily KPI progress' },
    { day: 'Wednesday', criticalWindow: '11:30 AM - 1:30 PM', action: 'Direct observation & coaching', evidence: 'Observed speed-of-service steps' },
    { day: 'Thursday', criticalWindow: '4:00 PM - 5:00 PM', action: 'Shift handoff review', evidence: 'Verified completion checklist' },
    { day: 'Friday', criticalWindow: '12:00 PM - 2:00 PM', action: 'Floor leadership support', evidence: 'Helped resolve bottleneck' },
  ],
  followThroughLog: [
    { id: '1', date: new Date().toISOString().split('T')[0], commitment: 'Order extra prep supplies for Friday', personOrTeam: 'Kitchen Team', due: 'Thursday 10 AM', status: 'Closed', evidence: 'Items delivered and confirmed' },
  ],
  personalAccountability: {
    whatHappened: '',
    withinControl: '',
    outsideControl: '',
    impactOnTeam: '',
    repairAction: '',
    preventRepeat: '',
    statementToCommunicate: '',
  },
  huddlePlanner: {
    dateShift: new Date().toISOString().split('T')[0],
    location: 'Main Store / Shift A',
    leader: 'Randy Locke',
    priorities: [
      { priority: 'Order Accuracy & Verification', successLooksLike: '100% item check before handoff', owner: 'Front Team', riskSupport: 'New register staff' },
      { priority: 'Speed of Service', successLooksLike: '< 3 minute average drive-thru', owner: 'Prep & Window', riskSupport: 'Peak traffic expected' },
      { priority: 'Safety & Cleanliness', successLooksLike: 'Clean workstations hourly', owner: 'Shift Lead', riskSupport: 'High volume' },
    ],
    followUpQuestions: 'Did everyone understand the top 3 priorities?',
  },
  shiftHandoffs: [
    { id: '1', openIssue: 'Cooler temp check pending', currentStatus: 'Recorded 38F', owner: 'John', nextAction: 'Re-verify at 4 PM', deadline: '4:00 PM', whoNeedsUpdate: 'PM Shift Manager' }
  ],
  concernsTracker: [
    { id: '1', date: new Date().toISOString().split('T')[0], employee: 'Sarah M.', concern: 'Need clearer shift scheduling notice', category: 'PLAN', ownerAction: 'Post schedule 14 days in advance', nextUpdate: 'Next Monday', closed: false }
  ],
  coachingLogs: [
    { id: '1', date: new Date().toISOString().split('T')[0], employeeName: 'Marcus T.', gapOrExpectation: 'Missed station closing checklist', employeeCommitment: 'Use printed checklist before clocking out', managerSupport: 'Provided laminate checklist at station', followUpDate: 'In 5 days', resultNextStep: 'Completed checklist 3 days straight' }
  ],
  workloadAudits: [
    { id: '1', task: 'Weekly inventory count', frequency: 'Weekly', timeUsed: '3 hrs', decision: 'DELEGATE', why: 'Train Shift Supervisor to build capability' },
    { id: '2', task: 'Monthly budget forecast', frequency: 'Monthly', timeUsed: '2 hrs', decision: 'RETAIN', why: 'Manager accountability and final financial sign-off' }
  ],
  talentReviews: [
    { id: '1', employeeName: 'David K.', strength: 'High speed & reliability', developmentNeed: 'Delegation & communication', careerInterest: 'Assistant Manager', retentionRisk: 'Low', nextConversation: 'Next Thursday 1-on-1' }
  ],
  operationalWalks: [
    { id: '1', areaRoutine: 'Opening Prep Station', observableStandard: 'All items stocked, date labels checked', whatObserved: '2 labels missing', gapRisk: 'Food safety compliance', ownerFollowUp: 'Re-train opener on labeling standard' }
  ],
  kpiScorecard: [
    { id: '1', measure: 'Customer Satisfaction Score', definition: '% positive surveys', target: '92%', actual: '89%', gap: '-3%', trend: 'Up', owner: 'Store Manager' },
    { id: '2', measure: 'Speed of Service (sec)', definition: 'Average time per order', target: '180s', actual: '195s', gap: '+15s', trend: 'Down', owner: 'Shift Supervisor' }
  ]
};

export const initialPriorityPlannerState: PriorityPlannerState = {
  initialShortlist: [1, 2, 4],
  impactCheck: {
    1: 'High',
    2: 'Moderate',
    4: 'Critical safeguard'
  },
  impactNotes: {
    1: { frequency: 'Daily during peak hours', ifNothingChanges: 'Employee confusion and uneven customer support' },
    2: { frequency: 'Shift transitions', ifNothingChanges: 'Lost information between morning and night shifts' },
    4: { frequency: 'Weekly feedback', ifNothingChanges: 'Performance gaps go unaddressed until frustration builds' }
  },
  selectedCompetencyId: 1,
  currentPattern: 'I tend to stay in my office during stressful rushes to handle administrative emails.',
  trigger: 'High customer volume combined with understaffed shift.',
  rootCause: 'Belief that administrative tasks are my primary job and fear of getting in employees\' way.',
  behaviorToExperience: 'I will remain on the floor during peak rushes, conducting 2 purposeful check-ins to support the team.',
  priorityStatementWhen: 'When the operation becomes demanding during peak hours',
  priorityStatementWill: 'I will conduct two purposeful team check-ins and remain visibly available',
  priorityStatementSoThat: 'so that employees experience consistent leadership support and clear direction.',
  finalPriorityStatement: 'When the operation becomes demanding during peak hours, I will conduct two purposeful team check-ins and remain visibly available so that employees experience consistent leadership support and clear direction.',
  evidenceToCollect: 'Completed visibility plans, floor observation notes, employee feedback during huddles.',
  supportNeeded: 'Manager Visibility Planner & Weekly Leadership Reflection tool.',
  accountabilityPartner: 'District Manager / Peer GM',
  reviewRhythm: 'Every Friday at 4:00 PM',
  startDate: new Date().toISOString().split('T')[0],
  reassessmentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  meaningfulProgressDescription: 'Employees express confidence in shift leadership and report receiving timely support during rushes.'
};

export const initialReassessmentState: ReassessmentState = {
  originalScore: 2.80,
  day30Score: 3.80,
  weeklyReviews: [
    { week: 1, practiceFocus: 'Establish floor visibility routine during lunch peak.', progressAndEvidence: 'On floor 4 out of 5 days. Conducted check-ins.', barrier: 'Unexpected vendor delivery on Tuesday.', nextAction: 'Reschedule delivery receiving window.' },
    { week: 2, practiceFocus: 'Repeat behavior during normal and demanding rushes.', progressAndEvidence: 'Helped team navigate Friday rush seamlessly.', barrier: 'Felt rushed during shift handoff.', nextAction: 'Use Shift Handoff form religiously.' },
    { week: 3, practiceFocus: 'Gather employee feedback & refine follow-through.', progressAndEvidence: 'Ran Clarity Test with 3 team members.', barrier: 'None.', nextAction: 'Continue weekly review rhythm.' },
    { week: 4, practiceFocus: 'Stabilize behavior and prepare for reassessment.', progressAndEvidence: 'Employees noted steady manager presence.', barrier: 'None.', nextAction: 'Re-rate competency statements.' },
  ],
  behaviorImprovedMost: 'Floor visibility and immediate support during high-pressure shifts.',
  measurableEvidence: 'Visibility log completed 18/20 days; CSAT increased from 89% to 93%.',
  whatEmployeesExperienced: 'Employees felt supported, knew where to find help, and received prompt answers.',
  mostEffectiveAction: 'Pre-planning my visibility windows on the Manager Visibility Planner every Monday.',
  whatRemainsInconsistent: 'Shift handoff documentation on busy weekend evenings.',
  continueOrSelectNew: 'Maintain visibility routine as a habit, and select Coaching & Accountability as next 30-day priority.',
  managerSignature: 'Randy Locke',
  signatureDate: new Date().toISOString().split('T')[0],
  accountabilityPartner: 'Senior Area Director',
  reviewDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
};

// Default Answers (Sample baseline ratings if none provided)
export const defaultAnswers: Record<number, 1|2|3|4|5> = {
  1: 3, 2: 3, 3: 2, 4: 2, 5: 3, // Comp 1
  6: 3, 7: 3, 8: 3, 9: 2, 10: 3, // Comp 2
  11: 3, 12: 3, 13: 2, 14: 3, 15: 3, // Comp 3
  16: 2, 17: 3, 18: 2, 19: 2, 20: 3, // Comp 4
  21: 3, 22: 3, 23: 3, 24: 3, 25: 2, // Comp 5
  26: 3, 27: 3, 28: 2, 29: 2, 30: 3, // Comp 6
  31: 3, 32: 3, 33: 2, 34: 3, 35: 3, // Comp 7
  36: 4, 37: 3, 38: 3, 39: 3, 40: 3  // Comp 8
};

export const initialAppState: AppState = {
  managerName: 'Randy Locke',
  managerTitle: 'General Manager & Business Performance Strategist',
  organization: 'UnLocked Business Solutions',
  answers: defaultAnswers,
  priorityPlanner: initialPriorityPlannerState,
  toolkitsState: initialToolkitsState,
  reassessmentState: initialReassessmentState,
  activeTab: 'start-here',
  selectedToolkitId: 1,
};

export function loadAppState(): AppState {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        ...initialAppState,
        ...parsed,
        answers: { ...defaultAnswers, ...(parsed.answers || {}) },
        priorityPlanner: { ...initialPriorityPlannerState, ...(parsed.priorityPlanner || {}) },
        toolkitsState: { ...initialToolkitsState, ...(parsed.toolkitsState || {}) },
        reassessmentState: { ...initialReassessmentState, ...(parsed.reassessmentState || {}) }
      };
    }
  } catch (e) {
    console.error('Failed to load local state', e);
  }
  return initialAppState;
}

export function saveAppState(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save local state', e);
  }
}

export function resetAppState(): AppState {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset state', e);
  }
  return initialAppState;
}
