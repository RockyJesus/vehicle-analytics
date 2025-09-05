import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export const FleetHeader = () => {
  return (
    <div className="bg-slate-700 text-white">
      <div className="container max-w-7xl mx-auto px-6 py-3">
        {/* Header with Logo and Title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="bg-white px-2 py-1 rounded text-xs">
              <span className="text-slate-700 font-bold">deepworks</span>
            </div>
            <div className="text-sm font-medium">Fleet Efficiency & Deployment- Level 1</div>
          </div>
          <div className="text-xs text-gray-300">
            Data Last Updated on | 1st Jan 2022
          </div>
        </div>

        {/* Filter Row with Integrated Metrics */}
        <div className="flex items-center justify-between bg-gray-600 rounded p-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-xs font-medium">Period :</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-20 h-7 bg-white text-gray-800 border-0 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs font-medium">Vehicle Class :</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-20 h-7 bg-white text-gray-800 border-0 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="scorpio">Scorpio</SelectItem>
                  <SelectItem value="bolero">Bolero</SelectItem>
                  <SelectItem value="safari">Safari</SelectItem>
                  <SelectItem value="minivan">Mini Van</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-xs font-medium">Vehicle Ownership :</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-20 h-7 bg-white text-gray-800 border-0 text-xs">
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
              <label className="text-xs font-medium">Shift :</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-20 h-7 bg-white text-gray-800 border-0 text-xs">
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
              <label className="text-xs font-medium">Trip Types :</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-20 h-7 bg-white text-gray-800 border-0 text-xs">
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

          {/* Key Metrics Cards integrated in same row */}
          <div className="flex items-center space-x-3">
            <Card className="bg-sky-400 border-sky-400">
              <div className="p-3 text-center">
                <div className="text-xs text-white/90">Average Active Vehicles (per Day)</div>
                <div className="text-2xl font-bold text-white mt-1">112</div>
              </div>
            </Card>
            <Card className="bg-sky-400 border-sky-400">
              <div className="p-3 text-center">
                <div className="text-xs text-white/90">Average Unallocated Vehicles (per Day)</div>
                <div className="text-2xl font-bold text-white mt-1">4.5</div>
              </div>
            </Card>
            <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-xl">🚗</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};