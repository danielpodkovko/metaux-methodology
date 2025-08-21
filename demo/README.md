# MetaUX Pattern Recognition Demo

A Next.js demonstration app for the MetaUX pattern recognition training system. This demo showcases AI-driven scenario generation, exercise mechanics, and competency assessment for UX practitioners.

## Features

- **Dynamic Scenario Generation**: AI-powered scenarios based on configurable contexts
- **Pattern Recognition Training**: Focus on quality recognition competencies
- **Multiple Exercise Types**: Selection, Ranking, and Analysis modes
- **AI Assessment**: Automated evaluation with detailed feedback
- **Mentor Guidance**: Contextual learning insights

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Anthropic API key

### Installation

1. Clone the repository and navigate to the demo folder:
```bash
cd demo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Configure Training Context**
   - Select industry (Fintech, Healthcare, E-commerce)
   - Choose company stage (Startup, Scale-up, Enterprise)
   - Set time pressure level
   - Pick exercise type

2. **Complete Scenario**
   - Read the generated scenario carefully
   - Complete the exercise (selection, ranking, or analysis)
   - Provide reasoning for your choices

3. **Review Feedback**
   - See assessment of your response
   - Review recognized and missed patterns
   - Read mentor guidance for improvement
   - Try another scenario or change configuration

## Project Structure

```
demo/
├── app/
│   ├── api/              # API routes for Claude integration
│   ├── components/       # React components
│   ├── lib/             
│   │   ├── prompts/     # AI agent prompts
│   │   ├── schemas/     # TypeScript interfaces
│   │   └── claude.ts    # Anthropic SDK client
│   └── page.tsx         # Main application
├── public/              # Static assets
└── package.json
```

## Key Components

- **ConfigSelector**: Training configuration interface
- **ScenarioDisplay**: Presents generated scenarios
- **ExerciseMechanic**: Handles different exercise types
- **ResponseFeedback**: Shows evaluation and guidance

## Development

To modify the demo:

1. **Adjust Prompts**: Edit files in `app/lib/prompts/`
2. **Add Competencies**: Modify schemas in `app/lib/schemas/`
3. **Customize UI**: Update components in `app/components/`
4. **Extend Exercise Types**: Add new mechanics to `ExerciseMechanic.tsx`

## API Endpoints

- `POST /api/generate-scenario` - Generate new training scenario
- `POST /api/evaluate-response` - Evaluate user response
- `POST /api/provide-guidance` - Get mentor feedback

## Notes

- This is a demonstration prototype focused on core functionality
- The app uses Claude 3.5 Sonnet for efficient scenario generation
- Session data is not persisted between page refreshes
- Desktop-optimized (mobile responsiveness not prioritized for demo)
