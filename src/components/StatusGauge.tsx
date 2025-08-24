import React from 'react';
import { SensorStats } from '../types/sensor';

interface StatusGaugeProps {
  stats: SensorStats;
}

const StatusGauge: React.FC<StatusGaugeProps> = ({ stats }) => {
  const livePercentage = stats.total > 0 ? (stats.live / stats.total) * 100 : 0;
  const troublePercentage = stats.total > 0 ? (stats.trouble / stats.total) * 100 : 0;
  
  const circumference = 2 * Math.PI * 90;
  const liveOffset = circumference - (livePercentage / 100) * circumference;
  const troubleOffset = circumference - (troublePercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">System Status Overview</h2>
        <p className="text-gray-600">Real-time sensor deployment monitoring</p>
      </div>
      
      <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Primary Gauge - Live vs Total */}
        <div className="relative">
          <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="rgb(243 244 246)"
              strokeWidth="12"
              fill="transparent"
              className="drop-shadow-sm"
            />
            {/* Live sensors arc */}
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="rgb(16 185 129)"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={liveOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out drop-shadow-sm"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">
                {Math.round(livePercentage)}%
              </div>
              <div className="text-sm font-semibold text-green-600">LIVE</div>
              <div className="text-xs text-gray-500 mt-1">
                {stats.live} of {stats.total}
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:grid-cols-1 lg:gap-4">
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <div className="text-2xl font-bold text-green-700">{stats.live}</div>
                <div className="text-sm font-medium text-green-600">Live Sensors</div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
              <div>
                <div className="text-2xl font-bold text-red-700">{stats.trouble}</div>
                <div className="text-sm font-medium text-red-600">Trouble Status</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
              <div>
                <div className="text-2xl font-bold text-gray-700">{stats.notDeployed}</div>
                <div className="text-sm font-medium text-gray-600">Not Deployed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner for Trouble Sensors */}
      {stats.trouble > 0 && (
        <div className="mt-8 bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                Attention Required
              </h3>
              <div className="mt-2 text-sm text-orange-700">
                <p>
                  {stats.trouble} sensor{stats.trouble > 1 ? 's' : ''} require immediate attention. 
                  Review the details below and contact the appropriate site teams.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusGauge;