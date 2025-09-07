import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { VariableDefinition, CompetencyVariables } from './types';

export class VariableLoader {
  private basePath = path.join(process.cwd(), 'app/lib/variables/definitions');
  private variables: Map<string, VariableDefinition> = new Map();
  private competencies: Map<string, CompetencyVariables> = new Map();

  async loadCompetency(macroCompetency: string, microCompetency: string): Promise<void> {
    const competencyPath = path.join(
      this.basePath,
      macroCompetency,
      microCompetency
    );

    const files = fs.readdirSync(competencyPath)
      .filter(f => f.endsWith('.yaml'));

    for (const file of files) {
      const fileName = file.replace('.yaml', '');
      const content = fs.readFileSync(
        path.join(competencyPath, file),
        'utf8'
      );
      
      const yamlData = yaml.load(content) as any;
      // The YAML has the variable name as the root key (with underscores)
      // Try both the file name format and underscore format
      const variableNameUnderscore = fileName.replace(/-/g, '_');
      const variable = yamlData[variableNameUnderscore] || yamlData[fileName] || yamlData;
      
      // Store with the file name format (with hyphens)
      const key = `${microCompetency}.${fileName}`;
      
      this.variables.set(key, variable);
    }
  }

  getVariable(microCompetency: string, variableName: string): VariableDefinition | undefined {
    return this.variables.get(`${microCompetency}.${variableName}`);
  }

  getCompetencyVariables(microCompetency: string): VariableDefinition[] {
    const variables: VariableDefinition[] = [];
    for (const [key, value] of this.variables.entries()) {
      if (key.startsWith(`${microCompetency}.`)) {
        variables.push(value);
      }
    }
    return variables;
  }
}