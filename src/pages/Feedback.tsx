import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  User, 
  Camera, 
  Send,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FeedbackEntry {
  id: string;
  userName: string;
  feedback: string;
  type: 'correction' | 'suggestion' | 'bug' | 'praise';
  timestamp: string;
  rating: number;
  hasScreenshot: boolean;
}

const Feedback = () => {
  const [formData, setFormData] = useState({
    userName: '',
    feedback: '',
    type: 'correction'
  });
  const [rating, setRating] = useState(5);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackEntries: FeedbackEntry[] = [
    {
      id: '1',
      userName: 'Dr. Sarah Chen',
      feedback: 'The flood detection model showed excellent accuracy in our recent assessment. However, I noticed some false positives in areas with shadows. Consider improving shadow handling in the algorithm.',
      type: 'correction',
      timestamp: '2024-01-15 16:30',
      rating: 4,
      hasScreenshot: true
    },
    {
      id: '2',
      userName: 'Emergency Coordinator Mike',
      feedback: 'Love the real-time alerts feature! It has significantly improved our response times. The mobile interface could use some optimization for field work.',
      type: 'praise',
      timestamp: '2024-01-15 14:15',
      rating: 5,
      hasScreenshot: false
    },
    {
      id: '3',
      userName: 'GIS Analyst Jane',
      feedback: 'The KMZ export functionality is great, but it would be helpful to have more customization options for layer styling and metadata inclusion.',
      type: 'suggestion',
      timestamp: '2024-01-15 11:45',
      rating: 4,
      hasScreenshot: false
    },
    {
      id: '4',
      userName: 'Rescue Team Leader Tom',
      feedback: 'Encountered a bug where the population displacement layer doesn\'t update properly when switching time ranges. Please investigate.',
      type: 'bug',
      timestamp: '2024-01-14 18:20',
      rating: 3,
      hasScreenshot: true
    },
    {
      id: '5',
      userName: 'Disaster Response Chief Lisa',
      feedback: 'The AI damage assessment has been incredibly accurate and has helped us prioritize our rescue operations effectively. Excellent work on the confidence scoring!',
      type: 'praise',
      timestamp: '2024-01-14 09:30',
      rating: 5,
      hasScreenshot: false
    }
  ];

  const feedbackTypes = [
    { value: 'correction', label: 'Data Correction', icon: AlertTriangle, color: 'text-yellow-400' },
    { value: 'suggestion', label: 'Feature Suggestion', icon: MessageSquare, color: 'text-blue-400' },
    { value: 'bug', label: 'Bug Report', icon: ThumbsDown, color: 'text-red-400' },
    { value: 'praise', label: 'Positive Feedback', icon: ThumbsUp, color: 'text-green-400' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.userName.trim() || !formData.feedback.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    toast.loading('Submitting feedback...', { duration: 2000 });

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Feedback submitted successfully! Thank you for helping us improve.');
      setFormData({ userName: '', feedback: '', type: 'correction' });
      setRating(5);
      setScreenshot(null);
    }, 2000);
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      toast.success('Screenshot uploaded successfully');
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = feedbackTypes.find(t => t.value === type);
    return typeConfig?.icon || MessageSquare;
  };

  const getTypeColor = (type: string) => {
    const typeConfig = feedbackTypes.find(t => t.value === type);
    return typeConfig?.color || 'text-gray-400';
  };

  const getTypeLabel = (type: string) => {
    const typeConfig = feedbackTypes.find(t => t.value === type);
    return typeConfig?.label || type;
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Continuous Learning Feedback</h1>
          <p className="text-xl text-gray-400">
            Help us improve ResQ-Intel with your valuable feedback and corrections
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Submit Feedback</h2>
                  <p className="text-gray-400">Your input helps improve our AI models</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Feedback Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Feedback Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {feedbackTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                            formData.type === type.value
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${formData.type === type.value ? 'text-white' : type.color}`} />
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`w-8 h-8 transition-colors ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Feedback Details *
                  </label>
                  <textarea
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Please provide detailed feedback, corrections, or suggestions..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Screenshot (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotUpload}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                      <Camera className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Upload Screenshot</span>
                    </label>
                    {screenshot && (
                      <span className="text-sm text-green-400">
                        ✓ {screenshot.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitting
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105'
                  }`}
                >
                  <Send className={`w-5 h-5 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Feedback'}</span>
                </button>
              </form>
            </div>
          </motion.div>

          {/* Recent Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Feedback</h2>

              <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {feedbackEntries.map((entry, index) => {
                  const Icon = getTypeIcon(entry.type);
                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {entry.userName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{entry.userName}</div>
                            <div className="flex items-center space-x-2">
                              <Icon className={`w-3 h-3 ${getTypeColor(entry.type)}`} />
                              <span className={`text-xs ${getTypeColor(entry.type)}`}>
                                {getTypeLabel(entry.type)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= entry.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          {entry.hasScreenshot && (
                            <Camera className="w-4 h-4 text-blue-400" />
                          )}
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-2">{entry.feedback}</p>

                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {entry.timestamp}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Feedback Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 bg-gray-800 rounded-xl border border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Feedback Impact</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Feedback', value: '127', color: 'text-blue-400' },
                  { label: 'Improvements Made', value: '23', color: 'text-green-400' },
                  { label: 'Average Rating', value: '4.2', color: 'text-yellow-400' },
                  { label: 'Response Time', value: '2.1d', color: 'text-purple-400' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Feedback;