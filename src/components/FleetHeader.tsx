import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FleetHeader = () => {
  return (
    <div>
      {/* Top Header - Dark Blue */}
      <div className="bg-slate-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white px-2 py-1 rounded text-xs">
              <span className="text-slate-700 font-bold">deepworks</span>
            </div>
            <span className="text-sm font-medium">Fleet Efficiency & Deployment- Level 1</span>
          </div>
          <div className="text-xs text-gray-300">
            Data Last Updated on | 1st Jan 2022
          </div>
        </div>
      </div>

      {/* Filter Row - Light Gray */}
      <div className="bg-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Left Side - Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Period :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-14 h-6 bg-white border border-gray-400 text-xs rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Vehicle Class :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-14 h-6 bg-white border border-gray-400 text-xs rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Vehicle Ownership :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-14 h-6 bg-white border border-gray-400 text-xs rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Shift :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-14 h-6 bg-white border border-gray-400 text-xs rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Trip Types :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-14 h-6 bg-white border border-gray-400 text-xs rounded">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Side - Metric Cards */}
          <div className="flex items-center space-x-2">
            <div className="bg-sky-400 px-3 py-2 rounded shadow">
              <div className="text-xs text-white/90 text-center">Average Active Vehicles (per Day)</div>
              <div className="text-lg font-bold text-white text-center">112</div>
            </div>
            <div className="bg-sky-400 px-3 py-2 rounded shadow">
              <div className="text-xs text-white/90 text-center">Average Unallocated Vehicles (per Day)</div>
              <div className="text-lg font-bold text-white text-center">4.5</div>
            </div>
            <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-sm">💡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};