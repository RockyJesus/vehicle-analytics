import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MetricData {
  label: string;
  value: string;
  subtext?: string;
  barCurrent?: number;
  barPrevious?: number;
}

interface DashboardData {
  avgActiveVehicles: number;
  avgUnallocatedVehicles: number;
  fleetUtilization: MetricData[];
  dispatchRouting: MetricData[];
  vehicleHealth: MetricData[];
}

export const ResponsiveFleetDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedVehicleClass, setSelectedVehicleClass] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");
  const [selectedShift, setSelectedShift] = useState("all");
  const [selectedTripTypes, setSelectedTripTypes] = useState("all");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  // Sample data sets for different filter states
  const dataSets: Record<string, DashboardData> = {
    all: {
      avgActiveVehicles: 112,
      avgUnallocatedVehicles: 4.5,
      fleetUtilization: [
        { label: "Fleet Utilization (%)", value: "74 %", subtext: "vs prev 75 %", barCurrent: 60, barPrevious: 40 },
        { label: "Total Miles", value: "50,670", subtext: "vs prev 45,800 (+10% ▼)", barCurrent: 70, barPrevious: 40 },
        { label: "Trips per Vehicle Per Day", value: "36", subtext: "vs prev 44", barCurrent: 50, barPrevious: 60 },
        { label: "Empty miles per vehicle (km/day)", value: "5000", subtext: "vs prev 4500 (+10% ▼)", barCurrent: 70, barPrevious: 40 },
        { label: "Avg. Occupancy (pax/trip)", value: "1.50", subtext: "vs prev 1.75", barCurrent: 40, barPrevious: 60 },
        { label: "Vehicle Peak Demand Utilization %", value: "90 %", subtext: "vs prev 95 %", barCurrent: 60, barPrevious: 40 },
        { label: "Idle Time (%)", value: "26 %", subtext: "vs prev 28 %", barCurrent: 40, barPrevious: 60 },
        { label: "Fleet Availability Rate (%)", value: "75 %", subtext: "vs prev 26 %", barCurrent: 60, barPrevious: 40 },
        { label: "Maintenance Downtime per Vehicle (hrs/day)", value: "75 %", subtext: "vs prev 26 %", barCurrent: 60, barPrevious: 40 },
        { label: "Avg Empty Miles per Trip", value: "1.75", subtext: "vs prev 1.9", barCurrent: 40, barPrevious: 60 },
        { label: "Ride Requests per Vehicle", value: "36", subtext: "vs prev 44", barCurrent: 50, barPrevious: 60 },
        { label: "Under Utilized Vehicle %", value: "15 %", subtext: "vs prev 5 %", barCurrent: 40, barPrevious: 60 }
      ],
      dispatchRouting: [
        { label: "Avg. Dispatch Assignment Time", value: "00:30 Sec" },
        { label: "Avg. Rider Wait Time", value: "02:30 Min" },
        { label: "Avg. Fleet Response Radius (km)", value: "1.5 KM" },
        { label: "Avg. Available Vehicles per Request", value: "1.75" },
        { label: "First-Time Assignment (%)", value: "90 %", subtext: "vs prev 85 %", barCurrent: 60, barPrevious: 40 },
        { label: "Trip Fulfillment (%)", value: "95 %", subtext: "vs prev 90 %", barCurrent: 60, barPrevious: 40 },
        { label: "Avg. Distance to Nearest Vehicle (km)", value: "4.5", subtext: "vs prev 44", barCurrent: 60, barPrevious: 40 },
        { label: "On Time Pickup %", value: "90 %", subtext: "vs prev 95 %", barCurrent: 60, barPrevious: 40 },
        { label: "Avg Vehicles Available per Request", value: "5.25", subtext: "vs prev 5.45", barCurrent: 60, barPrevious: 40 },
        { label: "Dispatch Coverage (%)", value: "95 %", subtext: "vs prev 90 %", barCurrent: 60, barPrevious: 40 },
        { label: "Avg. Ride NPS", value: "4.25", subtext: "vs prev 4.15", barCurrent: 60, barPrevious: 40 },
        { label: "Driver Decline %", value: "13 %", subtext: "vs prev 5 %", barCurrent: 60, barPrevious: 40 },
        { label: "Rider Cancellation %", value: "10 %", subtext: "vs prev 12 %", barCurrent: 60, barPrevious: 40 },
        { label: "Trip Pooling %", value: "23 %", subtext: "vs prev 26 %", barCurrent: 60, barPrevious: 40 }
      ],
      vehicleHealth: [
        { label: "Avg. Vehicle Downtime (hrs/day)", value: "02:30 Min" },
        { label: "Avg. Repair Time per Vehicle (hrs)", value: "02:30 Min" },
        { label: "Unplanned Breakdowns", value: "13", subtext: "vs prev 4.15", barCurrent: 60, barPrevious: 40 },
        { label: "Overdue Service Vehicles (count)", value: "18", subtext: "vs prev 5", barCurrent: 60, barPrevious: 40 },
        { label: "Scheduled Maintenance Compliance (%)", value: "90 %", subtext: "vs prev 95 %", barCurrent: 60, barPrevious: 40 },
        { label: "Vehicles Due for Service (in 30 Days)", value: "40" },
        { label: "Avg. Vehicle Age (Years)", value: "9" }
      ]
    },
    feb: {
      avgActiveVehicles: 118,
      avgUnallocatedVehicles: 3.8,
      fleetUtilization: [
        { label: "Fleet Utilization (%)", value: "78 %", subtext: "vs prev 74 %", barCurrent: 65, barPrevious: 35 },
        { label: "Total Miles", value: "53,200", subtext: "vs prev 50,670 (+5% ▲)", barCurrent: 75, barPrevious: 35 },
        { label: "Trips per Vehicle Per Day", value: "38", subtext: "vs prev 36", barCurrent: 55, barPrevious: 65 },
        { label: "Empty miles per vehicle (km/day)", value: "5200", subtext: "vs prev 5000 (+4% ▼)", barCurrent: 75, barPrevious: 35 },
        { label: "Avg. Occupancy (pax/trip)", value: "1.55", subtext: "vs prev 1.50", barCurrent: 45, barPrevious: 65 },
        { label: "Vehicle Peak Demand Utilization %", value: "92 %", subtext: "vs prev 90 %", barCurrent: 65, barPrevious: 35 },
        { label: "Idle Time (%)", value: "24 %", subtext: "vs prev 26 %", barCurrent: 35, barPrevious: 65 },
        { label: "Fleet Availability Rate (%)", value: "78 %", subtext: "vs prev 75 %", barCurrent: 65, barPrevious: 35 },
        { label: "Maintenance Downtime per Vehicle (hrs/day)", value: "78 %", subtext: "vs prev 75 %", barCurrent: 65, barPrevious: 35 },
        { label: "Avg Empty Miles per Trip", value: "1.70", subtext: "vs prev 1.75", barCurrent: 35, barPrevious: 65 },
        { label: "Ride Requests per Vehicle", value: "38", subtext: "vs prev 36", barCurrent: 55, barPrevious: 65 },
        { label: "Under Utilized Vehicle %", value: "12 %", subtext: "vs prev 15 %", barCurrent: 35, barPrevious: 65 }
      ],
      dispatchRouting: [
        { label: "Avg. Dispatch Assignment Time", value: "00:28 Sec" },
        { label: "Avg. Rider Wait Time", value: "02:25 Min" },
        { label: "Avg. Fleet Response Radius (km)", value: "1.4 KM" },
        { label: "Avg. Available Vehicles per Request", value: "1.80" },
        { label: "First-Time Assignment (%)", value: "92 %", subtext: "vs prev 90 %", barCurrent: 65, barPrevious: 35 },
        { label: "Trip Fulfillment (%)", value: "97 %", subtext: "vs prev 95 %", barCurrent: 65, barPrevious: 35 },
        { label: "Avg. Distance to Nearest Vehicle (km)", value: "4.3", subtext: "vs prev 4.5", barCurrent: 65, barPrevious: 35 },
        { label: "On Time Pickup %", value: "92 %", subtext: "vs prev 90 %", barCurrent: 65, barPrevious: 35 },
        { label: "Avg Vehicles Available per Request", value: "5.40", subtext: "vs prev 5.25", barCurrent: 65, barPrevious: 35 },
        { label: "Dispatch Coverage (%)", value: "97 %", subtext: "vs prev 95 %", barCurrent: 65, barPrevious: 35 },
        { label: "Avg. Ride NPS", value: "4.30", subtext: "vs prev 4.25", barCurrent: 65, barPrevious: 35 },
        { label: "Driver Decline %", value: "11 %", subtext: "vs prev 13 %", barCurrent: 65, barPrevious: 35 },
        { label: "Rider Cancellation %", value: "8 %", subtext: "vs prev 10 %", barCurrent: 65, barPrevious: 35 },
        { label: "Trip Pooling %", value: "25 %", subtext: "vs prev 23 %", barCurrent: 65, barPrevious: 35 }
      ],
      vehicleHealth: [
        { label: "Avg. Vehicle Downtime (hrs/day)", value: "02:25 Min" },
        { label: "Avg. Repair Time per Vehicle (hrs)", value: "02:25 Min" },
        { label: "Unplanned Breakdowns", value: "11", subtext: "vs prev 13", barCurrent: 65, barPrevious: 35 },
        { label: "Overdue Service Vehicles (count)", value: "15", subtext: "vs prev 18", barCurrent: 65, barPrevious: 35 },
        { label: "Scheduled Maintenance Compliance (%)", value: "92 %", subtext: "vs prev 90 %", barCurrent: 65, barPrevious: 35 },
        { label: "Vehicles Due for Service (in 30 Days)", value: "38" },
        { label: "Avg. Vehicle Age (Years)", value: "8.5" }
      ]
    }
  };

  useEffect(() => {
    updateDashboard();
  }, [selectedPeriod, selectedVehicleClass, selectedOwnership, selectedShift, selectedTripTypes]);

  const updateDashboard = () => {
    // For demo, only period filter affects data significantly
    const data = dataSets[selectedPeriod] || dataSets['all'];
    setDashboardData(data);
  };

  const MetricCard = ({ data }: { data: MetricData }) => (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-600 leading-tight">
            {data.label}
          </div>
          <div className="text-lg sm:text-xl font-bold text-gray-900">
            {data.value}
          </div>
          
          {data.subtext && (
            <div className="text-xs text-gray-500">
              {data.subtext}
            </div>
          )}
          
          {data.barCurrent !== undefined && data.barPrevious !== undefined && (
            <div className="space-y-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${data.barCurrent}%` }}
                />
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-400 rounded-full transition-all duration-300"
                  style={{ width: `${data.barPrevious}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">
                Current / Previous
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const HighlightCard = ({ label, value, icon }: { label: string; value: string; icon?: string }) => (
    <Card className="bg-sky-400 border-sky-400 text-white">
      <CardContent className="p-4 text-center">
        <div className="text-xs text-white/90 mb-2">
          {label}
        </div>
        <div className="text-2xl font-bold">
          {value}
        </div>
        {icon && (
          <div className="text-xl mt-2">
            {icon}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const GreenHighlightCard = ({ label, value }: { label: string; value: string }) => (
    <Card className="bg-green-100 border-green-200">
      <CardContent className="p-4">
        <div className="text-xs text-green-700 mb-1">
          {label}
        </div>
        <div className="text-2xl font-bold text-green-800">
          {value}
        </div>
      </CardContent>
    </Card>
  );

  const YellowHighlightCard = ({ label, value }: { label: string; value: string }) => (
    <Card className="bg-yellow-100 border-yellow-200">
      <CardContent className="p-4">
        <div className="text-xs text-yellow-700 mb-1">
          {label}
        </div>
        <div className="text-2xl font-bold text-yellow-800">
          {value}
        </div>
      </CardContent>
    </Card>
  );

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 px-2 py-1 rounded text-xs">
                <span className="text-sky-400 font-bold">deepworks</span>
              </div>
              <div className="text-sm sm:text-base font-semibold">
                Fleet Efficiency & Deployment - Level 1
              </div>
            </div>
            <div className="text-xs text-gray-300 bg-slate-600 px-3 py-1 rounded">
              Data Last Updated on | 1st Jan 2022
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Filters Section */}
        <div className="bg-gray-300 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="bg-white rounded px-3 py-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Period :</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="h-8 text-xs border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="jan">January</SelectItem>
                  <SelectItem value="feb">February</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded px-3 py-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Vehicle Class :</label>
              <Select value={selectedVehicleClass} onValueChange={setSelectedVehicleClass}>
                <SelectTrigger className="h-8 text-xs border-gray-300">
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

            <div className="bg-white rounded px-3 py-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Vehicle Ownership :</label>
              <Select value={selectedOwnership} onValueChange={setSelectedOwnership}>
                <SelectTrigger className="h-8 text-xs border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="owned">Owned</SelectItem>
                  <SelectItem value="leased">Leased</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded px-3 py-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Shift :</label>
              <Select value={selectedShift} onValueChange={setSelectedShift}>
                <SelectTrigger className="h-8 text-xs border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded px-3 py-2">
              <label className="text-xs font-medium text-gray-700 block mb-1">Trip Types :</label>
              <Select value={selectedTripTypes} onValueChange={setSelectedTripTypes}>
                <SelectTrigger className="h-8 text-xs border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <HighlightCard
            label="Average Active Vehicles (per Day)"
            value={dashboardData.avgActiveVehicles.toString()}
          />
          <HighlightCard
            label="Average Unallocated Vehicles (per Day)"
            value={dashboardData.avgUnallocatedVehicles.toString()}
            icon="💡"
          />
        </div>

        {/* Fleet Utilization Efficiency Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-2 border-l-4 border-blue-500 mb-4">
            Fleet Utilization Efficiency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {dashboardData.fleetUtilization.map((metric, index) => (
              <MetricCard key={index} data={metric} />
            ))}
          </div>
        </section>

        <hr className="border-t-2 border-blue-500 my-6" />

        {/* Dispatch & Routing Efficiency Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-2 border-l-4 border-blue-500 mb-4">
            Dispatch & Routing Efficiency
          </h2>
          
          {/* Green Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <GreenHighlightCard
              label="Avg. Dispatch Assignment Time"
              value="00:30 Sec"
            />
            <GreenHighlightCard
              label="Avg. Rider Wait Time"
              value="02:30 Min"
            />
            <GreenHighlightCard
              label="Avg. Fleet Response Radius (km)"
              value="1.5 KM"
            />
            <GreenHighlightCard
              label="Avg. Available Vehicles per Request"
              value="1.75"
            />
          </div>

          {/* Regular Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {dashboardData.dispatchRouting.slice(4).map((metric, index) => (
              <MetricCard key={index} data={metric} />
            ))}
          </div>
        </section>

        <hr className="border-t-2 border-blue-500 my-6" />

        {/* Vehicle Health & Efficiency Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-2 border-l-4 border-blue-500 mb-4">
            Vehicle Health & Efficiency
          </h2>
          
          {/* Yellow Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <YellowHighlightCard
              label="Avg. Vehicle Downtime (hrs/day)"
              value="02:30 Min"
            />
            <YellowHighlightCard
              label="Avg. Repair Time per Vehicle (hrs)"
              value="02:30 Min"
            />
          </div>

          {/* Regular Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {dashboardData.vehicleHealth.slice(2).map((metric, index) => (
              <MetricCard key={index} data={metric} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};