import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Zap, 
  Eye, 
  Brain, 
  Shield,
  Satellite,
  MapPin,
  Users
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: 'Continuous surveillance of disaster-prone areas using satellite imagery and IoT sensors.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models for damage assessment and risk prediction.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Instant Alerts',
      description: 'Immediate notifications to emergency responders and affected communities.',
      color: 'from-yellow-500 to-red-500'
    }
  ];

  const problems = [
    {
      title: 'Delayed Awareness',
      description: 'Traditional disaster response often suffers from delayed information flow, leading to slower rescue operations.',
      impact: '72% slower response times'
    },
    {
      title: 'Limited Intelligence',
      description: 'Lack of comprehensive data integration makes it difficult to assess the full scope of disasters.',
      impact: '40% resource inefficiency'
    },
    {
      title: 'Communication Gaps',
      description: 'Poor coordination between agencies and communities hampers effective disaster management.',
      impact: '60% coordination delays'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ResQ-Intel
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 mb-4 max-w-4xl mx-auto">
              AI-powered Disaster Mapping for Faster Rescues
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Revolutionizing emergency response with real-time intelligence, 
              AI-driven analysis, and comprehensive disaster mapping solutions.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">The Problem</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Current disaster response systems face critical challenges that cost lives and resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
              >
                <div className="text-red-400 text-3xl font-bold mb-2">{problem.impact}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{problem.title}</h3>
                <p className="text-gray-400">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Our Solution</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              DIMP integrates cutting-edge AI technology with real-time data to transform disaster response
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-cyan-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Satellite, value: '50+', label: 'Satellite Sources' },
                { icon: MapPin, value: '10K+', label: 'Locations Monitored' },
                { icon: Users, value: '500+', label: 'Lives Saved' },
                { icon: Shield, value: '99.9%', label: 'Uptime Guarantee' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Disaster Response?</h2>
            <p className="text-xl text-gray-400 mb-10">
              Join the revolution in emergency management with AI-powered intelligence and real-time insights.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Launch Dashboard
              <ArrowRight className="ml-3 w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;