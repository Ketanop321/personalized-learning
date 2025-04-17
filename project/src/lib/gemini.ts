import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getPersonalizedFeedback(userResponse: string, topic: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Analyze this student response for the topic "${topic}" and provide constructive feedback:
  
  Student Response: ${userResponse}
  
  Please provide:
  1. Understanding level (Beginner/Intermediate/Advanced)
  2. Key strengths
  3. Areas for improvement
  4. Suggested next topics`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting feedback:', error);
    return 'Unable to generate feedback at this time.';
  }
}

export async function generateLearningPath(userPreferences: {
  level: string;
  interests: string[];
  goals: string[];
}) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create a personalized learning path based on:
  Level: ${userPreferences.level}
  Interests: ${userPreferences.interests.join(', ')}
  Goals: ${userPreferences.goals.join(', ')}
  
  Provide:
  1. Recommended topics in order
  2. Estimated time for each topic
  3. Key milestones
  4. Learning resources`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating learning path:', error);
    return 'Unable to generate learning path at this time.';
  }
}