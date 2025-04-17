import React, { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { generatePersonalizedPath, generateStudyPlan } from '../../lib/ai';
import {
  User,
  Settings,
  BookOpen,
  Award,
  Clock,
  Calendar,
  LogOut,
  Brain,
  Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, setUser, updateProgress } = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    level: user?.level || 'beginner',
    interests: user?.interests || [],
    goals: user?.goals || []
  });

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Generate new learning path based on updated preferences
      const learningPath = await generatePersonalizedPath(
        formData.interests,
        formData.goals,
        formData.level
      );

      // Generate study plan
      const studyPlan = await generateStudyPlan(
        10, // Default to 10 hours per week
        formData.interests,
        'visual' // Default learning style
      );

      setUser({
        ...user!,
        ...formData,
        learningPath,
        studyPlan
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setLoading(false);
  };

  if (!user) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end">
              <div className="flex items-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=128&background=random`}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-white"
                />
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <p className="text-blue-100">{user.email}</p>
                </div>
              </div>
              <div className="ml-auto">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-white text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {editMode ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interests
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Web Development',
                      'Machine Learning',
                      'Data Science',
                      'Mobile Development',
                      'Cloud Computing',
                      'DevOps',
                      'Cybersecurity',
                      'UI/UX Design',
                      'Blockchain'
                    ].map((interest) => (
                      <label key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={(e) => {
                            const newInterests = e.target.checked
                              ? [...formData.interests, interest]
                              : formData.interests.filter((i) => i !== interest);
                            setFormData({ ...formData, interests: newInterests });
                          }}
                          className="rounded text-blue-500"
                        />
                        <span>{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Learning Goals
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter a goal and press Enter"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value) {
                          setFormData({
                            ...formData,
                            goals: [...formData.goals, e.currentTarget.value]
                          });
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <div className="space-y-2">
                      {formData.goals.map((goal, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                        >
                          <span>{goal}</span>
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                goals: formData.goals.filter((_, i) => i !== index)
                              })
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
                    <div className="space-y-4">
                      {Object.entries(user.progress).map(([topic, progress]) => (
                        <div key={topic}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{topic}</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold mb-4">Interests</h2>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Learning Goals</h2>
                  <div className="space-y-4">
                    {user.goals.map((goal, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-white rounded-lg"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Target className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{goal}</h3>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.random() * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}