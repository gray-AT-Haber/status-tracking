import React, { useState } from 'react';
import Header from './components/Header';
import StatusGauge from './components/StatusGauge';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import ConnectionStatus from './components/ConnectionStatus';
import { SensorData } from './types/sensor';
import { calculateSensorStats, exportToCSV } from './utils/dataUtils';
import { useSensorData } from './hooks/useSensorData';
import { FiDownload, FiWifi, FiWifiOff, FiRefreshCw } from 'react-icons/fi';

export interface DataTableProps {
  data: SensorData[];
  onRowSelect: (sensor: SensorData) => void;
  onExport: () => void;
  rowClassName?: string;
}

function App() {
  const { 
    sensorData, 
    isLoading, 
    error, 
    lastUpdated, 
    refresh, 
    isConnected 
  } = useSensorData(300000); // 5 minutes auto-refresh
  
  const [selectedSensor, setSelectedSensor] = useState<SensorData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleExport = () => {
    exportToCSV(sensorData, 'sensor-deployment-status');
  };

  const stats = calculateSensorStats(sensorData);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Header 
        onRefresh={refresh} 
        isRefreshing={isLoading} 
        lastUpdated={lastUpdated}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Status Banner */}
        <div className="mb-8">
          <div className={`rounded-lg shadow-sm border p-4 flex items-center justify-between transition-all duration-300 ${
            isConnected 
              ? 'bg-green-500 bg-opacity-20 border-green-500 text-green-300' 
              : 'bg-red-500 bg-opacity-20 border-red-500 text-red-300'
          }`}>
            <div className="flex items-center space-x-3">
              {isConnected ? (
                <FiWifi className="text-green-300 text-xl animate-pulse" />
              ) : (
                <FiWifiOff className="text-red-300 text-xl animate-pulse" />
              )}
              <ConnectionStatus 
                isConnected={isConnected}
                error={error}
                lastUpdated={lastUpdated}
                isDarkMode={isDarkMode}
              />
            </div>
            {!isConnected && !error && (
              <div className="text-sm flex items-center space-x-2">
                <span className="font-medium">Setup Required:</span>
                <span>Configure Google Sheets API to enable live data</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Gauge & Export */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              <StatusGauge 
                stats={stats} 
                isDarkMode={isDarkMode}
                className="h-80 w-full"
              />
              
              <button
                onClick={handleExport}
                className={`w-full inline-flex items-center px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400'
                }`}
              >
                <FiDownload className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Middle Column - Table */}
          <div className="lg:col-span-8">
            <div className="space-y-4">
              <DataTable
                data={sensorData}
                onRowSelect={setSelectedSensor}
                onExport={handleExport}
                rowClassName={`hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} cursor-pointer transition-all duration-150`}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40 transition-all duration-300">
          <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} rounded-lg p-8 shadow-xl animate-fade-in`}>
            <div className="flex items-center space-x-3">
              <FiRefreshCw className="animate-spin text-blue-500 text-2xl" />
              <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-700'} font-medium`}>Refreshing sensor data...</span>
            </div>
          </div>
        </div>
      )}

      <DetailPanel
        sensor={selectedSensor}
        onClose={() => setSelectedSensor(null)}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <footer className={`py-6 ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm">
              <span>© 2025 Sensor Monitoring Dashboard</span>
              <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>|</span>
              <span>Paper/Pulp Plant Operations</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center space-x-1">
                <FiDownload className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>Version 1.0.0</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FiRefreshCw className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span>Production Ready</span>
              </span>
              <span>•</span>
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
