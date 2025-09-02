import { FleetHeader } from "./FleetHeader";
import { MetricCard } from "./MetricCard";
import { UtilizationChart } from "./UtilizationChart";
import { PerformanceChart } from "./PerformanceChart";
import { BarChart } from "./BarChart";
import { HeatmapTable } from "./HeatmapTable";
import { FleetHistogram } from "./FleetHistogram";
import { VendorPerformanceTable } from "./VendorPerformanceTable";
import { FleetMap } from "./FleetMap";
import { 
  getHeatmapData,
  getFleetUtilizationData,
  getOwnVehiclesData,
  getVendorVehiclesData,
  getPerformanceTimeSeriesData,
  getTripDurationData,
  getVendorPerformanceData,
  getIdleTimeByVehicleData,
  getVehicleUtilizationData,
  getShiftUtilizationData,
  getVehicleUtilizationHistogram,
  getMaintenanceData,
  getDispatchMetrics
} from "@/lib/exact-mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ExactFleetDashboard = () => {
  const heatmapData = getHeatmapData();
  const fleetUtilizationData = getFleetUtilizationData();
  const ownVehiclesData = getOwnVehiclesData();
  const vendorVehiclesData = getVendorVehiclesData();
  const performanceData = getPerformanceTimeSeriesData();
  const tripDurationData = getTripDurationData();
  const vendorPerformanceData = getVendorPerformanceData();
  const idleTimeData = getIdleTimeByVehicleData();
  const vehicleUtilizationData = getVehicleUtilizationData();
  const shiftUtilizationData = getShiftUtilizationData();
  const utilizationHistogramData = getVehicleUtilizationHistogram();
  const maintenanceData = getMaintenanceData();
  const dispatchMetrics = getDispatchMetrics();

  return (
    <div className="min-h-screen bg-background">
      <FleetHeader />
      
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="level1" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="level1">Fleet Efficiency & Deployment - Level 1</TabsTrigger>
            <TabsTrigger value="level2">Utilization Analysis - Level 2</TabsTrigger>
          </TabsList>

          <TabsContent value="level1" className="space-y-6">
            {/* Fleet Utilization Efficiency Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary">Fleet Utilization Efficiency</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
                  prevValue="45,800"
                  showProgress={true}
                  progressValue={85}
                />
                <MetricCard
                  title="Trips per Vehicle Per Day"
                  value="36"
                  prevValue="44"
                  showProgress={true}
                  progressValue={65}
                />
                <MetricCard
                  title="Empty Miles per Vehicle (km/day)"
                  value="5000"
                  prevValue="5,300"
                  showProgress={true}
                  progressValue={78}
                />
                <MetricCard
                  title="Avg. Occupancy (pax/trip)"
                  value="1.50"
                  prevValue="1.75"
                  showProgress={true}
                  progressValue={70}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
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
                  prevValue="76"
                  showProgress={true}
                  progressValue={75}
                />
                <MetricCard
                  title="Avg Empty Miles per Trip"
                  value="1.75"
                  prevValue="1.9"
                  showProgress={true}
                  progressValue={72}
                />
                <MetricCard
                  title="Ride Requests per Vehicle"
                  value="36"
                  prevValue="44"
                  showProgress={true}
                  progressValue={68}
                />
                <MetricCard
                  title="Under Utilized Vehicle %"
                  value="15"
                  unit="%"
                  prevValue="5"
                  showProgress={true}
                  progressValue={85}
                />
              </div>
            </div>

            {/* Dispatch & Routing Efficiency Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary border-t pt-4">Dispatch & Routing Efficiency</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="Avg. Dispatch Assignment Time"
                  value={dispatchMetrics.avgDispatchTime}
                  unit="Sec"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Rider Wait Time"
                  value={dispatchMetrics.avgRiderWaitTime}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Fleet Response Radius (km)"
                  value={dispatchMetrics.fleetResponseRadius}
                  unit="KM"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Available Vehicles per Request"
                  value={dispatchMetrics.availableVehiclesPerRequest}
                  variant="compact"
                />
                <MetricCard
                  title="First-Time Assignment (%)"
                  value={dispatchMetrics.firstTimeAssignment}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Trip Fulfillment (%)"
                  value={dispatchMetrics.tripFulfillment}
                  unit="%"
                  variant="compact"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="On Time Pickup %"
                  value={dispatchMetrics.onTimePickup}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Avg Vehicles Available per Request"
                  value={dispatchMetrics.avgVehiclesAvailablePerRequest}
                  variant="compact"
                />
                <MetricCard
                  title="Dispatch Coverage (%)"
                  value={dispatchMetrics.dispatchCoverage}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Ride NPS"
                  value={dispatchMetrics.avgRideNPS}
                  variant="compact"
                />
                <MetricCard
                  title="Driver Decline %"
                  value={dispatchMetrics.driverDecline}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Rider Cancellation %"
                  value={dispatchMetrics.riderCancellation}
                  unit="%"
                  variant="compact"
                />
              </div>
            </div>

            {/* Vehicle Health & Efficiency Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary border-t pt-4">Vehicle Health & Efficiency</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                <MetricCard
                  title="Avg. Vehicle Downtime (hrs/day)"
                  value={maintenanceData.avgVehicleDowntime}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Repair Time per Vehicle (hrs)"
                  value={maintenanceData.avgRepairTime}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Unplanned Breakdowns"
                  value={maintenanceData.unplannedBreakdowns}
                  variant="compact"
                />
                <MetricCard
                  title="Overdue Service Vehicles (count)"
                  value={maintenanceData.overdueServiceVehicles}
                  variant="compact"
                />
                <MetricCard
                  title="Scheduled Maintenance Compliance (%)"
                  value={maintenanceData.scheduledMaintenanceCompliance}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Vehicles Due for Service (in 30 days)"
                  value={maintenanceData.vehiclesDueForService}
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Vehicle Age (Years)"
                  value={maintenanceData.avgVehicleAge}
                  variant="compact"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="level2" className="space-y-6">
            {/* Level 2 Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Utilization Charts */}
              <div className="lg:col-span-1">
                <UtilizationChart
                  title="Own Vehicles - Utilization"
                  data={ownVehiclesData}
                  centerValue="90%"
                  centerLabel="Target: 82%"
                />
              </div>
              <div className="lg:col-span-1">
                <UtilizationChart
                  title="Vendor Vehicles - Utilization"
                  data={vendorVehiclesData}
                  centerValue="65%"
                  centerLabel="Target: 68%"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <MetricCard
                    title="Average Utilization %"
                    value="74"
                    unit="%"
                    prevValue="78"
                    variant="compact"
                  />
                  <MetricCard
                    title="Utilization % Below Average"
                    value="45.5"
                    unit="%"
                    prevValue="74"
                    variant="compact"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <MetricCard
                    title="Utilization % Above Threshold"
                    value="5.9"
                    unit="%"
                    prevValue="90"
                    variant="compact"
                  />
                  <MetricCard
                    title="Utilization Count Below Target"
                    value="7"
                    prevValue="75"
                    variant="compact"
                  />
                  <MetricCard
                    title="90th-10th Percentile Spread"
                    value="5.9"
                    variant="compact"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <MetricCard
                    title="Demand-to-Fleet Ratio"
                    value="6.5"
                    variant="compact"
                  />
                  <MetricCard
                    title="Volatility Index"
                    value="7.4"
                    variant="compact"
                  />
                </div>
              </div>
            </div>

            {/* Performance Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PerformanceChart
                  title="Fleet Utilization % by Date"
                  data={performanceData}
                  lines={[
                    { dataKey: 'utilization', name: 'Average Utilization %', color: 'hsl(var(--chart-4))' },
                    { dataKey: 'percentile75', name: '75th Percentile', color: 'hsl(var(--chart-3))' },
                    { dataKey: 'percentile90', name: '90th Percentile', color: 'hsl(var(--chart-1))' }
                  ]}
                  height={300}
                />
              </div>
              <div className="lg:col-span-1">
                <HeatmapTable
                  title="Fleet Utilization % By Day & Time"
                  data={heatmapData}
                />
              </div>
            </div>

            {/* Bottom Section with Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <BarChart
                  title="Utilization by Vehicle Class"
                  data={vehicleUtilizationData}
                  dataKey="utilization"
                  nameKey="name"
                  color="hsl(var(--chart-4))"
                  height={200}
                />
                <BarChart
                  title="Utilization by Shift"
                  data={shiftUtilizationData}
                  dataKey="utilization"
                  nameKey="name"
                  color="hsl(var(--chart-1))"
                  height={180}
                />
              </div>
              
              <div>
                <FleetHistogram
                  title="Trip Duration Distribution (Minutes)"
                  data={tripDurationData}
                  height={200}
                />
                <div className="mt-4">
                  <FleetHistogram
                    title="Histogram Of Vehicle Utilization %"
                    data={utilizationHistogramData}
                    height={180}
                  />
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <VendorPerformanceTable
                  title="Top Performers"
                  data={vendorPerformanceData}
                  isTopPerformers={true}
                />
                <VendorPerformanceTable
                  title="Idle Time by Vehicle"
                  data={idleTimeData.slice(0, 10).map(item => ({
                    vendor: item.vehicle,
                    utilization: item.idleTime
                  }))}
                  isTopPerformers={false}
                />
              </div>
            </div>

            {/* GPS Fleet Map */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FleetMap 
                  title="GPS Fleet Tracking - Real-time Vehicle Locations"
                  vehicles={[
                    { id: 'VH001', lat: 28.6139, lng: 77.2090, status: 'active' },
                    { id: 'VH002', lat: 28.6129, lng: 77.2095, status: 'active' },
                    { id: 'VH003', lat: 28.6149, lng: 77.2085, status: 'idle' },
                    { id: 'VH004', lat: 28.6159, lng: 77.2080, status: 'maintenance' },
                  ]}
                />
              </div>
              <div className="lg:col-span-1">
                <MetricCard
                  title="Trip Pooling %"
                  value={dispatchMetrics.tripPooling}
                  unit="%"
                  variant="compact"
                />
                <div className="mt-4">
                  <MetricCard
                    title="Avg. Distance to Nearest Vehicle (km)"
                    value={dispatchMetrics.avgDistanceToNearestVehicle}
                    variant="compact"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};