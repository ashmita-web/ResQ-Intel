import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle,
  MapPin,
  Users,
  Clock,
  Download,
  Filter,
  Layers,
  RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';
import UploadPanel from '../components/UploadPanel';
import InteractiveMap from '../components/InteractiveMap';
import AlertsPanel from '../components/AlertsPanel';

type LayerKey = 'damage' | 'flood' | 'population' | 'infrastructure';
type AlertType = 'critical' | 'warning' | 'info';

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  location: string;
  time: string;
  urgency: string;
}

const Dashboard = () => {
  const [selectedLayers, setSelectedLayers] = useState<Record<LayerKey, boolean>>({
    damage: true,
    flood: true,
    population: true,
    infrastructure: false
  });

  const [timeSlider, setTimeSlider] = useState(0);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'critical',
      title: 'Severe Flooding Detected',
      location: 'Downtown District',
      time: '2 minutes ago',
      urgency: 'High'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Building Damage Identified',
      location: 'Residential Area',
      time: '5 minutes ago',
      urgency: 'Medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'Population Movement',
      location: 'Safe Zone Alpha',
      time: '8 minutes ago',
      urgency: 'Low'
    }
  ]);

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now(),
        type: (['critical','warning','info'][Math.floor(Math.random()*3)]) as AlertType,
        title: [
          'New Damage Detected',
          'Flood Level Rising',
          'Population Displacement',
          'Infrastructure Failure',
          'Emergency Vehicle Dispatched'
        ][Math.floor(Math.random() * 5)],
        location: [
          'District A',
          'Central Plaza',
          'Harbor Area',
          'Industrial Zone',
          'Residential Block'
        ][Math.floor(Math.random() * 5)],
        time: 'Just now',
        urgency: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
      };
      
      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
      
      if (newAlert.type === 'critical') {
        toast.error(`Critical Alert: ${newAlert.title} in ${newAlert.location}`);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Incidents', value: '23', icon: AlertTriangle, color: 'text-red-400' },
    { label: 'Affected Areas', value: '7', icon: MapPin, color: 'text-blue-400' },
    { label: 'People Evacuated', value: '1,247', icon: Users, color: 'text-green-400' },
    { label: 'Response Time', value: '12min', icon: Clock, color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1600px] mx-auto"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Disaster Intelligence Dashboard</h1>
          <p className="text-gray-400">Real-time monitoring and AI-powered disaster analysis</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-800 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-160px)]">
          {/* Left Sidebar - Upload Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="col-span-12 lg:col-span-3 flex flex-col overflow-y-auto"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex-1">
              <UploadPanel />
            </div>
          </motion.div>

          {/* Main Panel - Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="col-span-12 lg:col-span-6 flex flex-col"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 flex-1 flex flex-col overflow-hidden">
              {/* Map Controls */}
              <div className="p-4 border-b border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">Real-Time Intelligence Map</h3>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Layers className="w-4 h-4 text-gray-300" />
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-gray-300" />
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <RotateCcw className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.entries(selectedLayers).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedLayers(prev => ({ ...prev, [key as LayerKey]: !prev[key as LayerKey] }))}
                      className={`px-3 py-1 text-xs rounded-full border transition-all ${
                        value 
                          ? 'bg-blue-600 text-white border-blue-500' 
                          : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Time Slider */}
                <div className="mt-3">
                  <label className="text-xs text-gray-400 mb-1 block">Time Evolution</label>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={timeSlider}
                    onChange={(e) => setTimeSlider(Number(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0h</span>
                    <span className="text-blue-400 font-medium">{timeSlider}h ago</span>
                    <span>24h</span>
                  </div>
                </div>
              </div>

              {/* Map Area */}
              <div className="flex-1 overflow-hidden">
                <InteractiveMap layers={selectedLayers} timeOffset={timeSlider} />
              </div>
            </div>
          </motion.div>

          {/* Right Sidebar - Alerts & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="col-span-12 lg:col-span-3 flex flex-col space-y-4 overflow-y-auto"
          >
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 flex-1">
              <AlertsPanel alerts={alerts} />
            </div>
            
            {/* Export Panel */}
            <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => toast.success('PDF report generated successfully!')}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export PDF</span>
                </button>
                <button 
                  onClick={() => toast.success('GeoTIFF file exported!')}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export GeoTIFF</span>
                </button>
                <button 
                  onClick={() => toast.success('KMZ file ready for download!')}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export KMZ</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
