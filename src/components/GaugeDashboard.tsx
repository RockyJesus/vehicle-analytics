import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Gauge Chart Component
const GaugeChart = ({ value, target, title, size = 120 }) => {
  const percentage = (value / 100) * 180; // Convert to degrees (180 = semicircle)
  const targetPercentage = (target / 100) * 180;
  
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  
  // Create SVG path for the arc
  const createArc = (startAngle, endAngle, innerRadius, outerRadius) => {
    const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
    const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", start.x, start.y, 
      "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
      "L", polarToCartesian(centerX, centerY, innerRadius, startAngle).x, 
      polarToCartesian(centerX, centerY, innerRadius, startAngle).y,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 1, 
      polarToCartesian(centerX, centerY, innerRadius, endAngle).x, 
      polarToCartesian(centerX, centerY, innerRadius, endAngle).y,
      "Z"
    ].join(" ");
  };
  
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-xs font-medium text-gray-700 mb-2">{title}</div>
      <div className="relative">
        <svg width={size} height={size * 0.6} className="overflow-visible">
          {/* Background arc */}
          <path
            d={createArc(0, 180, radius - 8, radius)}
            fill="#e5e7eb"
            stroke="none"
          />
          
          {/* Value arc */}
          <path
            d={createArc(0, percentage, radius - 8, radius)}
            fill="#3b82f6"
            stroke="none"
          />
          
          {/* Target indicator */}
          <line
            x1={polarToCartesian(centerX, centerY, radius - 15, targetPercentage).x}
            y1={polarToCartesian(centerX, centerY, radius - 15, targetPercentage).y}
            x2={polarToCartesian(centerX, centerY, radius + 5, targetPercentage).x}
            y2={polarToCartesian(centerX, centerY, radius + 5, targetPercentage).y}
            stroke="#10b981"
            strokeWidth="3"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-gray-900">{value}%</div>
          <div className="text-xs text-gray-500">vs prev {target}%</div>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, unit, prevValue, color = "bg-white" }) => (
  <div className={`${color} border border-gray-300 p-3 rounded`}>
    <div className="text-xs font-medium text-gray-700 mb-1">{title}</div>
    <div className="text-xl font-bold text-gray-900">{value} {unit}</div>
    {prevValue && (
      <div className="text-xs text-gray-500">vs prev {prevValue}</div>
    )}
  </div>
);

// Line Chart Component (simplified)
const LineChart = ({ data, width = 400, height = 200 }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.avg, d.p75, d.p90)));
  const minValue = Math.min(...data.map(d => Math.min(d.avg, d.p75, d.p90)));
  const range = maxValue - minValue;
  
  const getY = (value) => height - ((value - minValue) / range) * (height - 40) - 20;
  const getX = (index) => (index / (data.length - 1)) * (width - 60) + 30;
  
  const createPath = (values) => {
    return values.map((value, index) => 
      `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(value)}`
    ).join(' ');
  };

  return (
    <svg width={width} height={height} className="border border-gray-200">
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(value => (
        <g key={value}>
          <line
            x1={30}
            y1={getY(value)}
            x2={width - 30}
            y2={getY(value)}
            stroke="#f3f4f6"
            strokeWidth="1"
          />
          <text x={10} y={getY(value) + 4} className="text-xs fill-gray-500">
            {value}
          </text>
        </g>
      ))}
      
      {/* Lines */}
      <path d={createPath(data.map(d => d.avg))} fill="none" stroke="#ef4444" strokeWidth="2" />
      <path d={createPath(data.map(d => d.p75))} fill="none" stroke="#3b82f6" strokeWidth="2" />
      <path d={createPath(data.map(d => d.p90))} fill="none" stroke="#10b981" strokeWidth="2" />
      
      {/* X-axis labels */}
      {data.map((d, index) => (
        <text key={index} x={getX(index)} y={height - 5} className="text-xs fill-gray-500 text-anchor-middle">
          {d.month}
        </text>
      ))}
    </svg>
  );
};

