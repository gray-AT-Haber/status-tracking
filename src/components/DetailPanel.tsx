import React from 'react';
import { SensorData } from '../types/sensor';
import { X, Calendar, MapPin, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { getStatusColor } from '../utils/dataUtils';

interface DetailPanelProps {
  sensor: SensorData | null;
  onClose: () => void;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ sensor, onClose }) => {
  if (!sensor) return null;

  const formatUpdates = (updates: string) => {
    if (!updates) return [];
    return updates.split('\n').filter(line => line.trim());
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Trouble':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'NA':
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(sensor.status)}
              <div>
                <h2 className="text-xl font-bold">{sensor.sensorAssigned}</h2>
                <p className="text-blue-100">{sensor.customerName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Status and Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Current Status</span>
              </div>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(sensor.status)}`}>
                {sensor.status}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Deployment Date</span>
              </div>
              <p className="font-semibold text-gray-900">{sensor.deploymentDate || 'Not deployed'}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-600">Deployment Status</span>
              </div>
              <p className="font-semibold text-gray-900">{sensor.deployment}</p>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-600">Unit</span>
                <p className="text-gray-900 font-semibold">{sensor.unit || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Application</span>
                <p className="text-gray-900 font-semibold">{sensor.application || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Parameter</span>
                <p className="text-gray-900 font-semibold">{sensor.parameter || 'N/A'}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Range</span>
                <p className="text-gray-900 font-semibold">{sensor.measurementRange || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Troubleshooting Information */}
          {(sensor.reasonForTrouble || sensor.resolutionStatus) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Troubleshooting Information
              </h3>
              {sensor.reasonForTrouble && (
                <div className="mb-4">
                  <span className="text-sm font-medium text-red-800">Issue:</span>
                  <p className="text-red-700 mt-1">{sensor.reasonForTrouble}</p>
                </div>
              )}
              {sensor.resolutionStatus && (
                <div>
                  <span className="text-sm font-medium text-red-800">Resolution Status:</span>
                  <p className="text-red-700 mt-1">{sensor.resolutionStatus}</p>
                </div>
              )}
            </div>
          )}

          {/* Latest Updates Timeline */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Update History</h3>
            {sensor.latestUpdates ? (
              <div className="space-y-4">
                {formatUpdates(sensor.latestUpdates).map((update, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {update.trim()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No update history available</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-8 pt-6 border-t border-gray-200">
            {sensor.status === 'Trouble' && (
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Escalate Issue
              </button>
            )}
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Update Status
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPanel;