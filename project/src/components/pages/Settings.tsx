import React, { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { Bell, Lock, Eye, Globe, Moon, Volume2 } from 'lucide-react';

export default function Settings() {
  const user = useUserStore((state) => state.user);
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    updates: false,
    reminders: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showProgress: true,
    showActivity: true
  });
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    soundEnabled: true
  });

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Settings</h1>

      <div className="space-y-8">
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Desktop Notifications</h3>
                <p className="text-sm text-gray-500">Show desktop alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.desktop}
                  onChange={(e) => setNotifications({ ...notifications, desktop: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <Lock className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Profile Visibility</h3>
              <select
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Show Progress</h3>
                <p className="text-sm text-gray-500">Display your learning progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy.showProgress}
                  onChange={(e) => setPrivacy({ ...privacy, showProgress: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-semibold">Preferences</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Language</h3>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-500">Use dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.theme === 'dark'}
                  onChange={(e) => setPreferences({ ...preferences, theme: e.target.checked ? 'dark' : 'light' })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Sound Effects</h3>
                <p className="text-sm text-gray-500">Enable sound effects</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.soundEnabled}
                  onChange={(e) => setPreferences({ ...preferences, soundEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}