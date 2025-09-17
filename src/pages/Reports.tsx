import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  MapPin, 
  Clock,
  Eye,
  Filter,
  Plus,
  Search,
  FileImage,
  Archive
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Report {
  id: string;
  title: string;
  type: 'PDF' | 'GeoTIFF' | 'KMZ';
  location: string;
  createdAt: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
  preview?: string;
}

const Reports = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const reports: Report[] = [
    {
      id: '1',
      title: 'Flood Damage Assessment - Downtown',
      type: 'PDF',
      location: 'Downtown District',
      createdAt: '2024-01-15 14:30',
      size: '2.3 MB',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Satellite Imagery Analysis',
      type: 'GeoTIFF',
      location: 'Metropolitan Area',
      createdAt: '2024-01-15 12:15',
      size: '15.7 MB',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Emergency Response Map',
      type: 'KMZ',
      location: 'Harbor District',
      createdAt: '2024-01-15 10:45',
      size: '5.1 MB',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Infrastructure Damage Report',
      type: 'PDF',
      location: 'Industrial Zone',
      createdAt: '2024-01-15 09:20',
      size: '4.8 MB',
      status: 'completed'
    },
    {
      id: '5',
      title: 'Population Displacement Analysis',
      type: 'PDF',
      location: 'Residential Areas',
      createdAt: '2024-01-14 16:30',
      size: '3.2 MB',
      status: 'completed'
    },
    {
      id: '6',
      title: 'Real-time Damage Assessment',
      type: 'PDF',
      location: 'City Center',
      createdAt: '2024-01-14 14:15',
      size: '1.9 MB',
      status: 'processing'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return FileText;
      case 'GeoTIFF': return FileImage;
      case 'KMZ': return Archive;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-600';
      case 'GeoTIFF': return 'bg-blue-600';
      case 'KMZ': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.type === filter;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = (report: Report) => {
    toast.success(`Downloading ${report.title}...`);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    toast.loading('Generating new report...', { duration: 3000 });
    
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Report generated successfully!');
    }, 3000);
  };

  const reportTypes = [
    { value: 'all', label: 'All Reports', count: reports.length },
    { value: 'PDF', label: 'PDF Reports', count: reports.filter(r => r.type === 'PDF').length },
    { value: 'GeoTIFF', label: 'GeoTIFF Files', count: reports.filter(r => r.type === 'GeoTIFF').length },
    { value: 'KMZ', label: 'KMZ Files', count: reports.filter(r => r.type === 'KMZ').length }
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-4xl font-bold text-white mb-2">Report Generation</h1>
              <p className="text-xl text-gray-400">
                Generate and manage disaster intelligence reports
              </p>
            </div>
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isGenerating
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105'
              }`}
            >
              <Plus className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating...' : 'Generate New Report'}</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilter(type.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{type.label}</span>
                <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => {
            const TypeIcon = getTypeIcon(report.type);
            
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${getTypeColor(report.type)} rounded-lg flex items-center justify-center`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(report.status)}`}>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {report.title}
                  </h3>
                  
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>{report.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{report.createdAt}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 ${getTypeColor(report.type)} text-xs rounded-full text-white`}>
                        {report.type}
                      </span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(report)}
                    disabled={report.status !== 'completed'}
                    className={`flex items-center justify-center space-x-2 flex-1 py-2 px-4 rounded-lg transition-all ${
                      report.status === 'completed'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  
                  <button 
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
                    onClick={() => toast.success('Preview opened')}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No reports found</h3>
            <p className="text-gray-500">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Generate your first report to get started'
              }
            </p>
          </motion.div>
        )}

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 bg-gray-800 rounded-2xl border border-gray-700 p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Report Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Reports', value: reports.length.toString(), icon: FileText },
              { label: 'Completed', value: reports.filter(r => r.status === 'completed').length.toString(), icon: Download },
              { label: 'Processing', value: reports.filter(r => r.status === 'processing').length.toString(), icon: Clock },
              { label: 'Total Size', value: '32.1 MB', icon: Archive }
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

export default Reports;