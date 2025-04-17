import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API with the provided key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export interface LearningAnalysis {
  level: string;
  strengths: string[];
  improvements: string[];
  nextTopics: string[];
}

export interface LearningPath {
  topics: Array<{
    name: string;
    duration: string;
    resources: string[];
    difficulty: string;
    format: string;
    prerequisites: string[];
    exercises: string[];
  }>;
  milestones: string[];
  estimatedCompletion: string;
  adaptiveRecommendations: {
    pace: string;
    focusAreas: string[];
    nextSteps: string[];
  };
}

export interface CourseRecommendation {
  id: string;
  title: string;
  description: string;
  level: string;
  matchScore: number;
  topics: string[];
  format: string;
  duration: string;
  prerequisites: string[];
  learningOutcomes: string[];
}

export interface UserProfile {
  interests: string[];
  level: string;
  goals: string[];
  completedCourses: string[];
  learningStyle: string;
  timeCommitment: string;
  performance: Record<string, number>;
  preferences: {
    contentFormat: string[];
    studyTime: string[];
    difficulty: string;
  };
}

export interface LearningHistory {
  completedTopics: string[];
  assessmentScores: Record<string, number>;
  timeSpent: Record<string, number>;
  challengingConcepts: string[];
  completionRates: Record<string, number>;
  engagementMetrics: {
    averageSessionDuration: number;
    completionRate: number;
    interactionFrequency: number;
  };
}

