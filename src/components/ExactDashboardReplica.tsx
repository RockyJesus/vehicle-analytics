import React, { useState, useEffect } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  prevValue?: string;
  currentBar?: number;
  previousBar?: number;
  isHighlight?: boolean;
  highlightColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  unit = '', 
  prevValue, 
  currentBar, 
  previousBar,
  isHighlight = false,
  highlightColor = '#90CDF4'
}) => {
  if (isHighlight) {
    return (
      <div className="bg-white border border-gray-300 p-3 text-center" style={{ backgroundColor: highlightColor }}>
        <div className="text-xs text-gray-700 mb-1">{title}</div>
        <div className="text-2xl font-bold text-gray-900">{value} {unit}</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 p-3">
      <div className="text-xs text-gray-700 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value} {unit}</div>
      {prevValue && (
        <div className="text-xs text-gray-500 mb-2">vs prev {prevValue}</div>
      )}
      {currentBar !== undefined && previousBar !== undefined && (
        <div className="space-y-1">
          <div className="text-xs text-gray-600">
            <span className="text-blue-600">Current</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div 
              className="h-2 bg-blue-500 rounded" 
              style={{ width: `${currentBar}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-600">
            <span className="text-green-600">Previous</span>
          </div>
          <div className="h-2 bg-gray-200 rounded">
            <div 
              className="h-2 bg-green-500 rounded" 
              style={{ width: `${previousBar}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ExactDashboardReplica: React.FC = () => {
  const [filters, setFilters] = useState({
    period: 'All',
    vehicleClass: 'All',
    vehicleOwnership: 'All',
    shift: 'All',
    tripTypes: 'All'
  });

  const [dashboardData, setDashboardData] = useState({
    avgActiveVehicles: 112,
    avgUnallocatedVehicles: 4.5,
    fleetUtilization: [
      { title: "Fleet Utilization (%)", value: "74", unit: "%", prevValue: "75 %", currentBar: 60, previousBar: 65 },
      { title: "Total Miles", value: "50,670", prevValue: "45,800 (+10% ▼)", currentBar: 70, previousBar: 60 },
      { title: "Trips per Vehicle Per Day", value: "36", prevValue: "44", currentBar: 50, previousBar: 60 },
      { title: "Empty Miles per Vehicle (km/day)", value: "5000", prevValue: "4500 (+10% ▼)", currentBar: 70, previousBar: 60 },
      { title: "Avg. Occupancy (pax/trip)", value: "1.50", prevValue: "1.75", currentBar: 45, previousBar: 55 },
      { title: "Vehicle Peak Demand Utilization %", value: "90", unit: "%", prevValue: "95 %", currentBar: 60, previousBar: 65 },
      { title: "Idle Time (%)", value: "26", unit: "%", prevValue: "28 %", currentBar: 35, previousBar: 40 },
      { title: "Fleet Availability Rate (%)", value: "75", unit: "%", prevValue: "26 %", currentBar: 60, previousBar: 35 },
      { title: "Maintenance Downtime per Vehicle (hrs/day)", value: "75", unit: "%", prevValue: "26 %", currentBar: 60, previousBar: 35 },
      { title: "Avg Empty Miles per Trip", value: "1.75", prevValue: "1.9", currentBar: 45, previousBar: 50 },
      { title: "Ride Requests per Vehicle", value: "36", prevValue: "44", currentBar: 50, previousBar: 60 },
      { title: "Under Utilized Vehicle %", value: "15", unit: "%", prevValue: "5 %", currentBar: 25, previousBar: 15 }
    ],
    dispatchRouting: [
      { title: "Avg. Dispatch Assignment Time", value: "00:30", unit: "Sec", isHighlight: true, highlightColor: '#E6F3FF' },
      { title: "Avg. Rider Wait Time", value: "02:30", unit: "Min", isHighlight: true, highlightColor: '#E6F3FF' },
      { title: "Avg. Fleet Response Radius (km)", value: "1.5", unit: "KM", isHighlight: true, highlightColor: '#E6F3FF' },
      { title: "Avg. Available Vehicles per Request", value: "1.75", isHighlight: true, highlightColor: '#E6F3FF' },
      { title: "First-Time Assignment (%)", value: "90", unit: "%", prevValue: "85 %", currentBar: 60, previousBar: 55 },
      { title: "Trip Fulfillment (%)", value: "95", unit: "%", prevValue: "90 %", currentBar: 65, previousBar: 60 },
      { title: "Avg. Distance to Nearest Vehicle (km)", value: "4.5", prevValue: "4.4", currentBar: 55, previousBar: 50 },
      { title: "On Time Pickup %", value: "90", unit: "%", prevValue: "95 %", currentBar: 60, previousBar: 65 },
      { title: "Avg Vehicles Available per Request", value: "5.25", prevValue: "5.45", currentBar: 55, previousBar: 60 },
      { title: "Dispatch Coverage (%)", value: "95", unit: "%", prevValue: "90 %", currentBar: 65, previousBar: 60 },
      { title: "Avg. Ride NPS", value: "4.25", prevValue: "4.15", currentBar: 60, previousBar: 55 },
      { title: "Driver Decline %", value: "13", unit: "%", prevValue: "5 %", currentBar: 25, previousBar: 15 },
      { title: "Rider Cancellation %", value: "10", unit: "%", prevValue: "12 %", currentBar: 20, previousBar: 25 },
      { title: "Trip Pooling %", value: "23", unit: "%", prevValue: "26 %", currentBar: 40, previousBar: 45 }
    ],
    vehicleHealth: [
      { title: "Avg. Vehicle Downtime (hrs/day)", value: "02:30", unit: "Min", isHighlight: true, highlightColor: '#FFF4E6' },
      { title: "Avg. Repair Time per Vehicle (hrs)", value: "02:30", unit: "Min", isHighlight: true, highlightColor: '#FFF4E6' },
      { title: "Unplanned Breakdowns", value: "13", prevValue: "4.15", currentBar: 30, previousBar: 15 },
      { title: "Overdue Service Vehicles (count)", value: "18", currentBar: 35, previousBar: 20 },
      { title: "Scheduled Maintenance Compliance (%)", value: "90", unit: "%", prevValue: "95 %", currentBar: 60, previousBar: 65 },
      { title: "Vehicles Due for Service (in 30 days)", value: "40" },
      { title: "Avg. Vehicle Age (Years)", value: "9" }
    ]
  });

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="bg-slate-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-800 px-2 py-1 rounded text-sm font-bold">
            <span className="text-blue-300">deepworks</span>
          </div>
          <span className="text-sm font-medium">Fleet Efficiency & Deployment- Level 1</span>
        </div>
        <div className="bg-slate-500 px-3 py-1 rounded text-xs">
          Data Last Updated on | 1st Jan 2022
        </div>
      </div>

      <div className="p-4">
        {/* Filters and Summary Row */}
        <div className="bg-gray-200 p-3 rounded mb-4 flex items-center justify-between">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Period :</span>
              <select 
                className="text-xs border-0 bg-transparent"
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
              >
                <option>All</option>
                <option>January</option>
                <option>February</option>
              </select>
            </div>
            
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Vehicle Class :</span>
              <select 
                className="text-xs border-0 bg-transparent"
                value={filters.vehicleClass}
                onChange={(e) => handleFilterChange('vehicleClass', e.target.value)}
              >
                <option>All</option>
                <option>Scorpio</option>
                <option>Bolero</option>
              </select>
            </div>
            
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Vehicle Ownership :</span>
              <select 
                className="text-xs border-0 bg-transparent"
                value={filters.vehicleOwnership}
                onChange={(e) => handleFilterChange('vehicleOwnership', e.target.value)}
              >
                <option>All</option>
                <option>Owned</option>
                <option>Leased</option>
              </select>
            </div>
            
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Shift :</span>
              <select 
                className="text-xs border-0 bg-transparent"
                value={filters.shift}
                onChange={(e) => handleFilterChange('shift', e.target.value)}
              >
                <option>All</option>
                <option>Day</option>
                <option>Night</option>
              </select>
            </div>
            
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Trip Types :</span>
              <select 
                className="text-xs border-0 bg-transparent"
                value={filters.tripTypes}
                onChange={(e) => handleFilterChange('tripTypes', e.target.value)}
              >
                <option>All</option>
                <option>Type 1</option>
                <option>Type 2</option>
              </select>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="flex items-center space-x-2">
            <div className="bg-blue-300 px-4 py-3 rounded text-center">
              <div className="text-xs text-gray-700">Average Active</div>
              <div className="text-xs text-gray-700">Vehicles (per Day)</div>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.avgActiveVehicles}</div>
            </div>
            <div className="bg-blue-300 px-4 py-3 rounded text-center">
              <div className="text-xs text-gray-700">Average Unallocated</div>
              <div className="text-xs text-gray-700">Vehicles (per Day)</div>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.avgUnallocatedVehicles}</div>
            </div>
            <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
          </div>
        </div>

        {/* Fleet Utilization Efficiency */}
        <div className="mb-6">
          <div className="bg-blue-100 border-l-4 border-blue-500 px-3 py-2 mb-3 cursor-pointer hover:bg-blue-200 transition-colors"
               onClick={() => window.location.href = '/utilization-detail'}>
            <h2 className="text-sm font-semibold text-blue-800">Fleet Utilization Efficiency</h2>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {dashboardData.fleetUtilization.map((item, index) => (
              <MetricCard
                key={index}
                title={item.title}
                value={item.value}
                unit={item.unit}
                prevValue={item.prevValue}
                currentBar={item.currentBar}
                previousBar={item.previousBar}
              />
            ))}
          </div>
        </div>

        {/* Blue Divider */}
        <div className="h-1 bg-blue-500 mb-6"></div>

        {/* Dispatch & Routing Efficiency */}
        <div className="mb-6">
          <div className="bg-blue-100 border-l-4 border-blue-500 px-3 py-2 mb-3">
            <h2 className="text-sm font-semibold text-blue-800">Dispatch & Routing Efficiency</h2>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {dashboardData.dispatchRouting.map((item, index) => (
              <MetricCard
                key={index}
                title={item.title}
                value={item.value}
                unit={item.unit}
                prevValue={item.prevValue}
                currentBar={item.currentBar}
                previousBar={item.previousBar}
                isHighlight={item.isHighlight}
                highlightColor={item.highlightColor}
              />
            ))}
          </div>
        </div>

        {/* Blue Divider */}
        <div className="h-1 bg-blue-500 mb-6"></div>

        {/* Vehicle Health & Efficiency */}
        <div className="mb-6">
          <div className="bg-blue-100 border-l-4 border-blue-500 px-3 py-2 mb-3">
            <h2 className="text-sm font-semibold text-blue-800">Vehicle Health & Efficiency</h2>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {dashboardData.vehicleHealth.map((item, index) => (
              <MetricCard
                key={index}
                title={item.title}
                value={item.value}
                unit={item.unit}
                prevValue={item.prevValue}
                currentBar={item.currentBar}
                previousBar={item.previousBar}
                isHighlight={item.isHighlight}
                highlightColor={item.highlightColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExactDashboardReplica;