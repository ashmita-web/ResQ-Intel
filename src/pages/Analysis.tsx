import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Eye, 
  Waves, 
  Building, 
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Zap
} from 'lucide-react';

const Analysis = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const analysisModules = [
    {
      id: 'damage-detection',
      title: 'Damage Detection',
      description: 'AI-powered building and infrastructure damage assessment using ResNet and UNet architectures',
      icon: Building,
      model: 'ResNet-50 + UNet',
      accuracy: '94.2%',
      processingTime: '2.3s',
      color: 'from-red-500 to-red-600',
      inputSample: 'Satellite imagery of urban area',
      outputDescription: 'Detected 23 damaged buildings with 94% confidence',
      features: [
        'Building collapse detection',
        'Structural damage assessment',
        'Infrastructure impact analysis',
        'Damage severity classification'
      ]
    },
    {
      id: 'flood-detection',
      title: 'Flood Detection',
      description: 'Water level monitoring and flood extent mapping using DeepLabv3 semantic segmentation',
      icon: Waves,
      model: 'DeepLabv3+',
      accuracy: '96.8%',
      processingTime: '1.8s',
      color: 'from-blue-500 to-blue-600',
      inputSample: 'Multi-spectral satellite data',
      outputDescription: 'Identified 15.2 km² flood-affected area',
      features: [
        'Water body segmentation',
        'Flood extent mapping',
        'Water level estimation',
        'Flow direction analysis'
      ]
    },
    {
      id: 'infrastructure-detection',
      title: 'Infrastructure Detection',
      description: 'Critical infrastructure identification and status assessment using YOLOv8 and Detectron2',
      icon: Eye,
      model: 'YOLOv8 + Detectron2',
      accuracy: '91.7%',
      processingTime: '3.1s',
      color: 'from-purple-500 to-purple-600',
      inputSample: 'High-resolution drone footage',
      outputDescription: 'Detected 142 infrastructure objects',
      features: [
        'Bridge and road detection',
        'Power line identification',
        'Hospital and school mapping',
        'Transportation hub analysis'
      ]
    },
    {
      id: 'social-nlp',
      title: 'Social Media NLP',
      description: 'Real-time social media sentiment analysis and emergency event extraction using BERT and LLaMA',
      icon: MessageSquare,
      model: 'BERT + LLaMA-2',
      accuracy: '88.9%',
      processingTime: '0.9s',
      color: 'from-green-500 to-green-600',
      inputSample: 'Social media posts and news feeds',
      outputDescription: 'Processed 1,247 posts, 67% emergency-related',
      features: [
        'Emergency keyword detection',
        'Sentiment analysis',
        'Location extraction',
        'Urgency classification'
      ]
    }
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI Analysis Modules</h1>
          <p className="text-xl text-gray-400">
            Advanced machine learning models for comprehensive disaster intelligence
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {analysisModules.map((module, index) => {
            const Icon = module.icon;
            const isActive = activeModule === module.id;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 ${
                  isActive ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${module.color} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                        <p className="text-white/80 text-sm">{module.model}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white text-2xl font-bold">{module.accuracy}</div>
                      <div className="text-white/80 text-sm">Accuracy</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-300 mb-6">{module.description}</p>

                  {/* Demo Area */}
                  <div className="bg-gray-900 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-white">Live Demo</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setActiveModule(isActive ? null : module.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-red-600 hover:bg-red-700 text-white' 
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors">
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Input/Output Simulation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-sm font-medium text-gray-400 mb-2">Input</div>
                        <div className="text-white">{module.inputSample}</div>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                        <div className="text-sm font-medium text-gray-400 mb-2">Output</div>
                        <div className="text-white">{module.outputDescription}</div>
                      </div>
                    </div>

                    {/* Processing Indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="animate-spin">
                            <Brain className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-blue-400 font-medium">Processing...</div>
                            <div className="text-xs text-gray-400">
                              Average processing time: {module.processingTime}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-gray-300">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${module.color}`} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-3 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-green-400 font-bold">{module.accuracy}</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div className="text-yellow-400 font-bold">{module.processingTime}</div>
                      <div className="text-xs text-gray-400">Processing</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Brain className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="text-purple-400 font-bold">AI</div>
                      <div className="text-xs text-gray-400">Powered</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 bg-gray-800 rounded-2xl border border-gray-700 p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Platform Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Models Deployed', value: '12', icon: Brain },
              { label: 'Images Processed', value: '45.2K', icon: Eye },
              { label: 'Average Accuracy', value: '92.9%', icon: TrendingUp },
              { label: 'Processing Speed', value: '2.1s', icon: Zap }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analysis;