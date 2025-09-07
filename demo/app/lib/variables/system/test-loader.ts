import { VariableLoader } from './variable-loader';
import { VariableSelector } from './variable-selector';

async function test() {
  console.log('🧪 Testing Variable Loading System...\n');
  
  try {
    // Test loading variables
    const loader = new VariableLoader();
    console.log('📂 Loading competency: quality-recognition/data-quality');
    await loader.loadCompetency('quality-recognition', 'data-quality');
    
    // Test getting a specific variable
    const variable = loader.getVariable('data-quality', 'collection-rigor');
    console.log('\n✅ Loaded variable:', variable?.display_name);
    if (variable) {
      console.log('   Purpose:', variable.purpose);
      console.log('   Values available:', Object.keys(variable.values).join(', '));
    }
    
    // Test getting all variables for a competency
    const allVars = loader.getCompetencyVariables('data-quality');
    console.log('\n📊 Total variables loaded:', allVars.length);
    console.log('   Variables:', allVars.map(v => v.display_name).join(', '));
    
    // Test the selector
    console.log('\n🎯 Testing Variable Selector...');
    const selector = new VariableSelector();
    
    // Test different difficulty levels
    const difficulties: Array<'obvious' | 'moderate' | 'subtle'> = ['obvious', 'moderate', 'subtle'];
    
    for (const difficulty of difficulties) {
      const selected = selector.selectForScenario('data-quality', difficulty, loader);
      console.log(`\n   ${difficulty.toUpperCase()} difficulty:`);
      console.log(`   - Selected ${selected.primary.length} variables`);
      console.log(`   - Variables:`, selected.primary.map(v => 
        `${v.display_name} (${v.selectedLevel})`
      ).join(', '));
    }
    
    // Test other competencies
    console.log('\n🔄 Testing other competencies...');
    
    // Test methodological-rigor
    await loader.loadCompetency('quality-recognition', 'methodological-rigor');
    const methodVars = loader.getCompetencyVariables('methodological-rigor');
    console.log(`\n   Methodological Rigor: ${methodVars.length} variables loaded`);
    console.log(`   Variables:`, methodVars.map(v => v.display_name).join(', '));
    
    // Test insights-quality
    await loader.loadCompetency('quality-recognition', 'insights-quality');
    const insightVars = loader.getCompetencyVariables('insights-quality');
    console.log(`\n   Insights Quality: ${insightVars.length} variables loaded`);
    console.log(`   Variables:`, insightVars.map(v => v.display_name).join(', '));
    
    console.log('\n✨ All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
  }
}

// Run the test
test().then(() => {
  console.log('\n👋 Test script finished');
}).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});