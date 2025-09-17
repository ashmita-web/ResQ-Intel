import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Clock, 
  MapPin,
  Filter,
  Bell
} from 'lucide-react';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  title: string;
  location: string;
  time: string;
  urgency: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'info': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'high': return 'bg-red-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Real-time Alerts</h3>
        </div>
        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Filter className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Alerts List */}
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <AnimatePresence>
          {alerts.map((alert, index) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: 20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`p-3 rounded-lg border ${getAlertColor(alert.type)} hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${alert.type === 'critical' ? 'animate-pulse' : ''}`}>
                    <Icon className={`w-4 h-4 ${getIconColor(alert.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-white truncate">
                        {alert.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs rounded-full text-white ${getUrgencyColor(alert.urgency)}`}>
                        {alert.urgency}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Alert Summary */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
            <div className="text-red-400 text-lg font-bold">
              {alerts.filter(a => a.type === 'critical').length}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2">
            <div className="text-yellow-400 text-lg font-bold">
              {alerts.filter(a => a.type === 'warning').length}
            </div>
            <div className="text-xs text-gray-400">Warning</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2">
            <div className="text-blue-400 text-lg font-bold">
              {alerts.filter(a => a.type === 'info').length}
            </div>
            <div className="text-xs text-gray-400">Info</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;