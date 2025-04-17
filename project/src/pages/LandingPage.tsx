import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Background from '../components/3d/Background';
import {
  Brain,
  Rocket,
  Target,
  Users,
  BookOpen,
  Award,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "AI-Powered Learning",
      description: "Personalized learning paths tailored to your goals and preferences"
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: "Adaptive Progress Tracking",
      description: "Real-time progress monitoring and performance analytics"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Collaborative Learning",
      description: "Connect with peers and form study groups"
    },
    {
      icon: <Rocket className="w-8 h-8 text-red-500" />,
      title: "Interactive Content",
      description: "Engage with dynamic and interactive learning materials"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-8 gradient-text">
                Transform Your Learning Journey with AI
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto glass-effect p-6 rounded-xl"
            >
              Experience personalized learning powered by artificial intelligence.
              Master new skills at your own pace with adaptive content and real-time feedback.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <button
                onClick={() => navigate('/register')}
                className="btn-animate px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all flex items-center shadow-glow"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="btn-animate px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all"
              >
                Sign In
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4" data-aos="fade-up">
              Why Choose LearnHub?
            </h2>
            <p className="text-xl text-gray-600" data-aos="fade-up" data-aos-delay="200">
              Discover the features that make learning effective and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="card-glow glass-effect p-8 rounded-xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mb-6 animate-float">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="animated-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-8 rounded-xl"
              data-aos="fade-up"
            >
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100">Active Learners</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-8 rounded-xl"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-blue-100">Courses Available</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-effect p-8 rounded-xl"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="text-4xl font-bold gradient-text mb-8"
            data-aos="fade-up"
          >
            Ready to Start Your Learning Journey?
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <button
              onClick={() => navigate('/register')}
              className="btn-animate px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all flex items-center mx-auto shadow-glow"
            >
              Join LearnHub Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}