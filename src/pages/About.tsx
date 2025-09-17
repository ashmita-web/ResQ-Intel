import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Target, 
  Zap,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Maithri Sri Meda',
      role: 'AI/ML Engineer',
      college: 'B.Tech, 4th Year',
      branch: 'Computer Science & Engineering',
      expertise: 'Computer Vision, Deep Learning, NLP',
      github: 'june-evans',
      linkedin: 'june-evans',
      email: 'june@resq-intel.com'
    },
    {
      name: 'Ashmitha Luthra',
      role: 'Full-Stack Developer',
      college: 'B.Tech, 4th Year',
      branch: 'Information Technology',
      expertise: 'React, Node.js, GIS Systems',
      github: 'aarav-mehta',
      linkedin: 'aarav-mehta',
      email: 'aarav@resq-intel.com'
    },
    {
      name: 'Garima Singh',
      role: 'Data Scientist',
      college: 'B.Tech, 4th Year',
      branch: 'Computer Engineering',
      expertise: 'Satellite Imagery, Data Analysis',
      github: 'priya-nair',
      linkedin: 'priya-nair',
      email: 'priya@resq-intel.com'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Social Good',
      description: 'Open-source design enables adaptation by local governments, NGOs, and research institutes'
    },
    {
      icon: Target,
      title: 'AI for Resilience',
      description: 'Targeted disaster response using multi-modal AI'
    },
    {
      icon: Zap,
      title: 'Real-time Insights',
      description: 'Live disaster map with instant situation analysis'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Designed for emergency responders and NGOs'
    }
  ];

  const projectHighlights = [
    'Real-time AI-powered disaster analysis using satellite & drone imagery',
    'Interactive mapping platform with multi-layered visualization',
    'Continuous learning system that improves with user feedback',
    'Automated damage, flood, and infrastructure detection modules',
    'Comprehensive report generation and data export features',
    'Mobile-friendly responsive design for on-field use'
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About ResQ-Intel
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto">
            Revolutionizing disaster response through AI-powered intelligence and real-time mapping
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-blue-400 font-medium">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.college} • {member.branch}</p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 text-sm text-center">{member.expertise}</p>
                </div>

                <div className="flex justify-center space-x-3">
                  <a
                    href={`https://github.com/${member.github}`}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 text-gray-300" />
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.linkedin}`}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-4 h-4 text-gray-300" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4 text-gray-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="bg-gray-800 rounded-xl border border-gray-700 p-6 text-center hover:border-gray-600 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-400">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Project Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Technical Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex-shrink-0" />
                  <p className="text-gray-300">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-400 mb-6">
              Interested in collaborating or learning more about ResQ-Intel?
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:team@resq-intel.com"
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition-all transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </a>
              <a
                href="https://github.com/resq-intel"
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold transition-all transform hover:scale-105"
              >
                <Github className="w-5 h-5" />
                <span>View Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
