export type RatingValue = 1 | 2 | 3 | 4 | 5;

export interface AssessmentAnswer {
  questionId: number;
  competencyId: number;
  rating: RatingValue;
}

export interface CompetencyMeta {
  id: number;
  title: string;
  type: 'Critical' | 'Supporting';
  weight: number; // e.g. 0.15 for 15%
  multiplier: number;
  evaluates: string;
  realityCheck: string;
  reflectionQuestions: string[];
  connectedTools: string[];
  exerciseTitle: string;
  exercisePrompt: string;
  quote: string;
  fiveBehaviors: string[];
}

export interface Question {
  id: number;
  competencyId: number;
  statement: string;
}

export type ScoreClassification =
  | 'Signature Strength'
  | 'Effective'
  | 'Inconsistent'
  | 'Development Priority'
  | 'Immediate Attention';

export interface CompetencyScoreResult {
  competencyId: number;
  title: string;
  type: 'Critical' | 'Supporting';
  average: number;
  weightedPoints: number;
  classification: ScoreClassification;
}

export type ProfileName =
  | 'Consistent Leadership Model'
  | 'Effective Leader with a Focused Opportunity'
  | 'Capable but Inconsistent Manager'
  | 'Developing Manager'
  | 'Leadership Reset Required';

export interface ProfileResult {
  provisionalProfile: ProfileName;
  finalProfile: ProfileName;
  weightedScore: number;
  safeguardTriggered: boolean;
  safeguardReason?: string;
  criticalGaps: string[];
}

export interface PriorityPlannerState {
  initialShortlist: number[]; // Competency IDs (up to 3)
  impactCheck: Record<number, 'High' | 'Moderate' | 'Low' | 'Critical safeguard'>;
  impactNotes: Record<number, { frequency: string; ifNothingChanges: string }>;
  selectedCompetencyId: number | null;
  currentPattern: string;
  trigger: string;
  rootCause: string;
  behaviorToExperience: string;
  priorityStatementWhen: string;
  priorityStatementWill: string;
  priorityStatementSoThat: string;
  finalPriorityStatement: string;
  evidenceToCollect: string;
  supportNeeded: string;
  accountabilityPartner: string;
  reviewRhythm: string;
  startDate: string;
  reassessmentDate: string;
  meaningfulProgressDescription: string;
}

// Toolkits state structures
export interface VisibilityPlanEntry {
  day: string;
  criticalWindow: string;
  action: string;
  evidence: string;
}

export interface FollowThroughEntry {
  id: string;
  date: string;
  commitment: string;
  personOrTeam: string;
  due: string;
  status: 'Open' | 'Pending' | 'Closed';
  evidence: string;
}

export interface HuddlePriority {
  priority: string;
  successLooksLike: string;
  owner: string;
  riskSupport: string;
}

export interface ShiftHandoffItem {
  id: string;
  openIssue: string;
  currentStatus: string;
  owner: string;
  nextAction: string;
  deadline: string;
  whoNeedsUpdate: string;
}

export interface CoachingLogItem {
  id: string;
  date: string;
  employeeName: string;
  gapOrExpectation: string;
  employeeCommitment: string;
  managerSupport: string;
  followUpDate: string;
  resultNextStep: string;
}

export interface WorkloadAuditEntry {
  id: string;
  task: string;
  frequency: string;
  timeUsed: string;
  decision: 'RETAIN' | 'DELEGATE' | 'DEVELOP' | 'REDUCE';
  why: string;
}

export interface TalentReviewEntry {
  id: string;
  employeeName: string;
  strength: string;
  developmentNeed: string;
  careerInterest: string;
  retentionRisk: 'Low' | 'Medium' | 'High';
  nextConversation: string;
}

export interface OperationalWalkEntry {
  id: string;
  areaRoutine: string;
  observableStandard: string;
  whatObserved: string;
  gapRisk: string;
  ownerFollowUp: string;
}

export interface KPICardItem {
  id: string;
  measure: string;
  definition: string;
  target: string;
  actual: string;
  gap: string;
  trend: 'Up' | 'Down' | 'Flat';
  owner: string;
}

export interface ToolkitsDataState {
  // Toolkit 1
  visibilityGoal: string;
  visibilityWeekOf: string;
  visibilitySchedule: VisibilityPlanEntry[];
  followThroughLog: FollowThroughEntry[];
  personalAccountability: {
    whatHappened: string;
    withinControl: string;
    outsideControl: string;
    impactOnTeam: string;
    repairAction: string;
    preventRepeat: string;
    statementToCommunicate: string;
  };
  // Toolkit 2
  huddlePlanner: {
    dateShift: string;
    location: string;
    leader: string;
    priorities: HuddlePriority[];
    followUpQuestions: string;
  };
  shiftHandoffs: ShiftHandoffItem[];
  // Toolkit 3
  concernsTracker: Array<{
    id: string;
    date: string;
    employee: string;
    concern: string;
    category: 'ACT NOW' | 'PLAN' | 'ESCALATE' | 'CLARIFY';
    ownerAction: string;
    nextUpdate: string;
    closed: boolean;
  }>;
  // Toolkit 4
  coachingLogs: CoachingLogItem[];
  // Toolkit 5
  workloadAudits: WorkloadAuditEntry[];
  // Toolkit 6
  talentReviews: TalentReviewEntry[];
  // Toolkit 7
  operationalWalks: OperationalWalkEntry[];
  // Toolkit 8
  kpiScorecard: KPICardItem[];
}

export interface ReassessmentWeeklyReview {
  week: number;
  practiceFocus: string;
  progressAndEvidence: string;
  barrier: string;
  nextAction: string;
}

export interface ReassessmentState {
  originalScore: number;
  day30Score: number;
  weeklyReviews: ReassessmentWeeklyReview[];
  behaviorImprovedMost: string;
  measurableEvidence: string;
  whatEmployeesExperienced: string;
  mostEffectiveAction: string;
  whatRemainsInconsistent: string;
  continueOrSelectNew: string;
  managerSignature: string;
  signatureDate: string;
  accountabilityPartner: string;
  reviewDate: string;
}

export interface AppState {
  managerName: string;
  managerTitle: string;
  organization: string;
  answers: Record<number, RatingValue>;
  priorityPlanner: PriorityPlannerState;
  toolkitsState: ToolkitsDataState;
  reassessmentState: ReassessmentState;
  activeTab:
    | 'start-here'
    | 'framework'
    | 'assessment'
    | 'results'
    | 'priority'
    | 'toolkits'
    | 'reassessment'
    | 'ai-coach';
  selectedToolkitId: number;
}
