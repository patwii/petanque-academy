// ROI Calculation Engine
import { Assessment, Recommendation, FACTOR_WEIGHTS, FACTOR_EMOJIS } from './types';

/**
 * Calculate ROI for improving a factor
 * Based on diminishing returns principle
 */
export function calculateROI(currentLevel: number, weight: number): number {
  // Normalize current level to 0-1 scale
  const level = currentLevel / 100;
  
  // Calculate potential improvement (diminishing returns)
  // Using logarithmic curve: more room to grow at lower levels
  const potentialGain = Math.log(1 + (1 - level) * 10) / Math.log(11);
  
  // Calculate effort required (increases with current level)
  // Higher levels require more effort for same improvement
  const effortMultiplier = 1 + Math.pow(level, 2);
  
  // ROI = (Potential Gain × Weight) / Effort
  const roi = (potentialGain * weight) / effortMultiplier;
  
  return Math.round(roi);
}

/**
 * Calculate potential gain for a factor
 */
export function calculatePotentialGain(currentLevel: number): number {
  const level = currentLevel / 100;
  return Math.log(1 + (1 - level) * 10) / Math.log(11);
}

/**
 * Generate recommendations sorted by ROI
 */
export function generateRecommendations(
  assessment: Assessment,
  lang: string = 'en',
  labels: Record<string, string>
): Recommendation[] {
  const factors = Object.keys(FACTOR_WEIGHTS) as (keyof Assessment)[];
  
  const recommendations = factors.map(factor => {
    const currentLevel = assessment[factor];
    const weight = FACTOR_WEIGHTS[factor];
    const roiScore = calculateROI(currentLevel, weight);
    const potentialGain = calculatePotentialGain(currentLevel);
    
    return {
      factor,
      factorLabel: labels[factor] || factor,
      emoji: FACTOR_EMOJIS[factor],
      roiScore,
      currentLevel,
      weight,
      potentialGain,
      educationLink: getEducationLink(factor, lang)
    };
  });
  
  // Sort by ROI (highest first)
  return recommendations.sort((a, b) => b.roiScore - a.roiScore);
}

/**
 * Get education link for a factor
 */
function getEducationLink(factor: keyof Assessment, lang: string): string {
  const links: Record<keyof Assessment, string> = {
    mentalGame: `/${lang}/education/mental-game/`,
    motivation: `/${lang}/education/motivation/`,
    sleep: `/${lang}/education/sleep/`,
    selfAwareness: `/${lang}/education/self-awareness/`,
    nutrition: `/${lang}/education/nutrition/`,
    teamDynamics: `/${lang}/education/team-dynamics/`,
    tensionManagement: `/${lang}/education/tension/`,
    technique: `/${lang}/education/technique/`
  };
  return links[factor];
}

/**
 * Calculate overall score (weighted average)
 */
export function calculateOverallScore(assessment: Assessment): number {
  const factors = Object.keys(FACTOR_WEIGHTS) as (keyof Assessment)[];
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  factors.forEach(factor => {
    totalWeightedScore += assessment[factor] * FACTOR_WEIGHTS[factor];
    totalWeight += FACTOR_WEIGHTS[factor];
  });
  
  return Math.round(totalWeightedScore / totalWeight);
}

/**
 * Get improvement message based on ROI
 */
export function getImprovementMessage(recommendation: Recommendation): string {
  const { currentLevel, factor, potentialGain } = recommendation;
  
  if (currentLevel < 30) {
    return `High potential! Improving ${factor} from ${currentLevel}% could significantly boost your overall performance.`;
  } else if (currentLevel < 60) {
    return `Good opportunity. Building on your ${factor} foundation can yield solid returns.`;
  } else if (currentLevel < 80) {
    return `Refinement zone. Further ${factor} gains require more focused effort.`;
  } else {
    return `Near mastery. ${factor} improvements are incremental but can provide an edge.`;
  }
}

