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

  const handleExport = () => {
    exportToCSV(sensorData, 'sensor-deployment-status');
  };

  const stats = calculateSensorStats(sensorData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-green-50 transition-all duration-500">
      <Header
        onRefresh={refresh}
        isRefreshing={isLoading}
        lastUpdated={lastUpdated}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Status Banner */}
        <div className="mb-8">
          <div className={`rounded-lg shadow-sm border p-4 flex items-center justify-between transition-all duration-300 ${
            isConnected ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-3">
              {isConnected ? (
                <FiWifi className="text-green-500 text-xl" />
              ) : (
                <FiWifiOff className="text-red-500 text-xl animate-pulse" />
              )}
              <ConnectionStatus 
                isConnected={isConnected}
                error={error}
                lastUpdated={lastUpdated}
              />
            </div>
            {!isConnected && !error && (
              <div className="text-sm text-amber-600 flex items-center space-x-2">
                <span className="font-medium">Setup Required:</span>
                <span>Configure Google Sheets API to enable live data</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-8">
          <StatusGauge stats={stats} />
          
          <div className="flex justify-end mb-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <FiDownload className="mr-2" />
              Export CSV
            </button>
          </div>
          <DataTable
            data={sensorData}
            onRowSelect={setSelectedSensor}
            onExport={handleExport}
            rowClassName="hover:bg-blue-50 cursor-pointer transition-all duration-150"
          />
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40 transition-all duration-300">
          <div className="bg-white rounded-lg p-8 shadow-xl animate-fade-in">
            <div className="flex items-center space-x-3">
              <FiRefreshCw className="animate-spin text-blue-600 text-2xl" />
              <span className="text-gray-700 font-medium">Refreshing sensor data...</span>
            </div>
          </div>
        </div>
      )}

      <DetailPanel
        sensor={selectedSensor}
        onClose={() => setSelectedSensor(null)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>© 2025 Sensor Monitoring Dashboard</span>
              <span className="text-gray-400">|</span>
              <span>Paper/Pulp Plant Operations</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <FiDownload className="text-blue-500" />
                <span>Version 1.0.0</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <FiRefreshCw className="text-green-500" />
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