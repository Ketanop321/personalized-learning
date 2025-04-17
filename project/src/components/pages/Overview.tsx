import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { 
  generatePersonalizedPath, 
  generateRecommendations,
  analyzeProgress,
  LearningPath,
  CourseRecommendation
} from '../../lib/ai';
import { motion } from 'framer-motion';
import { Clock, Target, Award, BookOpen, ChevronRight, Brain, Rocket, CloudLightning as Lightning, TrendingUp } from 'lucide-react';

export default function Overview() {
  const user = useUserStore((state) => state.user);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [recommendations, setRecommendations] = useState<CourseRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<{
    patterns: string[];
    suggestions: string[];
  }>({ patterns: [], suggestions: [] });

  useEffect(() => {
    const fetchAIData = async () => {
      if (!user) return;

      try {
        // Generate personalized learning path
        const path = await generatePersonalizedPath(
          user.interests,
          user.goals,
          user.level
        );
        setLearningPath(path);

        // Get course recommendations
        const recs = await generateRecommendations(
          {
            interests: user.interests,
            level: user.level,
            goals: user.goals,
            completedCourses: []
          },
          {
            completedTopics: [],
            assessmentScores: user.progress,
            timeSpent: {}
          }
        );
        setRecommendations(recs);

        // Analyze progress
        const analysis = await analyzeProgress({
          velocity: 1,
          completionRates: user.progress,
          scores: user.progress,
          timeSpent: {},
          engagement: {}
        });
        setInsights({
          patterns: analysis.patterns,
          suggestions: analysis.suggestions
        });
      } catch (error) {
        console.error('Error fetching AI data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAIData();
  }, [user]);

  if (!user) return null;

  const averageProgress = Object.values(user.progress).reduce((a, b) => a + b, 0) / 
    Math.max(Object.values(user.progress).length, 1);

  return (
    <div className="p-6 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Current Level</h3>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.level}</p>
          <p className="text-sm text-gray-500 mt-2">Keep pushing your boundaries</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Overall Progress</h3>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(averageProgress)}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${averageProgress}%` }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Goals</h3>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{user.goals.length}</p>
          <p className="text-sm text-gray-500 mt-2">Goals in progress</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Learning Streak</h3>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Lightning className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">5 days</p>
          <p className="text-sm text-gray-500 mt-2">Keep the momentum going!</p>
        </motion.div>
      </div>

      {/* AI Insights */}
      {!loading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <Brain className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">AI Learning Insights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Learning Patterns</h3>
              <ul className="space-y-3">
                {insights.patterns.map((pattern, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {pattern}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Improvement Suggestions</h3>
              <ul className="space-y-3">
                {insights.suggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-700"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {suggestion}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Personalized Learning Path */}
      {!loading && learningPath && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Rocket className="w-6 h-6 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold">Your Learning Path</h2>
            </div>
            <button className="text-blue-500 hover:text-blue-700 flex items-center">
              View full path
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="space-y-6">
            {learningPath.topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-lg font-semibold text-blue-500">{index + 1}</span>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{topic.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {topic.duration}
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Start
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      {!loading && recommendations.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 text-blue-500 mr-3" />
              <h2 className="text-xl font-semibold">Recommended for You</h2>
            </div>
            <button className="text-blue-500 hover:text-blue-700 flex items-center">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((course, index) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-1" />
                      {course.level}
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {Math.round(course.matchScore * 100)}% match
                    </div>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Start Learning
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}