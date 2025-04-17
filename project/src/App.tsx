import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthForm from './components/auth/AuthForm';
import Overview from './components/pages/Overview';
import MyCourses from './components/pages/MyCourses';
import Schedule from './components/pages/Schedule';
import Settings from './components/pages/Settings';
import CourseList from './components/courses/CourseList';
import ProfilePage from './components/profile/ProfilePage';
import LandingPage from './pages/LandingPage';
import { useUserStore } from './store/userStore';

function App() {
  const user = useUserStore((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <AuthForm />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <AuthForm />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        >
          <Route index element={<Overview />} />
          <Route path="courses" element={<MyCourses />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route
          path="/courses"
          element={user ? <CourseList /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;