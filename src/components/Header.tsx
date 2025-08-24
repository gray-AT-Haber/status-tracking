import React from 'react';
import { Activity, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: Date;
}

const Header: React.FC<HeaderProps> = ({ onRefresh, isRefreshing, lastUpdated }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 via-blue-900 to-blue-800 shadow-2xl border-b-4 border-blue-700">
  <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
    <div className="flex justify-between items-center py-6">
      <div className="flex items-center space-x-5">
        <Activity className="h-10 w-10 text-blue-400 drop-shadow-lg" />
        <div className="ml-1">
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
            TSS Sensor Monitoring Dashboard
          </h1>
          <p className="text-sm text-blue-300 font-semibold tracking-wide">
            Paper/Pulp Plant Deployments
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="text-right">
          <p className="text-xs uppercase text-blue-300 font-medium tracking-wider">
            Last Updated
          </p>
          <p className="text-base font-semibold text-white drop-shadow-md">
            {lastUpdated.toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center px-5 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-xl shadow-lg text-white font-semibold transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed select-none"
        >
          <RefreshCw
            className={`w-5 h-5 mr-3 transform transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          />
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    </div>
  </div>
</header>


export default Header;
