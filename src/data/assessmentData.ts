import { CompetencyMeta, Question } from '../types';

export const COMPETENCIES: CompetencyMeta[] = [
  {
    id: 1,
    title: 'Leadership Presence and Credibility',
    type: 'Critical',
    weight: 0.15,
    multiplier: 0.15,
    evaluates: 'Evaluates visibility, consistency, composure, follow-through and personal accountability.',
    realityCheck:
      'Employees judge leadership most clearly when the operation is demanding. Presence means being available, engaged and accountable - not personally completing every task.',
    reflectionQuestions: [
      'Which leadership behavior contributes most to my credibility?',
      'Under what conditions am I least visible or consistent?',
      'What would my employees say I need to do more consistently?',
      'What is one credibility-building action I will take during the next seven days?',
    ],
    connectedTools: [
      'Leadership Credibility Check',
      'Manager Visibility Planner',
      'Follow-Through Tracker',
      'Weekly Leadership Reflection',
      'Personal Accountability Review',
      'Manager Commitment Planner',
    ],
    exerciseTitle: 'Credibility Check',
    exercisePrompt:
      'Ask yourself: Do employees experience the same standards, availability and follow-through from me on a difficult day that they experience on a well-staffed, successful day?',
    quote: 'Your team watches what you consistently do, not what you occasionally say.',
    fiveBehaviors: [
      'BE VISIBLE',
      'MODEL THE STANDARD',
      'STAY COMPOSED',
      'OWN THE OUTCOME',
      'CLOSE THE LOOP',
    ],
  },
  {
    id: 2,
    title: 'Communication and Expectations',
    type: 'Supporting',
    weight: 0.10,
    multiplier: 0.10,
    evaluates: "Evaluates clarity, listening, information-sharing and the manager's ability to confirm understanding.",
    realityCheck:
      'Effective communication is measured by the clarity it creates - not merely by the information delivered.',
    reflectionQuestions: [
      'Where do employees frequently require reminders or clarification?',
      'Does every employee and shift receive the same important information?',
      'How do I respond when an employee questions a decision or raises a concern?',
      'What expectation or message do I need to clarify this week?',
    ],
    connectedTools: [
      'Team Expectations Builder',
      'Daily Shift Huddle Planner',
      'Shift-Handoff Communication Form',
      'Active Listening Guide',
      'Communication Style Planner',
      'Weekly Communication Checklist',
      'The Clarity Test',
    ],
    exerciseTitle: 'The Clarity Test',
    exercisePrompt:
      "Ask three employees separately to name the team's three most important priorities, explain how performance is measured and identify where important updates are received. Different answers may reveal inconsistent leadership communication.",
    quote: 'Clarity is one of the most valuable forms of support.',
    fiveBehaviors: [
      'MAKE PRIORITIES UNMISTAKABLE',
      'CHECK FOR UNDERSTANDING',
      'KEEP INFORMATION CONSISTENT',
      'INVITE QUESTIONS AND IDEAS',
      'ADAPT WITHOUT LOWERING THE STANDARD',
    ],
  },
  {
    id: 3,
    title: 'Trust and Employee Engagement',
    type: 'Critical',
    weight: 0.15,
    multiplier: 0.15,
    evaluates: 'Evaluates fairness, recognition, relationships, psychological safety and visible follow-through.',
    realityCheck:
      'Trust is not measured by whether employees like their manager. It is reflected in whether employees believe the manager is fair, dependable, honest and committed to helping them succeed.',
    reflectionQuestions: [
      'Which employee relationships require more attention?',
      'When did I last recognize each employee for something specific?',
      'What concerns might employees be reluctant to raise with me?',
      'Which employee may be disengaging without directly saying so?',
    ],
    connectedTools: [
      'Employee Engagement Pulse Check',
      'One-on-One Conversation Guide',
      'Employee Recognition Planner',
      'Stay-Interview Guide',
      'Concern and Follow-Up Tracker',
      '30-Day Engagement Plan',
      'Weekly Trust Checklist',
    ],
    exerciseTitle: 'Listen, Act, Close the Loop',
    exercisePrompt:
      'Ask employees what helps them perform, what makes the job harder and what management should improve. Categorize responses as Act Now, Plan, Escalate or Clarify - then communicate what will happen next.',
    quote: 'Trust grows through fairness, follow-through and respect.',
    fiveBehaviors: [
      'SHOW GENUINE INTEREST',
      'APPLY STANDARDS FAIRLY',
      'RECOGNIZE SPECIFICALLY',
      'MAKE IT SAFE TO SPEAK',
      'FOLLOW THROUGH AND CLOSE THE LOOP',
    ],
  },
  {
    id: 4,
    title: 'Coaching and Accountability',
    type: 'Critical',
    weight: 0.15,
    multiplier: 0.15,
    evaluates: 'Evaluates timely feedback, accurate diagnosis, clear expectations, ownership and follow-up.',
    realityCheck:
      'Accountability is not punishment. It ensures that employees understand the expectation, receive appropriate support and take responsibility for their choices and results.',
    reflectionQuestions: [
      'Which performance concern have I delayed addressing?',
      'Am I addressing observable behavior or making assumptions about the person?',
      'What support or training have I provided?',
      'Do I consistently complete promised follow-up conversations?',
    ],
    connectedTools: [
      'Performance Gap Diagnostic',
      'Coaching Conversation Planner',
      'Behavior-Impact-Expectation Guide',
      'Improvement Action Plan',
      'Coaching Follow-Up Tracker',
      'Manager Coaching Log',
      'Expectation and Support Agreement',
      'Accountability Conversation Guide',
    ],
    exerciseTitle: 'The Conversation Audit',
    exercisePrompt:
      'Review your last three coaching conversations. Did you provide an example, explain impact, listen, identify the cause, state the expectation, establish ownership, offer support and set a follow-up?',
    quote: 'Accountability works best when expectations and support are equally clear.',
    fiveBehaviors: [
      'DIAGNOSE BEFORE RESPONDING',
      'DESCRIBE OBSERVABLE PERFORMANCE',
      'CLARIFY THE STANDARD AND IMPACT',
      'AGREE ON ACTION, OWNERSHIP AND SUPPORT',
      'FOLLOW UP, DOCUMENT AND REINFORCE',
    ],
  },
  {
    id: 5,
    title: 'Delegation and Time Management',
    type: 'Supporting',
    weight: 0.10,
    multiplier: 0.10,
    evaluates: 'Evaluates prioritization, employee empowerment, workload ownership and development through delegation.',
    realityCheck:
      'A hands-on manager supports the operation when needed. An ineffective manager becomes so consumed by employee-level tasks that planning, coaching and follow-up remain unfinished.',
    reflectionQuestions: [
      'Which responsibilities am I holding because it feels faster to do them myself?',
      'What important leadership work is repeatedly postponed?',
      'Which employee is ready for greater responsibility?',
      'What responsibility can I delegate this week?',
    ],
    connectedTools: [
      'Manager Priority Planner',
      'Weekly Workload Audit',
      'Delegation Decision Matrix',
      'Employee Readiness Assessment',
      'Delegation Assignment Planner',
      'Follow-Up Tracker',
      'Set Authority Levels',
      'Reinvest Time Planner',
    ],
    exerciseTitle: 'One-Week Workload Audit',
    exercisePrompt:
      'Classify major activities as Lead, Manage, Support, Do or Waste. Then ask: Did my calendar reflect the responsibilities of a manager - or those of an overwhelmed individual contributor?',
    quote: 'Delegation is not giving work away; it is giving someone room to grow.',
    fiveBehaviors: [
      'AUDIT BEFORE DELEGATING',
      'MATCH RESPONSIBILITY TO READINESS',
      'DEFINE OUTCOME, AUTHORITY AND LIMITS',
      'USE CHECKPOINTS WITHOUT MICROMANAGING',
      'REINVEST TIME AND COMPLETE FOLLOW-THROUGH',
    ],
  },
  {
    id: 6,
    title: 'Employee Development and Retention',
    type: 'Supporting',
    weight: 0.10,
    multiplier: 0.10,
    evaluates: 'Evaluates talent knowledge, growth opportunities, career planning, retention awareness and promotion readiness.',
    realityCheck:
      'Potential without opportunity rarely becomes performance. Development requires practice, feedback, responsibility and follow-up.',
    reflectionQuestions: [
      'Which dependable employee might feel overlooked?',
      'Who demonstrates leadership without holding a formal title?',
      'Which employee presents the greatest retention risk?',
      'Who could reasonably become ready for greater responsibility within 90 days?',
    ],
    connectedTools: [
      'Strengths and Interests Profile',
      'Career Conversation Guide',
      'Individual Development Plan',
      'Employee Skills Matrix',
      'Promotion-Readiness Assessment',
      'Retention Risk Tracker',
      'Growth Assignment Planner',
    ],
    exerciseTitle: 'The Talent Review',
    exercisePrompt:
      'For each employee, document one strength, one development need, one career interest, one appropriate growth assignment and one follow-up date.',
    quote: 'Potential becomes performance when it is matched with opportunity.',
    fiveBehaviors: [
      'KNOW THE PERSON, NOT ONLY THE PERFORMANCE',
      'DISCUSS CAREER INTERESTS AND RETENTION EARLY',
      'TURN DEVELOPMENT NEEDS INTO PRACTICE',
      'EVALUATE READINESS WITH EVIDENCE',
      'FOLLOW THROUGH, RECOGNIZE GROWTH AND ADJUST',
    ],
  },
  {
    id: 7,
    title: 'Operational Execution',
    type: 'Critical',
    weight: 0.15,
    multiplier: 0.15,
    evaluates: 'Evaluates standards, verification, consistency, root-cause thinking, ownership and process improvement.',
    realityCheck:
      'Strong operations should not depend on one manager being present. Effective leaders create repeatable processes, capable people and clear accountability across every shift.',
    reflectionQuestions: [
      'Which operational problem continues to repeat?',
      'Where does execution differ significantly between shifts?',
      'Which expectation relies on reminders instead of a reliable process?',
      'What operational issue needs root-cause analysis this week?',
    ],
    connectedTools: [
      'Manager Operational Walk',
      'Checklist Builder',
      'Shift-Handoff Report',
      'Daily Ownership Board',
      'Root-Cause Analysis',
      'Process Improvement Planner',
    ],
    exerciseTitle: 'The Consistency Test',
    exercisePrompt:
      'Observe one important routine across different employees, shifts, managers and staffing conditions. If execution fails when one person is absent, the operation has an individual holding it together - not a reliable system.',
    quote: 'Strong systems make excellent performance repeatable.',
    fiveBehaviors: [
      'MAKE THE STANDARD OBSERVABLE',
      'ASSIGN CLEAR OWNERSHIP AND DEADLINES',
      'VERIFY THE RESULT - DO NOT ASSUME',
      'SOLVE RECURRING CAUSES, NOT SYMPTOMS',
      'BUILD SYSTEMS THAT WORK WITHOUT HEROICS',
    ],
  },
  {
    id: 8,
    title: 'Business and Results Leadership',
    type: 'Supporting',
    weight: 0.10,
    multiplier: 0.10,
    evaluates: 'Evaluates business understanding, use of data, team alignment, action planning and balanced decision-making.',
    realityCheck:
      'Business leadership requires more than knowing the numbers. Effective managers explain the story behind the numbers and turn information into focused team action.',
    reflectionQuestions: [
      'Which performance indicators do I understand most confidently?',
      'Which results do I review without taking meaningful action?',
      'Can my employees explain how their performance affects business outcomes?',
      'What result requires focused action during the next 30 days?',
    ],
    connectedTools: [
      'Weekly KPI Scorecard',
      'Balanced Performance Dashboard',
      'Results-to-Action Worksheet',
      'Business Root-Cause Analysis',
      '30-Day Business Action Plan',
      'Results Communication Planner',
    ],
    exerciseTitle: 'Tell the Story Behind the Number',
    exercisePrompt:
      'Choose one result and explain: where we are, where we need to be, why it matters, what the team can influence and what action will happen next.',
    quote: 'Numbers reveal the result; leadership discovers the reason.',
    fiveBehaviors: [
      'KNOW THE MEASURES AND WHY THEY MATTER',
      'CONNECT RESULTS TO OPERATIONAL DRIVERS',
      'TURN DATA INTO FOCUSED TEAM ACTION',
      'COMMUNICATE THE STORY BEHIND THE NUMBER',
      'BALANCE TODAY\'S RESULT WITH TOMORROW\'S HEALTH',
    ],
  },
];

