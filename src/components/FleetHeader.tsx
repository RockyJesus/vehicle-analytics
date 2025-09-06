import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const FleetHeader = () => {
  return (
    <div>
      {/* Top Header - Dark Blue */}
      <div className="bg-slate-600 text-white py-1">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-800 px-2 py-1 rounded text-xs">
              <span className="text-blue-300 font-bold">deepworks</span>
            </div>
            <span className="text-sm font-medium">Fleet Efficiency & Deployment- Level 1</span>
          </div>
          <div className="bg-slate-500 px-3 py-1 rounded text-xs">
            Data Last Updated on | 1st Jan 2022
          </div>
        </div>
      </div>

      {/* Filter Row - Light Gray */}
      <div className="bg-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Left Side - Filters */}
          <div className="flex items-center space-x-4">
            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Period :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-12 h-6 border-0 bg-transparent text-xs p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Vehicle Class :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-12 h-6 border-0 bg-transparent text-xs p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Vehicle Ownership :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-12 h-6 border-0 bg-transparent text-xs p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Shift :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-12 h-6 border-0 bg-transparent text-xs p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white px-2 py-1 rounded flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-700">Trip Types :</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-12 h-6 border-0 bg-transparent text-xs p-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 z-50">
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Side - Metric Cards */}
          <div className="flex items-center space-x-2">
            <div className="bg-sky-400 px-3 py-2 rounded text-center">
              <div className="text-xs text-gray-700">Average Active</div>
              <div className="text-xs text-gray-700">Vehicles (per Day)</div>
              <div className="text-2xl font-bold text-gray-900">112</div>
            </div>
            <div className="bg-sky-400 px-3 py-2 rounded text-center">
              <div className="text-xs text-gray-700">Average Unallocated</div>
              <div className="text-xs text-gray-700">Vehicles (per Day)</div>
              <div className="text-2xl font-bold text-gray-900">4.5</div>
            </div>
            <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};