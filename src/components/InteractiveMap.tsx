import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Users, Waves, Building } from 'lucide-react';

interface MapProps {
  layers: {
    damage: boolean;
    flood: boolean;
    population: boolean;
    infrastructure: boolean;
  };
  timeOffset: number;
}

interface MapMarker {
  id: string;
  type: 'damage' | 'flood' | 'population' | 'infrastructure';
  lat: number;
  lng: number;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedCount?: number;
}

const InteractiveMap: React.FC<MapProps> = ({ layers, timeOffset }) => {
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);

  useEffect(() => {
    // Generate mock markers based on time offset and layers
    const baseMarkers: MapMarker[] = [
      {
        id: '1',
        type: 'damage',
        lat: 40.7128,
        lng: -74.0060,
        title: 'Building Collapse',
        severity: 'critical',
        description: 'Multi-story residential building partially collapsed',
        affectedCount: 45
      },
      {
        id: '2',
        type: 'flood',
        lat: 40.7589,
        lng: -73.9851,
        title: 'Severe Flooding',
        severity: 'high',
        description: 'Water level 3.2m above normal',
        affectedCount: 120
      },
      {
        id: '3',
        type: 'population',
        lat: 40.6892,
        lng: -74.0445,
        title: 'Evacuation Center',
        severity: 'medium',
        description: 'Temporary shelter for displaced residents',
        affectedCount: 280
      },
      {
        id: '4',
        type: 'infrastructure',
        lat: 40.7831,
        lng: -73.9712,
        title: 'Power Grid Failure',
        severity: 'high',
        description: 'Electrical substation damaged',
        affectedCount: 5000
      },
      {
        id: '5',
        type: 'damage',
        lat: 40.7282,
        lng: -73.7949,
        title: 'Structural Damage',
        severity: 'medium',
        description: 'Commercial building facade damaged',
        affectedCount: 12
      }
    ];

    // Filter markers based on active layers and modify based on time offset
    const filteredMarkers = baseMarkers
      .filter(marker => layers[marker.type])
      .map(marker => ({
        ...marker,
        // Simulate time evolution
        severity: timeOffset > 12 ? 
          (marker.severity === 'medium' ? 'high' : marker.severity) :
          timeOffset > 6 ?
            (marker.severity === 'low' ? 'medium' : marker.severity) :
            marker.severity
      }));

    setMarkers(filteredMarkers);
  }, [layers, timeOffset]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'damage': return AlertTriangle;
      case 'flood': return Waves;
      case 'population': return Users;
      case 'infrastructure': return Building;
      default: return MapPin;
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      {/* Mock Map Background */}
      <div 
        className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.02) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.02) 75%)
          `,
          backgroundSize: '50px 50px, 80px 80px, 20px 20px'
        }}
      >
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Map Markers */}
        {markers.map((marker) => {
          const Icon = getMarkerIcon(marker.type);
          const position = {
            left: `${((marker.lng + 74.1) * 100) % 100}%`,
            top: `${((40.8 - marker.lat) * 100) % 100}%`
          };

          return (
            <motion.div
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: Math.random() * 0.5, duration: 0.3 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={position}
              onMouseEnter={() => setHoveredMarker(marker)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              {/* Pulse Animation */}
              <div className={`absolute inset-0 rounded-full ${getSeverityColor(marker.severity)} opacity-30 animate-ping`} />
              
              {/* Marker */}
              <div className={`relative w-8 h-8 ${getSeverityColor(marker.severity)} rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
                <Icon className="w-4 h-4 text-white" />
              </div>

              {/* Tooltip */}
              {hoveredMarker?.id === marker.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-3 z-20"
                >
                  <div className="text-white font-medium mb-1">{marker.title}</div>
                  <div className="text-gray-300 text-sm mb-2">{marker.description}</div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className={`px-2 py-1 rounded-full text-white ${getSeverityColor(marker.severity)}`}>
                      {marker.severity.toUpperCase()}
                    </span>
                    {marker.affectedCount && (
                      <span className="text-gray-400">
                        {marker.affectedCount} affected
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 border-b border-r border-gray-700 rotate-45" />
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-gray-800 border border-gray-700 rounded-lg p-3 z-10">
          <div className="text-white text-sm font-medium mb-2">Legend</div>
          <div className="space-y-1">
            {[
              { type: 'damage', label: 'Damage', icon: AlertTriangle, color: 'bg-red-500' },
              { type: 'flood', label: 'Flood', icon: Waves, color: 'bg-blue-500' },
              { type: 'population', label: 'Population', icon: Users, color: 'bg-green-500' },
              { type: 'infrastructure', label: 'Infrastructure', icon: Building, color: 'bg-purple-500' }
            ].map((item) => {
              const Icon = item.icon;
              return layers[item.type as keyof typeof layers] ? (
                <div key={item.type} className="flex items-center space-x-2 text-xs text-gray-300">
                  <div className={`w-3 h-3 ${item.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-2 h-2 text-white" />
                  </div>
                  <span>{item.label}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Coordinates Display */}
        <div className="absolute top-4 right-4 bg-gray-800 border border-gray-700 rounded-lg p-2 z-10">
          <div className="text-xs text-gray-400">
            40.7128°N, 74.0060°W
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;