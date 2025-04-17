import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { optimizeSchedule } from '../../lib/ai';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Plus, Brain, Target, BookOpen } from 'lucide-react';

export default function Schedule() {
  const user = useUserStore((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      generateSchedule();
    }
  }, [user, selectedDate]);

  const generateSchedule = async () => {
    try {
      const optimizedSchedule = await optimizeSchedule({
        peakTimes: ['morning', 'evening'],
        availability: {
          weekday: ['09:00-12:00', '15:00-18:00'],
          weekend: ['10:00-15:00']
        },
        topicDifficulty: {
          'React': 'intermediate',
          'Python': 'beginner'
        },
        goals: user?.goals || []
      });
      setSchedule(optimizedSchedule);
    } catch (error) {
      console.error('Error generating schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);
    return date;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Study Session
        </button>
      </div>

      {/* Date Selector */}
      <div className="mb-8">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {next7Days.map((date, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center min-w-[100px] p-4 rounded-lg ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-200 hover:border-blue-500'
              }`}
            >
              <span className="text-sm">{weekDays[date.getDay()]}</span>
              <span className="text-2xl font-bold">{date.getDate()}</span>
              <span className="text-sm">{date.toLocaleString('default', { month: 'short' })}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Schedule */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6">
            {selectedDate.toLocaleDateString('default', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
          
          <div className="space-y-4">
            {schedule?.schedule.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-20 text-sm font-medium text-gray-600">{item.time}</div>
                <div className="flex-1 ml-4">
                  <h3 className="text-sm font-medium text-gray-900">{item.topic}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.duration}
                    <span className="mx-2">•</span>
                    {item.type}
                  </div>
                </div>
                <button className="ml-4 text-blue-500 hover:text-blue-700">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Break Recommendations */}
          {schedule?.breaks && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Recommended Breaks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedule.breaks.map((break_: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-3 bg-green-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Brain className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-sm text-green-700">{break_}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Review Sessions */}
          {schedule?.reviews && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Review Sessions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {schedule.reviews.map((review: string, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                    </div>
                    <span className="text-sm text-blue-700">{review}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}