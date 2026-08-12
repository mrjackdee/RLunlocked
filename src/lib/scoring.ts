import { COMPETENCIES, QUESTIONS } from '../data/assessmentData';
import {
  CompetencyScoreResult,
  ProfileName,
  ProfileResult,
  RatingValue,
  ScoreClassification,
} from '../types';

export function getClassification(avg: number): ScoreClassification {
  if (avg >= 4.5) return 'Signature Strength';
  if (avg >= 3.75) return 'Effective';
  if (avg >= 3.0) return 'Inconsistent';
  if (avg >= 2.0) return 'Development Priority';
  return 'Immediate Attention';
}

export function calculateCompetencyScores(
  answers: Record<number, RatingValue>
): CompetencyScoreResult[] {
  return COMPETENCIES.map((comp) => {
    const compQuestions = QUESTIONS.filter((q) => q.competencyId === comp.id);
    const sum = compQuestions.reduce((acc, q) => {
      return acc + (answers[q.id] || 3);
    }, 0);
    const avg = parseFloat((sum / compQuestions.length).toFixed(2));
    const weightedPoints = parseFloat((avg * comp.multiplier).toFixed(4));
    const classification = getClassification(avg);

    return {
      competencyId: comp.id,
      title: comp.title,
      type: comp.type,
      average: avg,
      weightedPoints,
      classification,
    };
  });
}

export function calculateProfileResult(
  scores: CompetencyScoreResult[]
): ProfileResult {
  const totalWeighted = scores.reduce((acc, s) => acc + s.weightedPoints, 0);
  const weightedScore = parseFloat(totalWeighted.toFixed(2));

  // Determine Provisional Profile based purely on weighted score
  let provisionalProfile: ProfileName;
  if (weightedScore >= 4.5) {
    provisionalProfile = 'Consistent Leadership Model';
  } else if (weightedScore >= 3.75) {
    provisionalProfile = 'Effective Leader with a Focused Opportunity';
  } else if (weightedScore >= 3.0) {
    provisionalProfile = 'Capable but Inconsistent Manager';
  } else if (weightedScore >= 2.0) {
    provisionalProfile = 'Developing Manager';
  } else {
    provisionalProfile = 'Leadership Reset Required';
  }

  // Evaluate Safeguards
  const criticalScores = scores.filter((s) => s.type === 'Critical');
  const supportingScores = scores.filter((s) => s.type === 'Supporting');

  const anyCriticalBelow2 = criticalScores.some((s) => s.average < 2.0);
  const totalBelow2 = scores.filter((s) => s.average < 2.0).length;
  const totalBelow3 = scores.filter((s) => s.average < 3.0).length;
  const totalBelow3_75 = scores.filter((s) => s.average < 3.75).length;
  const criticalBelow4 = criticalScores.filter((s) => s.average < 4.0).length;
  const supportingBelow2 = supportingScores.some((s) => s.average < 2.0);

  const criticalGaps = scores
    .filter((s) => s.average < 3.0)
    .map((s) => `${s.title} (${s.average.toFixed(2)})`);

  let finalProfile: ProfileName = provisionalProfile;
  let safeguardTriggered = false;
  let safeguardReason: string | undefined = undefined;

  // Profile 5 Check: Any critical < 2.0, totalBelow2 >= 2, or weightedScore < 2.0
  if (anyCriticalBelow2 || totalBelow2 >= 2 || weightedScore < 2.0) {
    finalProfile = 'Leadership Reset Required';
    if (provisionalProfile !== 'Leadership Reset Required') {
      safeguardTriggered = true;
      safeguardReason =
        'Safeguard Triggered: A critical competency is below 2.00 or multiple competencies require immediate attention, requiring a Leadership Reset regardless of overall score.';
    }
  }
  // Profile 4 Ceiling Check: 2 or more < 3.00 OR 1 supporting < 2.00
  else if (totalBelow3 >= 2 || supportingBelow2) {
    if (
      provisionalProfile === 'Consistent Leadership Model' ||
      provisionalProfile === 'Effective Leader with a Focused Opportunity' ||
      provisionalProfile === 'Capable but Inconsistent Manager'
    ) {
      finalProfile = 'Developing Manager';
      safeguardTriggered = true;
      safeguardReason =
        'Safeguard Triggered (Profile 4 Ceiling): Two or more competencies below 3.00, or a supporting competency below 2.00, limits the final profile to Developing Manager.';
    }
  }
  // Profile 3 Ceiling Check: 1 competency < 3.00 OR 3 or more < 3.75
  else if (totalBelow3 >= 1 || totalBelow3_75 >= 3) {
    if (
      provisionalProfile === 'Consistent Leadership Model' ||
      provisionalProfile === 'Effective Leader with a Focused Opportunity'
    ) {
      finalProfile = 'Capable but Inconsistent Manager';
      safeguardTriggered = true;
      safeguardReason =
        'Safeguard Triggered (Profile 3 Ceiling): A competency below 3.00 or 3+ competencies below 3.75 prevents a higher profile to ensure critical gaps are addressed.';
    }
  }
  // Profile 1 Requirements Check
  else if (weightedScore >= 4.5) {
    if (totalBelow3_75 > 0 || criticalBelow4 > 0) {
      finalProfile = 'Effective Leader with a Focused Opportunity';
      safeguardTriggered = true;
      safeguardReason =
        'Safeguard Triggered: Profile 1 requires all competencies at 3.75+ and all critical competencies at 4.00+.';
    }
  }

  return {
    provisionalProfile,
    finalProfile,
    weightedScore,
    safeguardTriggered,
    safeguardReason,
    criticalGaps,
  };
}
