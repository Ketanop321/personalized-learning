import React, { useState, useEffect } from 'react';
import { searchCourses, YouTubeVideo } from '../../lib/youtube';
import { Clock, Search, BookOpen, Star } from 'lucide-react';

export default function CourseList() {
  const [courses, setCourses] = useState<YouTubeVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('programming');

  const topics = [
    'programming',
    'web development',
    'machine learning',
    'data science',
    'mobile development',
    'cloud computing'
  ];

  useEffect(() => {
    fetchCourses(selectedTopic);
  }, [selectedTopic]);

  const fetchCourses = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchCourses(query);
      setCourses(results);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchCourses(searchQuery);
    }
  };

  return (
    <div className="p-6">
      {/* Search and Filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for courses..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedTopic === topic
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    4.5
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{course.channelTitle}</span>
                  <button
                    onClick={() => window.open(`https://youtube.com/watch?v=${course.id}`, '_blank')}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}