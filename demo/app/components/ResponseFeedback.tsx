'use client';

import { Evaluation } from '@/app/lib/schemas/evaluation';

interface ResponseFeedbackProps {
  evaluation: Evaluation;
  mentorGuidance?: string;
  onTryAnother?: () => void;
  onChangeConfig?: () => void;
}

export default function ResponseFeedback({ 
  evaluation, 
  mentorGuidance
}: ResponseFeedbackProps) {
  const { assessment, feedback } = evaluation;

  // Helper function to format text with line breaks
  const formatText = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-xl p-5 animate-slideIn">
        <div className="flex items-center gap-2 mb-3">
          {assessment.correct ? (
            <span className="text-green-400 font-medium">✓ Correct Assessment</span>
          ) : (
            <span className="text-yellow-400 font-medium">⚠ Partially Correct</span>
          )}
          <span className="text-sm text-gray-400">
            ({assessment.accuracy_score}% accuracy)
          </span>
        </div>
        <div className="text-gray-300 text-sm leading-relaxed">
          {formatText(feedback.summary)}
        </div>
      </div>

      {feedback.key_points.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-5 animate-slideIn" style={{ animationDelay: '0.1s' }}>
          <h4 className="font-semibold text-gray-300 text-sm mb-3">Key Insights:</h4>
          <ul className="space-y-3">
            {feedback.key_points.map((point, index) => (
              <li key={index} className="text-gray-400 text-sm flex items-start leading-relaxed">
                <span className="text-indigo-400 mr-2 mt-0.5">▸</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {assessment.recognized_patterns.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-5 animate-slideIn" style={{ animationDelay: '0.2s' }}>
          <h4 className="font-semibold text-green-400 text-sm mb-3">Patterns You Caught:</h4>
          <div className="flex flex-wrap gap-2">
            {assessment.recognized_patterns.map((pattern, index) => (
              <span key={index} className="px-3 py-1.5 bg-green-900/50 text-green-300 rounded-lg text-xs border border-green-700">
                {pattern}
              </span>
            ))}
          </div>
        </div>
      )}

      {assessment.missed_patterns.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-5 animate-slideIn" style={{ animationDelay: '0.3s' }}>
          <h4 className="font-semibold text-yellow-400 text-sm mb-3">Patterns to Watch For:</h4>
          <div className="flex flex-wrap gap-2">
            {assessment.missed_patterns.map((pattern, index) => (
              <span key={index} className="px-3 py-1.5 bg-yellow-900/50 text-yellow-300 rounded-lg text-xs border border-yellow-700">
                {pattern}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-700/50 rounded-xl p-5 animate-slideIn" style={{ animationDelay: '0.4s' }}>
        <h4 className="font-semibold text-indigo-300 text-sm mb-3">Pattern Recognition Tip:</h4>
        <div className="text-gray-300 text-sm leading-relaxed">
          {formatText(feedback.pattern_guidance)}
        </div>
      </div>

      {mentorGuidance && (
        <div className="bg-purple-900/30 border border-purple-700/50 rounded-xl p-5 animate-slideIn" style={{ animationDelay: '0.5s' }}>
          <h4 className="font-semibold text-purple-300 text-sm mb-3">Mentor&apos;s Wisdom:</h4>
          <div className="text-gray-300 text-sm leading-relaxed italic space-y-2">
            {mentorGuidance.split('\n').filter(p => p.trim()).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-xl p-5 animate-slideIn" style={{ animationDelay: '0.6s' }}>
        <p className="text-gray-400 italic text-sm leading-relaxed">{feedback.encouragement}</p>
      </div>
    </div>
  );
}