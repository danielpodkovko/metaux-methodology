export const DEBUG_CONFIG = {
  logPatternGeneration: process.env.NODE_ENV === 'development',
  logAssessment: process.env.NODE_ENV === 'development',
  logCompetencyConfusion: true, // Always log confusion for learning
};