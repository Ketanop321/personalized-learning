# LearnHub - AI-Powered Learning Platform
 

LearnHub is a modern, AI-powered learning platform built with React, TypeScript, and Vite. It provides personalized learning experiences through intelligent content recommendations, adaptive assessments, and progress tracking.
 

### Frontend Architecture
- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management

##  
## Setup Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd learnhub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_YOUTUBE_API_KEY=your_youtube_api_key
```

4. Start development server:
```bash
npm run dev
```

## AI/ML Implementation Guide

### 1. Knowledge Assessment

```typescript
// src/lib/ai.ts
export async function assessKnowledge(
  responses: string[],
  topic: string
): Promise<LearningAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Analyze these student responses for ${topic}...`;
  
  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('Error in knowledge assessment:', error);
    return defaultAnalysis;
  }
}
```

### 2. Content Recommendations

```typescript
// src/lib/ai.ts
export async function generateRecommendations(
  userProfile: UserProfile,
  learningHistory: LearningHistory
): Promise<CourseRecommendation[]> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate personalized course recommendations based on:
    Profile: ${JSON.stringify(userProfile)}
    History: ${JSON.stringify(learningHistory)}`;
  
  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}
```

### 3. Learning Path Generation

```typescript
// src/lib/ai.ts
export async function generateLearningPath(
  goals: string[],
  currentLevel: string
): Promise<LearningPath> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create a structured learning path for:
    Goals: ${goals.join(', ')}
    Current Level: ${currentLevel}`;
  
  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text());
  } catch (error) {
    console.error('Error generating learning path:', error);
    return defaultPath;
  }
}
```
 
 