export const QUESTIONS: Question[] = [
  // Competency 1
  { id: 1, competencyId: 1, statement: 'I remain visible and accessible to my employees during demanding periods.' },
  { id: 2, competencyId: 1, statement: 'My actions consistently reflect the expectations I establish for my team.' },
  { id: 3, competencyId: 1, statement: 'I remain composed and make thoughtful decisions when operations become stressful.' },
  { id: 4, competencyId: 1, statement: 'I accept responsibility for team outcomes without automatically blaming employees or circumstances.' },
  { id: 5, competencyId: 1, statement: 'My employees can rely on me to follow through on commitments and communicated next steps.' },

  // Competency 2
  { id: 6, competencyId: 2, statement: 'I communicate priorities and expectations clearly enough that employees understand what successful performance looks like.' },
  { id: 7, competencyId: 2, statement: 'I confirm understanding instead of assuming employees interpreted my instructions correctly.' },
  { id: 8, competencyId: 2, statement: 'I share important operational information promptly and consistently across employees and shifts.' },
  { id: 9, competencyId: 2, statement: 'I create opportunities for employees to ask questions, express concerns and contribute ideas without fear of being dismissed.' },
  { id: 10, competencyId: 2, statement: 'I adjust my communication style when an employee needs a different approach, while maintaining consistent expectations.' },

  // Competency 3
  { id: 11, competencyId: 3, statement: 'I demonstrate genuine interest in my employees as individuals and understand what motivates them.' },
  { id: 12, competencyId: 3, statement: 'I apply expectations and accountability consistently, regardless of my personal relationship with an employee.' },
  { id: 13, competencyId: 3, statement: 'I regularly provide specific recognition for employees\' effort, progress and results.' },
  { id: 14, competencyId: 3, statement: 'My employees can raise concerns, acknowledge mistakes or offer feedback without fearing an unnecessarily negative response.' },
  { id: 15, competencyId: 3, statement: 'I follow up on employee concerns and communicate what action was taken - or explain honestly when a requested change cannot be made.' },

  // Competency 4
  { id: 16, competencyId: 4, statement: 'I address performance or behavior concerns promptly instead of allowing frustration and patterns to build.' },
  { id: 17, competencyId: 4, statement: 'I use specific, observable examples when providing feedback rather than assumptions, labels or general criticism.' },
  { id: 18, competencyId: 4, statement: 'I determine whether a performance gap is caused by unclear expectations, insufficient training, limited resources, capability or unwillingness.' },
  { id: 19, competencyId: 4, statement: 'I conclude coaching conversations with clear actions, ownership, support and follow-up dates.' },
  { id: 20, competencyId: 4, statement: 'I recognize improvement and progress with the same consistency that I address mistakes and underperformance.' },

  // Competency 5
  { id: 21, competencyId: 5, statement: 'I prioritize responsibilities based on business impact rather than allowing the most immediate request to control my day.' },
  { id: 22, competencyId: 5, statement: 'I delegate appropriate responsibilities instead of routinely completing work that capable employees could perform.' },
  { id: 23, competencyId: 5, statement: 'When delegating, I clearly communicate the desired result, available resources, level of authority and deadline.' },
  { id: 24, competencyId: 5, statement: 'I establish reasonable follow-up points without micromanaging how the employee completes every step.' },
  { id: 25, competencyId: 5, statement: 'I use delegation to develop employee capability - not merely to remove unwanted tasks from my workload.' },

  // Competency 6
  { id: 26, competencyId: 6, statement: 'I understand the career interests, strengths and development needs of each employee I manage.' },
  { id: 27, competencyId: 6, statement: 'I provide employees with specific opportunities to practice new skills and accept greater responsibility.' },
  { id: 28, competencyId: 6, statement: 'I maintain clear development plans for employees who want to grow or advance.' },
  { id: 29, competencyId: 6, statement: 'I discuss employee satisfaction and potential retention concerns before someone begins actively planning to leave.' },
  { id: 30, competencyId: 6, statement: 'I evaluate promotion readiness using demonstrated behaviors, capability and results - not tenure, personal relationships or immediate staffing needs alone.' },

  // Competency 7
  { id: 31, competencyId: 7, statement: 'I establish clear operational priorities and verify completion instead of assuming assigned work was completed correctly.' },
  { id: 32, competencyId: 7, statement: 'I use consistent routines, checklists or standards to reduce performance differences between employees, managers and shifts.' },
  { id: 33, competencyId: 7, statement: 'I identify the underlying cause of recurring operational problems rather than repeatedly treating the immediate symptom.' },
  { id: 34, competencyId: 7, statement: 'I communicate ownership, deadlines and follow-up expectations whenever an operational action is assigned.' },
  { id: 35, competencyId: 7, statement: 'I regularly evaluate existing processes and involve appropriate employees in improving efficiency, quality and customer experience.' },

  // Competency 8
  { id: 36, competencyId: 8, statement: 'I understand the primary performance indicators for my operation and can explain why they matter.' },
  { id: 37, competencyId: 8, statement: 'I regularly use performance data, customer feedback and operational observations to establish priorities.' },
  { id: 38, competencyId: 8, statement: 'I communicate business results to employees in a way that helps them understand how their actions influence outcomes.' },
  { id: 39, competencyId: 8, statement: 'When performance misses a target, I identify likely causes, establish specific actions and consistently follow up.' },
  { id: 40, competencyId: 8, statement: 'I balance immediate results with employee development, customer experience and the long-term health of the operation.' },
];
