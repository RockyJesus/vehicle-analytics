import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export const FleetHeader = () => {
  return (
    <div className="bg-slate-700 text-white">
      <div className="container max-w-7xl mx-auto px-6 py-2">
        {/* Single Row Header */}
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white px-2 py-1 rounded text-xs">
              <span className="text-slate-700 font-bold">deepworks</span>
            </div>
            <div className="text-sm font-medium">Fleet Efficiency & Deployment- Level 1</div>
          </div>
          
          {/* Right side - Date */}
          <div className="text-xs text-gray-300">
            Data Last Updated on | 1st Jan 2022
          </div>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-gray-300 py-2">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Filter Controls */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">Period :</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-16 h-6 bg-white text-gray-800 border border-gray-400 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">Vehicle Class :</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-16 h-6 bg-white text-gray-800 border border-gray-400 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="scorpio">Scorpio</SelectItem>
                    <SelectItem value="bolero">Bolero</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">Vehicle Ownership :</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-16 h-6 bg-white text-gray-800 border border-gray-400 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="owned">Owned</SelectItem>
                    <SelectItem value="leased">Leased</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">Shift :</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-16 h-6 bg-white text-gray-800 border border-gray-400 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="shift-a">Shift A</SelectItem>
                    <SelectItem value="shift-b">Shift B</SelectItem>
                    <SelectItem value="shift-c">Shift C</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-medium text-gray-700">Trip Types :</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-16 h-6 bg-white text-gray-800 border border-gray-400 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Metric Cards on the right */}
            <div className="flex items-center space-x-2">
              <div className="bg-sky-400 px-4 py-2 rounded text-center">
                <div className="text-xs text-white/90">Average Active Vehicles (per Day)</div>
                <div className="text-lg font-bold text-white">112</div>
              </div>
              <div className="bg-sky-400 px-4 py-2 rounded text-center">
                <div className="text-xs text-white/90">Average Unallocated Vehicles (per Day)</div>
                <div className="text-lg font-bold text-white">4.5</div>
              </div>
              <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
                <span className="text-sm">🚗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};