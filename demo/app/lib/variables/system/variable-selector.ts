import { VariableDefinition, SelectedVariable, SelectedVariables } from './types';
import { VariableLoader } from './variable-loader';

export class VariableSelector {
  selectForScenario(
    microCompetency: string,
    difficulty: 'obvious' | 'moderate' | 'subtle',
    variableLoader: VariableLoader
  ): SelectedVariables {
    const availableVars = variableLoader.getCompetencyVariables(microCompetency);
    
    // Select number based on difficulty
    const count = difficulty === 'obvious' ? 4 : difficulty === 'moderate' ? 3 : 2;
    
    // Randomly select variables
    const selected = this.randomSelect(availableVars, count);
    
    // Assign quality levels
    const withLevels = selected.map(v => this.assignQualityLevel(v, difficulty));
    
    return {
      primary: withLevels,
      metadata: {
        competency: microCompetency,
        difficulty,
        patterns: withLevels.map(v => v.name)
      }
    };
  }

  private assignQualityLevel(variable: VariableDefinition, difficulty: string): SelectedVariable {
    // For demo, mix quality levels realistically
    const levels = Object.keys(variable.values);
    let selectedLevel: string;
    
    if (difficulty === 'obvious') {
      // Use extreme values for clarity
      selectedLevel = Math.random() > 0.5 ? levels[0] : levels[levels.length - 1];
    } else {
      // Use more nuanced middle values
      const middleIndex = Math.floor(levels.length / 2);
      selectedLevel = levels[middleIndex + Math.floor(Math.random() * 2) - 1];
    }

    const levelDetails = variable.values[selectedLevel];

    return {
      name: variable.display_name.toLowerCase().replace(/\s+/g, '_'),
      display_name: variable.display_name,
      selectedLevel,
      levelDetails,
      quality_signal: levelDetails.quality_signal
    };
  }

  private randomSelect<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}