// Heatmap Component
const Heatmap = () => {
  const times = [
    '12:00 AM', '02:00 AM', '04:00 AM', '06:00 AM', '08:00 AM', '10:00 AM',
    '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM', '10:00 PM'
  ];
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const data = [
    [96, 24, 18, 67, 21, 21, 21],
    [45, 30, 77, 66, 20, 34, 21],
    [34, 78, 98, 55, 14, 35, 23],
    [23, 34, 67, 100, 18, 56, 23],
    [45, 45, 32, 31, 78, 76, 45],
    [55, 96, 45, 34, 53, 35, 52],
    [56, 64, 55, 28, 78, 45, 87],
    [78, 50, 49, 64, 40, 49, 56],
    [43, 34, 45, 34, 73, 55, 56],
    [87, 34, 33, 39, 22, 46, 44],
    [78, 34, 45, 39, 53, 49, 73],
    [44, 34, 49, 49, 77, 57, 76]
  ];
  
  const getColor = (value) => {
    if (value >= 80) return '#1e40af';
    if (value >= 60) return '#3b82f6';
    if (value >= 40) return '#60a5fa';
    if (value >= 20) return '#93c5fd';
    return '#dbeafe';
  };

  return (
    <div className="bg-white border border-gray-300 p-3 rounded">
      <div className="text-xs font-medium text-gray-700 mb-3">Fleet Utilization % By Day & Time</div>
      <div className="overflow-x-auto">
        <table className="text-xs">
          <thead>
            <tr>
              <th className="w-16"></th>
              {days.map(day => (
                <th key={day} className="w-8 text-center p-1">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIndex) => (
              <tr key={time}>
                <td className="text-right pr-2 py-1">{time}</td>
                {data[timeIndex].map((value, dayIndex) => (
                  <td key={dayIndex} className="p-1">
                    <div
                      className="w-6 h-4 flex items-center justify-center text-white text-xs font-medium rounded"
                      style={{ backgroundColor: getColor(value) }}
                    >
                      {value}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const GaugeDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  
  const lineChartData = [
    { month: 'Jan 22', avg: 68, p75: 75, p90: 85 },
    { month: 'Feb 22', avg: 72, p75: 78, p90: 88 },
    { month: 'Mar 22', avg: 75, p75: 80, p90: 90 },
    { month: 'Apr 22', avg: 74, p75: 79, p90: 89 },
    { month: 'May 22', avg: 78, p75: 82, p90: 92 },
    { month: 'Jun 22', avg: 74, p75: 79, p90: 89 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          {/* Left Column - Gauge Charts */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-gray-300 p-4 rounded">
              <GaugeChart value={90} target={92} title="Own Vehicles - Utilization" />
            </div>
            <div className="bg-white border border-gray-300 p-4 rounded">
              <GaugeChart value={65} target={68} title="Vendor Vehicles - Utilization" />
            </div>
          </div>
          
          {/* Middle Column - Metrics and Chart */}
          <div className="lg:col-span-6 space-y-4">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <MetricCard title="Average Utilization %" value="74" unit="%" prevValue="76 %" color="bg-blue-50" />
              <MetricCard title="Utilization % Below Average" value="45.5" unit="%" prevValue="48 %" color="bg-blue-50" />
              <MetricCard title="Utilization % Above Threshold" value="5.9" unit="%" prevValue="6.2 %" color="bg-blue-50" />
              <MetricCard title="Utilization Count Below Target" value="7" prevValue="9" color="bg-blue-50" />
              <MetricCard title="90th-10th Percentile Spread" value="5.9" prevValue="6.1" color="bg-blue-50" />
              <MetricCard title="Demand-to-Fleet Ratio" value="6.5" prevValue="6.8" color="bg-blue-50" />
            </div>
            
            {/* Time Period Buttons */}
            <div className="flex gap-1">
              <Button 
                variant={selectedPeriod === 'monthly' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('monthly')}
                className="bg-slate-600 text-white"
              >
                Monthly
              </Button>
              <Button 
                variant={selectedPeriod === 'weekly' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('weekly')}
              >
                Weekly
              </Button>
              <Button 
                variant={selectedPeriod === 'daily' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('daily')}
              >
                Daily
              </Button>
              <Button 
                variant={selectedPeriod === 'quarterly' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedPeriod('quarterly')}
              >
                Quarterly
              </Button>
            </div>
            
            {/* Line Chart */}
            <div className="bg-white border border-gray-300 p-4 rounded">
              <div className="text-sm font-medium text-gray-700 mb-3">Fleet Utilization % by Date</div>
              <div className="flex items-center gap-4 mb-3 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <span>Average Utilization %</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span>75th Percentile</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-green-500"></div>
                  <span>90th Percentile</span>
                </div>
              </div>
              <LineChart data={lineChartData} />
            </div>
          </div>
          
          {/* Right Column - Heatmap */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">Vehicle Class</span>
                <Select defaultValue="scorpio">
                  <SelectTrigger className="w-32 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scorpio">Scorpio</SelectItem>
                    <SelectItem value="bolero">Bolero</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Heatmap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GaugeDashboard;