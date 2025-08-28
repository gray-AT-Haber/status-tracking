import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatusGauge from './components/StatusGauge';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';
import ConnectionStatus from './components/ConnectionStatus';
import { SensorData } from './types/sensor';
import { calculateSensorStats, exportToCSV } from './utils/dataUtils';
import { useSensorData } from './hooks/useSensorData';

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
    <div className="min-h-screen bg-gray-50">
      <Header
        onRefresh={refresh}
        isRefreshing={isLoading}
        lastUpdated={lastUpdated}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Status Banner */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <ConnectionStatus 
                isConnected={isConnected}
                error={error}
                lastUpdated={lastUpdated}
              />
              {!isConnected && !error && (
                <div className="text-sm text-amber-600">
                  <span className="font-medium">Setup Required:</span> Configure Google Sheets API to enable live data
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <StatusGauge stats={stats} />
          
          <DataTable
            data={sensorData}
            onRowSelect={setSelectedSensor}
            onExport={handleExport}
          />
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-40">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700">Refreshing sensor data...</span>
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
            <div className="text-sm text-gray-600">
              © 2025 TSS Sensor Monitoring Dashboard. Built for Paper/Pulp Plant Operations.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Version 1.0.0</span>
              <span>•</span>
              <span>Production Ready</span>
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
