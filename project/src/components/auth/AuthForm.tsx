import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { LightbulbIcon, BookOpen } from 'lucide-react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    level: 'beginner',
    interests: [] as string[],
    goals: [] as string[]
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Simulated login for demo
      setUser({
        name: 'Demo User',
        email: formData.email,
        level: 'Intermediate',
        interests: ['Web Development', 'Machine Learning', 'Data Science'],
        goals: ['Complete React Course', 'Build 5 Projects', 'Learn Python'],
        progress: {
          'react': 65,
          'python': 30,
          'javascript': 80
        }
      });
    } else {
      if (step < 3) {
        setStep(step + 1);
        return;
      }
      setUser({
        name: formData.name,
        email: formData.email,
        level: formData.level,
        interests: formData.interests,
        goals: formData.goals,
        progress: {}
      });
    }
    navigate('/dashboard');
  };

  const interestOptions = [
    'Web Development', 'Machine Learning', 'Data Science',
    'Mobile Development', 'Cloud Computing', 'DevOps',
    'Cybersecurity', 'UI/UX Design', 'Blockchain'
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select your experience level</h3>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formData.level}
              onChange={e => setFormData({...formData, level: e.target.value})}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <h3 className="text-lg font-medium">Select your interests</h3>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map(interest => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={e => {
                      const newInterests = e.target.checked
                        ? [...formData.interests, interest]
                        : formData.interests.filter(i => i !== interest);
                      setFormData({...formData, interests: newInterests});
                    }}
                    className="rounded text-blue-500"
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">What are your learning goals?</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter a goal and press Enter"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onKeyDown={e => {
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
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span>{goal}</span>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        goals: formData.goals.filter((_, i) => i !== index)
                      })}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <LightbulbIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Welcome back!' : 'Start your learning journey'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isLogin ? (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div>
                <div className="mb-5 flex justify-between items-center">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= s ? 'bg-blue-500 text-white' : 'bg-gray-200'
                      }`}>
                        {s}
                      </div>
                      {s < 3 && (
                        <div className={`w-12 h-1 ${
                          step > s ? 'bg-blue-500' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                {renderStep()}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Sign in' : step < 3 ? 'Next' : 'Create account'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setStep(1);
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLogin ? 'Create new account' : 'Sign in to your account'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}