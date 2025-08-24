import React from 'react';
import { Activity, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isRefreshing, lastUpdated }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Sensor Monitoring Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Paper/Pulp Plant Deployments
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Last updated</p>
              <p className="text-sm font-medium text-gray-900">
                {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;