// Smart Learning Path Generation
export async function generatePersonalizedPath(
  interests: string[],
  goals: string[],
  currentLevel: string,
  learningStyle: string = 'visual',
  timeCommitment: string = 'medium'
): Promise<LearningPath> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create a comprehensive personalized learning path based on:
  Interests: ${interests.join(', ')}
  Goals: ${goals.join(', ')}
  Current Level: ${currentLevel}
  Learning Style: ${learningStyle}
  Time Commitment: ${timeCommitment}
  
  Provide a detailed learning path in JSON format with:
  {
    "topics": [
      {
        "name": "Topic Name",
        "duration": "Estimated Duration",
        "resources": ["Resource1", "Resource2"],
        "difficulty": "beginner/intermediate/advanced",
        "format": "video/text/interactive/mixed",
        "prerequisites": ["Prerequisite1", "Prerequisite2"],
        "exercises": ["Exercise1", "Exercise2"]
      }
    ],
    "milestones": ["Milestone1", "Milestone2"],
    "estimatedCompletion": "Estimated completion time",
    "adaptiveRecommendations": {
      "pace": "Recommended learning pace",
      "focusAreas": ["Focus Area1", "Focus Area2"],
      "nextSteps": ["Next Step1", "Next Step2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating learning path:', error);
    return {
      topics: [],
      milestones: [],
      estimatedCompletion: '',
      adaptiveRecommendations: {
        pace: '',
        focusAreas: [],
        nextSteps: []
      }
    };
  }
}

// Intelligent Assessment System
export async function generateAssessment(
  userPerformance: {
    currentTopic: string;
    scores: Record<string, number>;
    gaps: string[];
    level: string;
    recentMistakes: string[];
  }
): Promise<{
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: string;
    conceptTested: string;
    hints: string[];
    followUpQuestions: string[];
  }>;
  adaptiveRecommendations: {
    focusAreas: string[];
    remedialContent: string[];
    practiceExercises: string[];
  };
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate an intelligent adaptive assessment based on:
  - Current topic: ${userPerformance.currentTopic}
  - Previous scores: ${JSON.stringify(userPerformance.scores)}
  - Knowledge gaps: ${userPerformance.gaps.join(', ')}
  - Current level: ${userPerformance.level}
  - Recent mistakes: ${userPerformance.recentMistakes.join(', ')}
  
  Provide a comprehensive assessment in JSON format with:
  {
    "questions": [
      {
        "question": "Question text",
        "options": ["Option1", "Option2", "Option3", "Option4"],
        "correctAnswer": "Correct option",
        "explanation": "Detailed explanation",
        "difficulty": "beginner/intermediate/advanced",
        "conceptTested": "Main concept being tested",
        "hints": ["Hint1", "Hint2"],
        "followUpQuestions": ["Follow-up1", "Follow-up2"]
      }
    ],
    "adaptiveRecommendations": {
      "focusAreas": ["Area1", "Area2"],
      "remedialContent": ["Content1", "Content2"],
      "practiceExercises": ["Exercise1", "Exercise2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating assessment:', error);
    return {
      questions: [],
      adaptiveRecommendations: {
        focusAreas: [],
        remedialContent: [],
        practiceExercises: []
      }
    };
  }
}

export async function generateStudyPlan(
  topics: string[],
  timeAvailable: number,
  learningStyle: string = 'visual'
): Promise<{
  plan: Array<{
    topic: string;
    timeAllocation: number;
    resources: string[];
    activities: string[];
  }>;
  schedule: string[];
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create a study plan based on:
  Topics: ${topics.join(', ')}
  Time Available: ${timeAvailable} hours
  Learning Style: ${learningStyle}
  
  Provide the plan in JSON format:
  {
    "plan": [
      {
        "topic": "Topic name",
        "timeAllocation": hours,
        "resources": ["Resource1", "Resource2"],
        "activities": ["Activity1", "Activity2"]
      }
    ],
    "schedule": ["Day 1: Topic1", "Day 2: Topic2"]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating study plan:', error);
    return {
      plan: [],
      schedule: []
    };
  }
}

// Smart Tutoring System
export async function getStudyAssistance(
  userQuery: string,
  context: {
    topic: string;
    history: string[];
    level: string;
    learningStyle: string;
    previousResponses: Array<{
      question: string;
      response: string;
      understanding: 'good' | 'partial' | 'poor';
    }>;
  }
): Promise<{
  explanation: string;
  examples: string[];
  steps: string[];
  relatedConcepts: string[];
  practiceQuestions: string[];
  visualAids: string[];
  interactiveElements: string[];
  furtherResources: string[];
  adaptiveFeedback: {
    conceptMastery: string;
    suggestedApproach: string;
    commonMisconceptions: string[];
  };
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Provide intelligent tutoring assistance for:
  User Question: ${userQuery}
  Topic: ${context.topic}
  Level: ${context.level}
  Learning Style: ${context.learningStyle}
  Previous Interactions: ${JSON.stringify(context.previousResponses)}

  Generate a comprehensive response in JSON format with:
  {
    "explanation": "Clear, personalized explanation",
    "examples": ["Example1", "Example2"],
    "steps": ["Step1", "Step2"],
    "relatedConcepts": ["Concept1", "Concept2"],
    "practiceQuestions": ["Question1", "Question2"],
    "visualAids": ["Visual1", "Visual2"],
    "interactiveElements": ["Element1", "Element2"],
    "furtherResources": ["Resource1", "Resource2"],
    "adaptiveFeedback": {
      "conceptMastery": "Current understanding level",
      "suggestedApproach": "Recommended learning approach",
      "commonMisconceptions": ["Misconception1", "Misconception2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error getting study assistance:', error);
    return {
      explanation: '',
      examples: [],
      steps: [],
      relatedConcepts: [],
      practiceQuestions: [],
      visualAids: [],
      interactiveElements: [],
      furtherResources: [],
      adaptiveFeedback: {
        conceptMastery: '',
        suggestedApproach: '',
        commonMisconceptions: []
      }
    };
  }
}

// Progress Monitoring and Analysis
export async function analyzeProgress(
  userMetrics: {
    velocity: number;
    completionRates: Record<string, number>;
    scores: Record<string, number>;
    timeSpent: Record<string, number>;
    engagement: Record<string, number>;
    learningPatterns: {
      preferredTimes: string[];
      sessionDuration: number;
      topicProgression: string[];
      challengeAreas: string[];
    };
  }
): Promise<{
  insights: string[];
  patterns: string[];
  suggestions: string[];
  predictions: string[];
  adaptiveRecommendations: {
    paceAdjustment: string;
    methodologyChanges: string[];
    resourceSuggestions: string[];
    interventionStrategies: string[];
  };
  progressReport: {
    overallProgress: number;
    strengthAreas: string[];
    improvementAreas: string[];
    nextMilestones: string[];
  };
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Provide comprehensive progress analysis for:
  ${JSON.stringify(userMetrics)}

  Generate detailed analysis in JSON format:
  {
    "insights": ["Insight1", "Insight2"],
    "patterns": ["Pattern1", "Pattern2"],
    "suggestions": ["Suggestion1", "Suggestion2"],
    "predictions": ["Prediction1", "Prediction2"],
    "adaptiveRecommendations": {
      "paceAdjustment": "Recommended pace change",
      "methodologyChanges": ["Change1", "Change2"],
      "resourceSuggestions": ["Resource1", "Resource2"],
      "interventionStrategies": ["Strategy1", "Strategy2"]
    },
    "progressReport": {
      "overallProgress": 85,
      "strengthAreas": ["Strength1", "Strength2"],
      "improvementAreas": ["Area1", "Area2"],
      "nextMilestones": ["Milestone1", "Milestone2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error analyzing progress:', error);
    return {
      insights: [],
      patterns: [],
      suggestions: [],
      predictions: [],
      adaptiveRecommendations: {
        paceAdjustment: '',
        methodologyChanges: [],
        resourceSuggestions: [],
        interventionStrategies: []
      },
      progressReport: {
        overallProgress: 0,
        strengthAreas: [],
        improvementAreas: [],
        nextMilestones: []
      }
    };
  }
}

// Schedule Optimization
export async function optimizeSchedule(
  userPatterns: {
    peakTimes: string[];
    availability: Record<string, string[]>;
    topicDifficulty: Record<string, string>;
    goals: string[];
    learningStyle: string;
    energyLevels: Record<string, string>;
    preferences: {
      sessionDuration: number;
      breakFrequency: number;
      reviewFrequency: string;
    };
  }
): Promise<{
  schedule: Array<{
    time: string;
    topic: string;
    duration: string;
    type: string;
    format: string;
    intensity: string;
    objectives: string[];
  }>;
  breaks: Array<{
    time: string;
    duration: string;
    type: string;
    recommendation: string;
  }>;
  reviews: Array<{
    time: string;
    topics: string[];
    duration: string;
    format: string;
  }>;
  adaptiveRecommendations: {
    paceAdjustments: string[];
    focusAreas: string[];
    methodologyChanges: string[];
  };
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create an optimized learning schedule based on:
  ${JSON.stringify(userPatterns)}

  Generate a detailed schedule in JSON format:
  {
    "schedule": [
      {
        "time": "HH:MM",
        "topic": "Topic name",
        "duration": "Duration in minutes",
        "type": "study/practice/review",
        "format": "video/reading/interactive",
        "intensity": "high/medium/low",
        "objectives": ["Objective1", "Objective2"]
      }
    ],
    "breaks": [
      {
        "time": "HH:MM",
        "duration": "Duration in minutes",
        "type": "active/passive",
        "recommendation": "Break activity recommendation"
      }
    ],
    "reviews": [
      {
        "time": "HH:MM",
        "topics": ["Topic1", "Topic2"],
        "duration": "Duration in minutes",
        "format": "quiz/summary/practice"
      }
    ],
    "adaptiveRecommendations": {
      "paceAdjustments": ["Adjustment1", "Adjustment2"],
      "focusAreas": ["Area1", "Area2"],
      "methodologyChanges": ["Change1", "Change2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error optimizing schedule:', error);
    return {
      schedule: [],
      breaks: [],
      reviews: [],
      adaptiveRecommendations: {
        paceAdjustments: [],
        focusAreas: [],
        methodologyChanges: []
      }
    };
  }
}

// Content Personalization
export async function adaptContent(
  content: string,
  userProfile: {
    level: string;
    learningStyle: string;
    background: string[];
    preferences: {
      contentFormat: string[];
      complexity: string;
      interactivityLevel: string;
    };
    performance: {
      strengths: string[];
      weaknesses: string[];
      learningVelocity: string;
    };
  }
): Promise<{
  adaptedContent: string;
  examples: string[];
  exercises: string[];
  context: string[];
  visualAids: string[];
  interactiveElements: string[];
  assessments: Array<{
    type: string;
    questions: string[];
    difficulty: string;
  }>;
  supplementaryResources: Array<{
    type: string;
    url: string;
    description: string;
  }>;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Personalize this content for the user:
  Content: ${content}
  User Profile: ${JSON.stringify(userProfile)}

  Provide adapted content in JSON format:
  {
    "adaptedContent": "Modified content text",
    "examples": ["Example1", "Example2"],
    "exercises": ["Exercise1", "Exercise2"],
    "context": ["Context1", "Context2"],
    "visualAids": ["Visual1", "Visual2"],
    "interactiveElements": ["Element1", "Element2"],
    "assessments": [
      {
        "type": "quiz/practice/project",
        "questions": ["Question1", "Question2"],
        "difficulty": "beginner/intermediate/advanced"
      }
    ],
    "supplementaryResources": [
      {
        "type": "video/article/tutorial",
        "url": "Resource URL",
        "description": "Resource description"
      }
    ]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error adapting content:', error);
    return {
      adaptedContent: content,
      examples: [],
      exercises: [],
      context: [],
      visualAids: [],
      interactiveElements: [],
      assessments: [],
      supplementaryResources: []
    };
  }
}

// Course Recommendations
export async function generateRecommendations(
  userProfile: UserProfile,
  learningHistory: LearningHistory
): Promise<{
  recommendations: CourseRecommendation[];
  learningPath: {
    sequence: string[];
    milestones: string[];
    timeline: string;
  };
  skillGaps: string[];
  prerequisites: Record<string, string[]>;
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate comprehensive course recommendations based on:
  User Profile: ${JSON.stringify(userProfile)}
  Learning History: ${JSON.stringify(learningHistory)}
  
  Provide detailed recommendations in JSON format:
  {
    "recommendations": [
      {
        "id": "unique_id",
        "title": "Course Title",
        "description": "Course Description",
        "level": "beginner/intermediate/advanced",
        "matchScore": 0.95,
        "topics": ["Topic1", "Topic2"],
        "format": "video/interactive/mixed",
        "duration": "Estimated duration",
        "prerequisites": ["Prerequisite1", "Prerequisite2"],
        "learningOutcomes": ["Outcome1", "Outcome2"]
      }
    ],
    "learningPath": {
      "sequence": ["Step1", "Step2"],
      "milestones": ["Milestone1", "Milestone2"],
      "timeline": "Estimated completion timeline"
    },
    "skillGaps": ["Gap1", "Gap2"],
    "prerequisites": {
      "Course1": ["Prerequisite1", "Prerequisite2"],
      "Course2": ["Prerequisite3", "Prerequisite4"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return {
      recommendations: [],
      learningPath: {
        sequence: [],
        milestones: [],
        timeline: ''
      },
      skillGaps: [],
      prerequisites: {}
    };
  }
}

// Knowledge Assessment
export async function analyzeLearningProgress(
  responses: string[],
  topic: string,
  context: {
    previousAssessments: Array<{
      topic: string;
      score: number;
      date: string;
    }>;
    learningStyle: string;
    goals: string[];
  }
): Promise<{
  currentAnalysis: LearningAnalysis;
  progressTrends: {
    improvement: string[];
    challenges: string[];
    velocity: string;
  };
  recommendations: {
    nextSteps: string[];
    resources: string[];
    practiceAreas: string[];
  };
  adaptiveContent: {
    format: string;
    difficulty: string;
    focus: string[];
  };
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Provide comprehensive learning analysis for:
  Topic: ${topic}
  Responses: ${responses.join('\n')}
  Context: ${JSON.stringify(context)}
  
  Generate detailed analysis in JSON format:
  {
    "currentAnalysis": {
      "level": "beginner/intermediate/advanced",
      "strengths": ["Strength1", "Strength2"],
      "improvements": ["Improvement1", "Improvement2"],
      "nextTopics": ["Topic1", "Topic2"]
    },
    "progressTrends": {
      "improvement": ["Trend1", "Trend2"],
      "challenges": ["Challenge1", "Challenge2"],
      "velocity": "Learning pace assessment"
    },
    "recommendations": {
      "nextSteps": ["Step1", "Step2"],
      "resources": ["Resource1", "Resource2"],
      "practiceAreas": ["Area1", "Area2"]
    },
    "adaptiveContent": {
      "format": "Recommended content format",
      "difficulty": "Recommended difficulty level",
      "focus": ["Focus1", "Focus2"]
    }
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error('Error analyzing learning progress:', error);
    return {
      currentAnalysis: {
        level: 'beginner',
        strengths: [],
        improvements: [],
        nextTopics: []
      },
      progressTrends: {
        improvement: [],
        challenges: [],
        velocity: ''
      },
      recommendations: {
        nextSteps: [],
        resources: [],
        practiceAreas: []
      },
      adaptiveContent: {
        format: '',
        difficulty: '',
        focus: []
      }
    };
  }
}