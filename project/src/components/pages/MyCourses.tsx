import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { 
  generateAssessment,
  getStudyAssistance,
  adaptContent,
  optimizeSchedule
} from '../../lib/ai';
import { motion } from 'framer-motion';
import { Clock, Target, BookOpen, Star, Brain, Calendar, MessageSquare } from 'lucide-react';

export default function MyCourses() {
  const user = useUserStore((state) => state.user);
  const [activeTab, setActiveTab] = useState('in-progress');
  const [studyPlan, setStudyPlan] = useState<any>(null);
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [studyAssistant, setStudyAssistant] = useState<{
    visible: boolean;
    response: any;
  }>({
    visible: false,
    response: null
  });

  useEffect(() => {
    if (user && selectedCourse) {
      generateCourseAssessment();
      optimizeLearningSchedule();
    }
  }, [selectedCourse]);

  const generateCourseAssessment = async () => {
    if (!selectedCourse) return;
    
    setLoading(true);
    try {
      const result = await generateAssessment({
        currentTopic: selectedCourse.title,
        scores: user?.progress || {},
        gaps: ['topic1', 'topic2'] // This should come from actual learning analytics
      });
      setAssessment(result);
    } catch (error) {
      console.error('Error generating assessment:', error);
    }
    setLoading(false);
  };

  const optimizeLearningSchedule = async () => {
    try {
      const schedule = await optimizeSchedule({
        peakTimes: ['morning', 'evening'],
        availability: {
          weekday: ['09:00-12:00', '15:00-18:00'],
          weekend: ['10:00-15:00']
        },
        topicDifficulty: {
          [selectedCourse?.title || '']: 'intermediate'
        },
        goals: user?.goals || []
      });
      setStudyPlan(schedule);
    } catch (error) {
      console.error('Error optimizing schedule:', error);
    }
  };

  const getAIAssistance = async (query: string) => {
    try {
      const assistance = await getStudyAssistance(query, {
        topic: selectedCourse?.title || '',
        history: [],
        level: user?.level || 'beginner'
      });
      setStudyAssistant({
        visible: true,
        response: assistance
      });
    } catch (error) {
      console.error('Error getting AI assistance:', error);
    }
  };

  if (!user) return null;

  const enrolledCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 65,
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      duration: "6 hours",
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "Python for Data Science",
      progress: 30,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      duration: "8 hours",
      lastAccessed: "1 week ago"
    },
    {
      id: 3,
      title: "JavaScript Advanced Concepts",
      progress: 80,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      duration: "5 hours",
      lastAccessed: "3 days ago"
    }
  ];

  const completedCourses = [
    {
      id: 4,
      title: "HTML & CSS Basics",
      completedDate: "2024-02-15",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      duration: "4 hours",
      certificate: true
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Courses</h1>
        
        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            className={`pb-4 px-4 ${
              activeTab === 'in-progress'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`pb-4 px-4 ${
              activeTab === 'completed'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {activeTab === 'in-progress' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <span>Last accessed: {course.lastAccessed}</span>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      setSelectedCourse(course);
                      generateCourseAssessment();
                    }}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </button>
                  <button 
                    onClick={() => getAIAssistance("Help me understand " + course.title)}
                    className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    Get AI Assistance
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-green-500">
                    <Star className="w-4 h-4 mr-1" />
                    Completed
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Completed on: {new Date(course.completedDate).toLocaleDateString()}
                </p>
                {course.certificate && (
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    View Certificate
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* AI Study Assistant Dialog */}
      {studyAssistant.visible && studyAssistant.response && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">AI Study Assistant</h3>
              <button 
                onClick={() => setStudyAssistant({ visible: false, response: null })}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Explanation</h4>
                <p className="text-gray-700">{studyAssistant.response.explanation}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Examples</h4>
                <ul className="list-disc list-inside space-y-2">
                  {studyAssistant.response.examples.map((example: string, index: number) => (
                    <li key={index} className="text-gray-700">{example}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Practice Questions</h4>
                <ul className="list-decimal list-inside space-y-2">
                  {studyAssistant.response.practiceQuestions.map((question: string, index: number) => (
                    <li key={index} className="text-gray-700">{question}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Assessment Modal */}
      {assessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Knowledge Assessment</h3>
              <button 
                onClick={() => setAssessment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              {assessment.questions.map((q: any, index: number) => (
                <div key={index} className="space-y-3">
                  <p className="font-medium">{q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((option: string, optIndex: number) => (
                      <label key={optIndex} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                        <input type="radio" name={`question-${index}`} className="text-blue-500" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Submit Assessment
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Study Plan Modal */}
      {studyPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Optimized Study Schedule</h3>
              <button 
                onClick={() => setStudyPlan(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {studyPlan.schedule.map((item: any, index: number) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">{item.time} - {item.topic}</p>
                    <p className="text-sm text-gray-500">{item.duration} • {item.type}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <h4 className="font-medium mb-2">Recommended Breaks</h4>
                <ul className="list-disc list-inside">
                  {studyPlan.breaks.map((break_: string, index: number) => (
                    <li key={index} className="text-gray-700">{break_}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}