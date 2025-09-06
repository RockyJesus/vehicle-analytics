import React, { useState } from 'react';
import { FleetHeader } from '@/components/FleetHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const UtilizationDetail: React.FC = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Monthly');

  // Mock data for charts and metrics
  const utilizationMetrics = [
    { title: "Average Utilization %", value: "74", unit: "%", prevValue: "vs prev 78 %", bgColor: "bg-yellow-200", borderColor: "border-l-yellow-500" },
    { title: "Utilization % Below Average", value: "45.5", unit: "%", prevValue: "Average 74 %", bgColor: "bg-blue-200", borderColor: "border-l-blue-500" },
    { title: "Utilization % Above Threshold", value: "5.9", unit: "%", prevValue: "Threshold 90 %", bgColor: "bg-green-200", borderColor: "border-l-green-500" },
    { title: "Utilization Count Below Target", value: "7", prevValue: "Target 75 %", bgColor: "bg-red-200", borderColor: "border-l-red-500" },
    { title: "90th-10th Percentile Spread", value: "5.9", bgColor: "bg-purple-200", borderColor: "border-l-purple-500" },
    { title: "Volatility Index", value: "7.4", bgColor: "bg-orange-200", borderColor: "border-l-orange-500" },
    { title: "Demand-to-Fleet Ratio", value: "6.5", bgColor: "bg-teal-200", borderColor: "border-l-teal-500" }
  ];

  const vehicleClassData = [
    { name: "Scorpio", value: 64 },
    { name: "Bolero", value: 52 },
    { name: "Safari", value: 84 },
    { name: "Mini Van", value: 90 }
  ];

  const shiftData = [
    { name: "Shift A", value: 64 },
    { name: "Shift B", value: 92 },
    { name: "Shift C", value: 74 }
  ];

  const vendorData = [
    { name: "Thriveni Vehicles", utilization: "95%" },
    { name: "Chintamani Devi", utilization: "94%" },
    { name: "Neha Kumari", utilization: "93%" },
    { name: "Suraj Tiwari", utilization: "92%" },
    { name: "Sabita Devi", utilization: "92%" },
    { name: "Sanjay", utilization: "91%" },
    { name: "John", utilization: "90%" }
  ];

  const idleTimeData = [
    { vehicle: "VH 1", value: 91 },
    { vehicle: "VH 2", value: 87 },
    { vehicle: "VH 3", value: 90 },
    { vehicle: "VH 4", value: 85 },
    { vehicle: "VH 5", value: 70 },
    { vehicle: "VH 6", value: 86 },
    { vehicle: "VH 7", value: 80 },
    { vehicle: "VH 8", value: 95 },
    { vehicle: "VH 9", value: 88 },
    { vehicle: "VH 10", value: 65 },
    { vehicle: "VH 11", value: 78 },
    { vehicle: "VH 12", value: 70 },
    { vehicle: "VH 13", value: 44 },
    { vehicle: "VH 14", value: 75 },
    { vehicle: "VH 15", value: 60 },
    { vehicle: "VH 16", value: 55 },
    { vehicle: "VH 17", value: 30 },
    { vehicle: "VH 18", value: 25 }
  ];

  const heatmapData = [
    { time: "12:00 AM", Mon: 99, Tue: 96, Wed: 21, Thu: 18, Fri: 67, Sat: 16, Sun: 98 },
    { time: "02:00 AM", Mon: 45, Tue: 30, Wed: 77, Thu: 69, Fri: 20, Sat: 34, Sun: 21 },
    { time: "04:00 AM", Mon: 94, Tue: 87, Wed: 95, Thu: 95, Fri: 44, Sat: 35, Sun: 23 },
    { time: "06:00 AM", Mon: 23, Tue: 34, Wed: 67, Thu: 100, Fri: 18, Sat: 56, Sun: 43 },
    { time: "08:00 AM", Mon: 45, Tue: 96, Wed: 25, Thu: 34, Fri: 2, Sat: 5, Sun: 25 },
    { time: "10:00 AM", Mon: 95, Tue: 45, Wed: 2, Thu: 25, Fri: 56, Sat: 76, Sun: 52 },
    { time: "12:00 PM", Mon: 56, Tue: 64, Wed: 55, Thu: 29, Fri: 78, Sat: 45, Sun: 87 },
    { time: "02:00 PM", Mon: 78, Tue: 56, Wed: 46, Thu: 84, Fri: 40, Sat: 40, Sun: 65 },
    { time: "04:00 PM", Mon: 43, Tue: 34, Wed: 45, Thu: 34, Fri: 2, Sat: 55, Sun: 56 },
    { time: "06:00 PM", Mon: 87, Tue: 34, Wed: 33, Thu: 89, Fri: 22, Sat: 46, Sun: 44 },
    { time: "08:00 PM", Mon: 78, Tue: 4, Wed: 66, Thu: 1, Fri: 20, Sat: 4, Sun: 21 },
    { time: "10:00 PM", Mon: 44, Tue: 34, Wed: 45, Thu: 45, Fri: 77, Sat: 57, Sun: 76 }
  ];

  const getHeatmapColor = (value: number) => {
    if (value >= 80) return "bg-blue-600 text-white";
    if (value >= 60) return "bg-blue-400 text-white";
    if (value >= 40) return "bg-blue-200 text-gray-800";
    if (value >= 20) return "bg-blue-100 text-gray-700";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <FleetHeader />
      
      <div className="p-4">
        {/* Utilization Metrics */}
        <div className="grid grid-cols-7 gap-3 mb-6">
          {utilizationMetrics.map((metric, index) => (
            <Card key={index} className={`${metric.bgColor} border-l-4 ${metric.borderColor}`}>
              <CardContent className="p-3">
                <div className="text-xs font-medium text-gray-700 mb-1">{metric.title}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value} {metric.unit}
                </div>
                {metric.prevValue && (
                  <div className="text-xs text-gray-600">{metric.prevValue}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-3 space-y-4">
            {/* Own Vehicles Utilization */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Own Vehicles - Utilization</h3>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="48" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="48" 
                      stroke="#3b82f6" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray={`${90 * 3.01593} ${100 * 3.01593}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="36" 
                      stroke="#ef4444" 
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={`${10 * 2.26194} ${100 * 2.26194}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="24" 
                      stroke="#10b981" 
                      strokeWidth="6" 
                      fill="none"
                      strokeDasharray={`${75 * 1.5079} ${100 * 1.5079}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">90%</div>
                      <div className="text-xs text-gray-500">Target: 92%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Vehicles Utilization */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Vendor Vehicles - Utilization</h3>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="48" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="48" 
                      stroke="#3b82f6" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray={`${65 * 3.01593} ${100 * 3.01593}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="36" 
                      stroke="#ef4444" 
                      strokeWidth="8" 
                      fill="none"
                      strokeDasharray={`${35 * 2.26194} ${100 * 2.26194}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="24" 
                      stroke="#10b981" 
                      strokeWidth="6" 
                      fill="none"
                      strokeDasharray={`${59 * 1.5079} ${100 * 1.5079}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">65%</div>
                      <div className="text-xs text-gray-500">Target: 88%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Type */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Trip Type</h3>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="48" 
                      stroke="#ef4444" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray={`${40 * 3.01593} ${100 * 3.01593}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="48" 
                      stroke="#10b981" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray={`${35 * 3.01593} ${100 * 3.01593}`}
                      strokeDashoffset={`${-40 * 3.01593}`}
                      strokeLinecap="round"
                    />
                    <circle 
                      cx="64" 
                      cy="64" 
                      r="48" 
                      stroke="#3b82f6" 
                      strokeWidth="12" 
                      fill="none"
                      strokeDasharray={`${25 * 3.01593} ${100 * 3.01593}`}
                      strokeDashoffset={`${-75 * 3.01593}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Utilization by Vehicle Class */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Utilization by Vehicle Class</h3>
                <div className="space-y-2">
                  {vehicleClassData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs font-medium w-16">{item.name}</span>
                      <div className="flex-1 mx-2">
                        <div className="h-4 bg-gray-200 rounded">
                          <div 
                            className="h-4 bg-blue-500 rounded" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold w-6">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Utilization by Shift */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Utilization by Shift</h3>
                <div className="space-y-2">
                  {shiftData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs font-medium w-16">{item.name}</span>
                      <div className="flex-1 mx-2">
                        <div className="h-4 bg-gray-200 rounded">
                          <div 
                            className="h-4 bg-blue-500 rounded" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs font-bold w-6">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column */}
          <div className="col-span-6 space-y-4">
            {/* Time Period Buttons */}
            <div className="flex space-x-1">
              {['Monthly', 'Weekly', 'Daily', 'Quarterly'].map((period) => (
                <Button
                  key={period}
                  variant={selectedTimePeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTimePeriod(period)}
                  className={`text-xs px-3 py-1 ${
                    selectedTimePeriod === period 
                      ? 'bg-slate-600 text-white' 
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {period}
                </Button>
              ))}
            </div>

            {/* Fleet Utilization by Date Chart */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Fleet Utilization % by Date</h3>
                <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-gray-500">Line Chart Placeholder</div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Duration Distribution */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Trip Duration Distribution (Minutes)</h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-gray-500">Histogram Placeholder</div>
                </div>
              </CardContent>
            </Card>

            {/* Histogram Of Vehicle Utilization */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Histogram Of Vehicle Utilization %</h3>
                <div className="h-48 bg-gray-50 rounded flex items-center justify-center">
                  <div className="text-gray-500">Histogram Placeholder</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="col-span-3 space-y-4">
            {/* Fleet Utilization % By Day & Time */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Fleet Utilization % By Day & Time</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs">Vehicle Class</span>
                    <select className="text-xs border rounded px-1 py-0.5">
                      <option>Scorpio</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-auto max-h-96">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left p-1"></th>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                          <th key={day} className="text-center p-1 font-medium">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {heatmapData.map((row, index) => (
                        <tr key={index}>
                          <td className="p-1 font-medium">{row.time}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Mon)}`}>{row.Mon}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Tue)}`}>{row.Tue}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Wed)}`}>{row.Wed}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Thu)}`}>{row.Thu}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Fri)}`}>{row.Fri}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Sat)}`}>{row.Sat}</td>
                          <td className={`p-1 text-center ${getHeatmapColor(row.Sun)}`}>{row.Sun}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top/Bottom Performers */}
            <Card>
              <CardContent className="p-4">
                <div className="mb-3">
                  <div className="bg-slate-600 text-white text-center py-1 text-xs font-semibold">
                    Top Performers
                  </div>
                  <div className="bg-gray-400 text-white text-center py-1 text-xs font-semibold">
                    Bottom Performers
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold border-b pb-1">
                    <span>Vendor</span>
                    <span>Utilization %</span>
                  </div>
                  {vendorData.map((vendor, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 text-xs">
                      <span>{vendor.name}</span>
                      <span>{vendor.utilization}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Idle Time by Vehicle */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3">Idle Time by Vehicle</h3>
                <div className="space-y-1 max-h-64 overflow-auto">
                  {idleTimeData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="w-8">{item.vehicle}</span>
                      <div className="flex-1 mx-2">
                        <div className="h-3 bg-gray-200 rounded">
                          <div 
                            className="h-3 bg-blue-500 rounded" 
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="w-6 font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UtilizationDetail;