import { FleetHeader } from "./FleetHeader";
import { MetricCard } from "./MetricCard";
import { dataService, FilterOptions } from "@/lib/data-service";
import { useState, useEffect } from "react";

export const ExactFleetDashboard = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [dashboardData, setDashboardData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [filters]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [
        maintenanceData,
        dispatchMetrics,
        fleetMetrics,
        vehicles
      ] = await Promise.all([
        dataService.getMaintenanceData(filters),
        dataService.getDispatchMetrics(filters),
        dataService.getFleetMetrics(filters),
        dataService.getVehicles(filters)
      ]);

      setDashboardData({
        maintenanceData,
        dispatchMetrics,
        fleetMetrics,
        vehicles
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FleetHeader />
      
      <div className="container max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Fleet Utilization Efficiency Section */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-2 border-l-4 border-blue-500">Fleet Utilization Efficiency</h2>
          
          <div className="grid grid-cols-6 gap-3">
            <MetricCard
              title="Fleet Utilization (%)"
              value="74"
              unit="%"
              prevValue="75"
              showProgress={true}
              progressValue={74}
            />
            <MetricCard
              title="Total Miles"
              value="50,670"
              prevValue="45,800 (+10%)"
              showProgress={true}
              progressValue={85}
            />
            <MetricCard
              title="Trips per Vehicle Per Day"
              value="36"
              prevValue="44"
              showProgress={true}
              progressValue={72}
            />
            <MetricCard
              title="Empty Miles per Vehicle (km/day)"
              value="5000"
              prevValue="5,500 (+10%)"
              showProgress={true}
              progressValue={90}
            />
            <MetricCard
              title="Avg. Occupancy (pax/trip)"
              value="1.50"
              prevValue="1.75"
              showProgress={true}
              progressValue={75}
            />
            <MetricCard
              title="Vehicle Peak Demand Utilization %"
              value="90"
              unit="%"
              prevValue="95"
              showProgress={true}
              progressValue={90}
            />
          </div>

          <div className="grid grid-cols-6 gap-3">
            <MetricCard
              title="Idle Time (%)"
              value="26"
              unit="%"
              prevValue="28"
              showProgress={true}
              progressValue={26}
            />
            <MetricCard
              title="Fleet Availability Rate (%)"
              value="75"
              unit="%"
              prevValue="76"
              showProgress={true}
              progressValue={75}
            />
            <MetricCard
              title="Maintenance Downtime per Vehicle (hrs/day)"
              value="75"
              unit="%"
              prevValue="26"
              showProgress={true}
              progressValue={75}
            />
            <MetricCard
              title="Avg Empty Miles per Trip"
              value="1.75"
              prevValue="1.9"
              showProgress={true}
              progressValue={85}
            />
            <MetricCard
              title="Ride Requests per Vehicle"
              value="36"
              prevValue="44"
              showProgress={true}
              progressValue={70}
            />
            <MetricCard
              title="Under Utilized Vehicle %"
              value="15"
              unit="%"
              prevValue="5"
              showProgress={true}
              progressValue={15}
            />
          </div>
        </div>

        {/* Dispatch & Routing Efficiency Section */}
        <div className="space-y-4 border-t-4 border-blue-500 pt-4">
          <h2 className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-2 border-l-4 border-blue-500">Dispatch & Routing Efficiency</h2>
          
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 mb-1">Avg. Dispatch Assignment Time</div>
              <div className="text-2xl font-bold text-green-800">00:30 <span className="text-xs font-normal">Sec</span></div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 mb-1">Avg. Rider Wait Time</div>
              <div className="text-2xl font-bold text-green-800">02:30 <span className="text-xs font-normal">Min</span></div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 mb-1">Avg. Fleet Response Radius (km)</div>
              <div className="text-2xl font-bold text-green-800">1.5 <span className="text-xs font-normal">KM</span></div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-xs text-green-700 mb-1">Avg. Available Vehicles per Request</div>
              <div className="text-2xl font-bold text-green-800">1.75</div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3">
            <MetricCard
              title="First-Time Assignment (%)"
              value="90"
              unit="%"
              prevValue="95"
              showProgress={true}
              progressValue={90}
            />
            <MetricCard
              title="Trip Fulfillment (%)"
              value="95"
              unit="%"
              prevValue="90"
              showProgress={true}
              progressValue={95}
            />
            <MetricCard
              title="Avg. Distance to Nearest Vehicle (km)"
              value="4.5"
              prevValue="4.4"
              showProgress={true}
              progressValue={80}
            />
            <MetricCard
              title="On Time Pickup %"
              value="90"
              unit="%"
              prevValue="95"
              showProgress={true}
              progressValue={90}
            />
            <MetricCard
              title="Avg Vehicles Available per Request"
              value="5.25"
              prevValue="5.45"
              showProgress={true}
              progressValue={85}
            />
            <MetricCard
              title="Dispatch Coverage (%)"
              value="95"
              unit="%"
              prevValue="90"
              showProgress={true}
              progressValue={95}
            />
          </div>

          <div className="grid grid-cols-6 gap-3">
            <MetricCard
              title="Avg. Ride NPS"
              value="4.25"
              prevValue="4.15"
              showProgress={true}
              progressValue={85}
            />
            <MetricCard
              title="Driver Decline %"
              value="13"
              unit="%"
              prevValue="5"
              showProgress={true}
              progressValue={25}
            />
            <MetricCard
              title="Rider Cancellation %"
              value="10"
              unit="%"
              prevValue="12"
              showProgress={true}
              progressValue={20}
            />
            <MetricCard
              title="Trip Pooling %"
              value="23"
              unit="%"
              prevValue="26"
              showProgress={true}
              progressValue={23}
            />
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Vehicle Health & Efficiency Section */}
        <div className="space-y-4 border-t-4 border-blue-500 pt-4">
          <h2 className="text-sm font-semibold text-blue-800 bg-blue-50 px-3 py-2 border-l-4 border-blue-500">Vehicle Health & Efficiency</h2>
          
          <div className="grid grid-cols-7 gap-3">
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="text-xs text-yellow-700 mb-1">Avg. Vehicle Downtime (hrs/day)</div>
              <div className="text-2xl font-bold text-yellow-800">02:30 <span className="text-xs font-normal">Min</span></div>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
              <div className="text-xs text-yellow-700 mb-1">Avg. Repair Time per Vehicle (hrs)</div>
              <div className="text-2xl font-bold text-yellow-800">02:30 <span className="text-xs font-normal">Min</span></div>
            </div>
            <MetricCard
              title="Unplanned Breakdowns"
              value="13"
              prevValue="4"
              showProgress={true}
              progressValue={30}
            />
            <MetricCard
              title="Overdue Service Vehicles (count)"
              value="18"
              showProgress={true}
              progressValue={40}
            />
            <MetricCard
              title="Scheduled Maintenance Compliance (%)"
              value="90"
              unit="%"
              prevValue="95"
              showProgress={true}
              progressValue={90}
            />
            <MetricCard
              title="Vehicles Due for Service (in 30 days)"
              value="40"
              showProgress={true}
              progressValue={60}
            />
            <MetricCard
              title="Avg. Vehicle Age (Years)"
              value="9"
              showProgress={true}
              progressValue={75}
            />
          </div>
        </div>
      </div>
    </div>
  );
};