# LearnHub - AI-Powered Learning Platform

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technical Architecture](#technical-architecture)
4. [File Structure](#file-structure)
5. [Setup Guide](#setup-guide)
6. [AI/ML Implementation Guide](#aiml-implementation-guide)
7. [UI/UX Design System](#uiux-design-system)

## Project Overview

LearnHub is a modern, AI-powered learning platform built with React, TypeScript, and Vite. It provides personalized learning experiences through intelligent content recommendations, adaptive assessments, and progress tracking.

### Core Values
- Personalized Learning
- Adaptive Content
- Engaging Experience
- Data-Driven Insights

## Features

### 1. User Management
- Authentication (Login/Register)
- Profile Management
- Learning Preferences
- Progress Tracking

### 2. Learning Dashboard
- Personalized Recommendations
- Progress Overview
- Learning Goals
- Achievement Tracking

### 3. Course Management
- Course Discovery
- Progress Tracking
- Content Categories
- Learning Paths

### 4. AI-Powered Features
- Content Recommendations
- Learning Path Generation
- Performance Analysis
- Adaptive Assessments

### 5. Schedule Management
- Study Planning
- Time Tracking
- Session Management
- Reminders

## Technical Architecture

### Frontend Architecture
- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management

### AI/ML Integration
- Google's Gemini API for content analysis
- YouTube API for course content
- Custom ML models for recommendations

## File Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── courses/         # Course-related components
│   ├── pages/           # Page components
│   └── profile/         # Profile components
├── lib/                 # Utility functions and API integrations
│   ├── ai.ts           # AI/ML functionality
│   ├── gemini.ts       # Gemini API integration
│   └── youtube.ts      # YouTube API integration
├── store/              # State management
│   └── userStore.ts    # User state management
└── App.tsx             # Main application component
```

### Key Files and Their Purposes

1. `src/App.tsx`
   - Main application component
   - Routing configuration
   - Layout structure

2. `src/components/auth/AuthForm.tsx`
   - User authentication
   - Registration flow
   - Profile setup

3. `src/components/Dashboard.tsx`
   - Main dashboard layout
   - Navigation structure
   - User profile display

4. `src/lib/ai.ts`
   - AI/ML integrations
   - Learning analysis
   - Content recommendations

5. `src/store/userStore.ts`
   - User state management
   - Progress tracking
   - Settings management

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

## UI/UX Design System

### Color Palette
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Accent: Green (#10B981)
- Background: Gray (#F3F4F6)
- Text: Dark (#1F2937)

### Typography
- Headings: Inter
- Body: Inter
- Code: Mono

### Animations
- Page transitions
- Hover effects
- Loading states
- Progress indicators

### Components
- Buttons
- Cards
- Forms
- Navigation
- Modals

## Future Enhancements

1. Advanced AI Features
   - Real-time feedback
   - Peer learning matching
   - Content generation

2. Platform Improvements
   - Mobile app
   - Offline support
   - Social features

3. Technical Upgrades
   - Performance optimization
   - Accessibility improvements
   - Testing coverage

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.