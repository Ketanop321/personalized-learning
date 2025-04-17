import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, BookMarked, Calendar, Settings, Brain, LogOut } from 'lucide-react';

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUserStore();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Brain className="w-8 h-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">LearnHub</span>
          </div>
          
          <nav className="flex-1 px-4 py-4 space-y-1">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                isActive('/dashboard')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5 mr-3" />
              Overview
            </button>
            
            <button
              onClick={() => navigate('/dashboard/courses')}
              className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                isActive('/dashboard/courses')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookMarked className="w-5 h-5 mr-3" />
              My Courses
            </button>
            
            <button
              onClick={() => navigate('/dashboard/schedule')}
              className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                isActive('/dashboard/schedule')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Schedule
            </button>
            
            <button
              onClick={() => navigate('/dashboard/settings')}
              className={`flex items-center w-full px-4 py-2 text-sm rounded-lg ${
                isActive('/dashboard/settings')
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.level}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto text-gray-400 hover:text-gray-600"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <header className="bg-white shadow">
          <div className="px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
            <p className="mt-1 text-sm text-gray-500">
              Continue your learning journey. You're making great progress!
            </p>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}