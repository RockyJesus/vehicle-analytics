import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  target?: string;
  isBlue?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit = '', target, isBlue = false }) => {
  return (
    <div className={`${isBlue ? 'bg-blue-400' : 'bg-white'} border border-gray-300 p-3 text-center`}>
      <div className={`text-xs ${isBlue ? 'text-white' : 'text-gray-700'} mb-1`}>{title}</div>
      <div className={`text-2xl font-bold ${isBlue ? 'text-white' : 'text-gray-900'}`}>{value} {unit}</div>
      {target && (
        <div className={`text-xs ${isBlue ? 'text-blue-100' : 'text-gray-500'}`}>Target {target}</div>
      )}
    </div>
  );
};

const FleetEfficiencyDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedVehicleClass, setSelectedVehicleClass] = useState('scorpio');

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div className="bg-slate-600 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-800 px-2 py-1 rounded text-sm font-bold">
            <span className="text-blue-300">deepworks</span>
          </div>
          <span className="text-sm font-medium">Fleet Efficiency & Deployment - Level 2 - Utilization %</span>
        </div>
        <div className="bg-slate-500 px-3 py-1 rounded text-xs">
          Data Last Updated on | 1st Jan 2022
        </div>
      </div>

      <div className="p-4">
        {/* Filters Row */}
        <div className="bg-gray-200 p-3 rounded mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Period :</span>
              <select className="text-xs border-0 bg-transparent">
                <option>All</option>
              </select>
            </div>
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Vehicle Class :</span>
              <select className="text-xs border-0 bg-transparent">
                <option>All</option>
              </select>
            </div>
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Vehicle Ownership :</span>
              <select className="text-xs border-0 bg-transparent">
                <option>All</option>
              </select>
            </div>
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Shift :</span>
              <select className="text-xs border-0 bg-transparent">
                <option>All</option>
              </select>
            </div>
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium">Trip Type :</span>
              <select className="text-xs border-0 bg-transparent">
                <option>All</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <MetricCard title="Average Active Vehicles (per Day)" value="112" isBlue={true} />
            <MetricCard title="Average Unallocated Vehicles (per Day)" value="4.5" isBlue={true} />
            <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
          </div>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-6 gap-3 mb-4">
          <MetricCard title="Average Utilization %" value="74" unit="%" target="78 %" />
          <MetricCard title="Utilization % Below Average" value="45.5" unit="%" target="74 %" />
          <MetricCard title="Utilization % Above Threshold" value="5.9" unit="%" target="90 %" />
          <MetricCard title="Utilization Count Below Target" value="7" target="75 %" />
          <MetricCard title="90th-10th Percentile Spread" value="5.9" />
          <MetricCard title="Demand-to-Fleet Ratio" value="6.5" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Own Vehicles Utilization */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Own Vehicles - Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-32 h-32 mx-auto">
                  {/* Donut Chart Placeholder */}
                  <div className="w-full h-full rounded-full border-8 border-blue-500 border-t-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">90%</div>
                        <div className="text-xs text-gray-500">Target: 92%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vendor Vehicles Utilization */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Vendor Vehicles - Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-32 h-32 mx-auto">
                  <div className="w-full h-full rounded-full border-8 border-blue-500 border-t-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">65%</div>
                        <div className="text-xs text-gray-500">Target: 68%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trip Type */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Trip Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-24 h-24 mx-auto rounded-full bg-red-400"></div>
              </CardContent>
            </Card>

            {/* Utilization by Vehicle Class */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Utilization by Vehicle Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Scorpio</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={64} className="w-16 h-2" />
                    <span className="text-xs">64</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Bolero</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={62} className="w-16 h-2" />
                    <span className="text-xs">62</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Safari</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={56} className="w-16 h-2" />
                    <span className="text-xs">56</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Mini Van</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={30} className="w-16 h-2" />
                    <span className="text-xs">30</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Utilization by Shift */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Utilization by Shift</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Shift A</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={68} className="w-16 h-2" />
                    <span className="text-xs">68</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Shift B</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={50} className="w-16 h-2" />
                    <span className="text-xs">50</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Shift C</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={64} className="w-16 h-2" />
                    <span className="text-xs">64</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Column */}
          <div className="space-y-4">
            {/* Time Period Buttons */}
            <div className="flex space-x-1">
              <Button variant="default" size="sm" className="bg-slate-600 text-white">Monthly</Button>
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Daily</Button>
              <Button variant="outline" size="sm">Quarterly</Button>
            </div>

            {/* Fleet Utilization % by Date */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Fleet Utilization % by Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">Line Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>

            {/* Trip Duration Distribution */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Trip Duration Distribution (Minutes)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">Histogram Placeholder</span>
                </div>
              </CardContent>
            </Card>

            {/* Histogram of Vehicle Utilization % */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Histogram Of Vehicle Utilization %</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-500">Bar Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Vehicle Class Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-xs">Vehicle Class</span>
              <Select value={selectedVehicleClass} onValueChange={setSelectedVehicleClass}>
                <SelectTrigger className="w-32 h-6 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scorpio">Scorpio</SelectItem>
                  <SelectItem value="bolero">Bolero</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Heatmap */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Fleet Utilization % By Day & Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs">
                  <div className="grid grid-cols-8 gap-1 mb-2">
                    <div></div>
                    <div className="text-center">Mon</div>
                    <div className="text-center">Tue</div>
                    <div className="text-center">Wed</div>
                    <div className="text-center">Thr</div>
                    <div className="text-center">Fri</div>
                    <div className="text-center">Sat</div>
                    <div className="text-center">Sun</div>
                  </div>
                  {Array.from({ length: 12 }).map((_, hour) => (
                    <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
                      <div className="text-right pr-1">{String(hour).padStart(2, '0')}:00 AM</div>
                      {Array.from({ length: 7 }).map((_, day) => (
                        <div key={day} className="w-6 h-4 bg-blue-200 text-center text-xs leading-4">
                          {Math.floor(Math.random() * 100)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top/Bottom Performers */}
            <Card>
              <CardContent className="p-2">
                <div className="flex mb-2">
                  <Button variant="default" size="sm" className="bg-slate-600 text-white flex-1">Top Performers</Button>
                  <Button variant="outline" size="sm" className="flex-1">Bottom Performers</Button>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Vendor</span>
                    <span>Utilization %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thriveni Vehicles</span>
                    <span>95 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chintamani Devi</span>
                    <span>94 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Neha Kumari</span>
                    <span>93 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Suraj Tiwari</span>
                    <span>92 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabita Devi</span>
                    <span>92 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sanjay</span>
                    <span>91 %</span>
                  </div>
                  <div className="flex justify-between">
                    <span>John</span>
                    <span>90 %</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Idle Time by Vehicle */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Idle Time by Vehicle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {Array.from({ length: 15 }).map((_, index) => (
                  <div key={index} className="flex justify-between items-center text-xs">
                    <span>VH {index + 1}...</span>
                    <div className="flex items-center space-x-1">
                      <Progress value={Math.floor(Math.random() * 100)} className="w-16 h-2" />
                      <span>{Math.floor(Math.random() * 100)}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetEfficiencyDashboard;