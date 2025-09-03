import { FleetHeader } from "./FleetHeader";
import { MetricCard } from "./MetricCard";
import { UtilizationChart } from "./UtilizationChart";
import { PerformanceChart } from "./PerformanceChart";
import { BarChart } from "./BarChart";
import { HeatmapTable } from "./HeatmapTable";
import { FleetHistogram } from "./FleetHistogram";
import { VendorPerformanceTable } from "./VendorPerformanceTable";
import { FleetMap } from "./FleetMap";
import { dataService, FilterOptions } from "@/lib/data-service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        heatmapData,
        fleetUtilizationData,
        ownVehiclesData, 
        vendorVehiclesData,
        performanceData,
        tripDurationData,
        vendorPerformanceData,
        idleTimeData,
        vehicleUtilizationData,
        shiftUtilizationData,
        utilizationHistogramData,
        maintenanceData,
        dispatchMetrics,
        fleetMetrics,
        vehicles
      ] = await Promise.all([
        dataService.getHeatmapData(),
        dataService.getUtilizationData(filters),
        dataService.getOwnVehiclesData(filters),
        dataService.getVendorVehiclesData(filters),
        dataService.getPerformanceTimeSeriesData(),
        dataService.getTripDurationData(),
        dataService.getVendorPerformanceData(filters),
        dataService.getIdleTimeByVehicleData(filters),
        dataService.getVehicleUtilizationData(filters),
        dataService.getShiftUtilizationData(filters),
        dataService.getVehicleUtilizationHistogram(),
        dataService.getMaintenanceData(filters),
        dataService.getDispatchMetrics(filters),
        dataService.getFleetMetrics(filters),
        dataService.getVehicles(filters)
      ]);

      setDashboardData({
        heatmapData,
        fleetUtilizationData,
        ownVehiclesData,
        vendorVehiclesData,
        performanceData,
        tripDurationData,
        vendorPerformanceData,
        idleTimeData,
        vehicleUtilizationData,
        shiftUtilizationData,
        utilizationHistogramData,
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

  const updateFilter = (key: keyof FilterOptions, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <FleetHeader />
      
      {/* Filter Controls */}
      <div className="container max-w-7xl mx-auto px-6 py-4 border-b">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="text-sm font-medium">Filters:</div>
          
          <Select onValueChange={(value) => updateFilter('vehicleType', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {dataService.getVehicleTypes().map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter('status', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {dataService.getVehicleStatuses().map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter('vendor', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              {dataService.getUniqueVendors().map(vendor => (
                <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter('shift', value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Shift" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Shifts</SelectItem>
              {dataService.getShifts().map(shift => (
                <SelectItem key={shift} value={shift}>{shift}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
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
                  value={dashboardData.fleetMetrics?.avgUtilization?.toString() || "0"}
                  unit="%"
                  prevValue="75"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.avgUtilization || 0}
                />
                <MetricCard
                  title="Total Miles"
                  value={dashboardData.fleetMetrics?.totalMiles?.toLocaleString() || "0"}
                  prevValue="45,800"
                  showProgress={true}
                  progressValue={85}
                />
                <MetricCard
                  title="Active Vehicles"
                  value={dashboardData.fleetMetrics?.activeVehicles?.toString() || "0"}
                  prevValue="44"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.utilizationRate || 0}
                />
                <MetricCard
                  title="Total Vehicles"
                  value={dashboardData.fleetMetrics?.totalVehicles?.toString() || "0"}
                  prevValue="100"
                  showProgress={true}
                  progressValue={100}
                />
                <MetricCard
                  title="Avg. Fuel Level"
                  value={dashboardData.fleetMetrics?.avgFuel?.toString() || "0"}
                  unit="%"
                  prevValue="75"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.avgFuel || 0}
                />
                <MetricCard
                  title="Utilization Rate %"
                  value={dashboardData.fleetMetrics?.utilizationRate?.toString() || "0"}
                  unit="%"
                  prevValue="95"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.utilizationRate || 0}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="Idle Vehicles"
                  value={dashboardData.fleetMetrics?.idleVehicles?.toString() || "0"}
                  prevValue="28"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.idleVehicles || 0}
                />
                <MetricCard
                  title="Fleet Availability Rate (%)"
                  value={dashboardData.fleetMetrics?.utilizationRate?.toString() || "0"}
                  unit="%"
                  prevValue="76"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.utilizationRate || 0}
                />
                <MetricCard
                  title="Maintenance Vehicles"
                  value={dashboardData.fleetMetrics?.maintenanceVehicles?.toString() || "0"}
                  prevValue="10"
                  showProgress={true}
                  progressValue={dashboardData.fleetMetrics?.maintenanceVehicles || 0}
                />
                <MetricCard
                  title="Avg Vehicle Age"
                  value={dashboardData.maintenanceData?.avgVehicleAge?.toString() || "0"}
                  unit="years"
                  prevValue="8"
                  showProgress={true}
                  progressValue={72}
                />
                <MetricCard
                  title="Vehicles Due Service"
                  value={dashboardData.maintenanceData?.vehiclesDueForService?.toString() || "0"}
                  prevValue="44"
                  showProgress={true}
                  progressValue={68}
                />
                <MetricCard
                  title="Maintenance Compliance"
                  value={dashboardData.maintenanceData?.scheduledMaintenanceCompliance?.toString() || "0"}
                  unit="%"
                  prevValue="95"
                  showProgress={true}
                  progressValue={dashboardData.maintenanceData?.scheduledMaintenanceCompliance || 0}
                />
              </div>
            </div>

            {/* Dispatch & Routing Efficiency Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary border-t pt-4">Dispatch & Routing Efficiency</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="Avg. Dispatch Assignment Time"
                  value={dashboardData.dispatchMetrics?.avgDispatchTime || "0:00"}
                  unit="Sec"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Rider Wait Time"
                  value={dashboardData.dispatchMetrics?.avgRiderWaitTime || "0:00"}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Fleet Response Radius (km)"
                  value={dashboardData.dispatchMetrics?.fleetResponseRadius || "0"}
                  unit="KM"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Available Vehicles per Request"
                  value={dashboardData.dispatchMetrics?.availableVehiclesPerRequest || "0"}
                  variant="compact"
                />
                <MetricCard
                  title="First-Time Assignment (%)"
                  value={dashboardData.dispatchMetrics?.firstTimeAssignment || 0}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Trip Fulfillment (%)"
                  value={dashboardData.dispatchMetrics?.tripFulfillment || 0}
                  unit="%"
                  variant="compact"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <MetricCard
                  title="On Time Pickup %"
                  value={dashboardData.dispatchMetrics?.onTimePickup || 0}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Avg Vehicles Available per Request"
                  value={dashboardData.dispatchMetrics?.avgVehiclesAvailablePerRequest || "0"}
                  variant="compact"
                />
                <MetricCard
                  title="Dispatch Coverage (%)"
                  value={dashboardData.dispatchMetrics?.dispatchCoverage || 0}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Ride NPS"
                  value={dashboardData.dispatchMetrics?.avgRideNPS || 0}
                  variant="compact"
                />
                <MetricCard
                  title="Driver Decline %"
                  value={dashboardData.dispatchMetrics?.driverDecline || 0}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Rider Cancellation %"
                  value={dashboardData.dispatchMetrics?.riderCancellation || 0}
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
                  value={dashboardData.maintenanceData?.avgVehicleDowntime || "0:00"}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Repair Time per Vehicle (hrs)"
                  value={dashboardData.maintenanceData?.avgRepairTime || "0:00"}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Unplanned Breakdowns"
                  value={dashboardData.maintenanceData?.unplannedBreakdowns || 0}
                  variant="compact"
                />
                <MetricCard
                  title="Overdue Service Vehicles (count)"
                  value={dashboardData.maintenanceData?.overdueServiceVehicles || 0}
                  variant="compact"
                />
                <MetricCard
                  title="Scheduled Maintenance Compliance (%)"
                  value={dashboardData.maintenanceData?.scheduledMaintenanceCompliance || 0}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Vehicles Due for Service (in 30 days)"
                  value={dashboardData.maintenanceData?.vehiclesDueForService || 0}
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Vehicle Age (Years)"
                  value={dashboardData.maintenanceData?.avgVehicleAge || 0}
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
                  data={dashboardData.ownVehiclesData || []}
                  centerValue={`${dashboardData.ownVehiclesData?.[0]?.value || 0}%`}
                  centerLabel="Target: 82%"
                />
              </div>
              <div className="lg:col-span-1">
                <UtilizationChart
                  title="Vendor Vehicles - Utilization"
                  data={dashboardData.vendorVehiclesData || []}
                  centerValue={`${dashboardData.vendorVehiclesData?.[0]?.value || 0}%`}
                  centerLabel="Target: 68%"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <MetricCard
                    title="Average Utilization %"
                    value={dashboardData.fleetMetrics?.avgUtilization?.toString() || "0"}
                    unit="%"
                    prevValue="78"
                    variant="compact"
                  />
                  <MetricCard
                    title="Total Vehicles Filtered"
                    value={dashboardData.fleetMetrics?.totalVehicles?.toString() || "0"}
                    prevValue="100"
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
                  data={dashboardData.performanceData || []}
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
                  data={dashboardData.heatmapData || []}
                />
              </div>
            </div>

            {/* Bottom Section with Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="space-y-4">
                <BarChart
                  title="Utilization by Vehicle Class"
                  data={dashboardData.vehicleUtilizationData || []}
                  dataKey="utilization"
                  nameKey="name"
                  color="hsl(var(--chart-4))"
                  height={200}
                />
                <BarChart
                  title="Utilization by Shift"
                  data={dashboardData.shiftUtilizationData || []}
                  dataKey="utilization"
                  nameKey="name"
                  color="hsl(var(--chart-1))"
                  height={180}
                />
              </div>
              
              <div>
                <FleetHistogram
                  title="Trip Duration Distribution (Minutes)"
                  data={dashboardData.tripDurationData || []}
                  height={200}
                />
                <div className="mt-4">
                  <FleetHistogram
                    title="Histogram Of Vehicle Utilization %"
                    data={dashboardData.utilizationHistogramData || []}
                    height={180}
                  />
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <VendorPerformanceTable
                  title="Top Performers"
                  data={dashboardData.vendorPerformanceData || []}
                  isTopPerformers={true}
                />
                <VendorPerformanceTable
                  title="Idle Time by Vehicle"
                  data={(dashboardData.idleTimeData || []).slice(0, 10).map((item: any) => ({
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
                  vehicles={(dashboardData.vehicles || []).slice(0, 20).map((vehicle: any) => ({
                    id: vehicle.id,
                    lat: vehicle.location.lat,
                    lng: vehicle.location.lng,
                    status: vehicle.status
                  }))}
                />
              </div>
              <div className="lg:col-span-1">
                <MetricCard
                  title="Trip Pooling %"
                  value={dashboardData.dispatchMetrics?.tripPooling || 0}
                  unit="%"
                  variant="compact"
                />
                <div className="mt-4">
                  <MetricCard
                    title="Avg. Distance to Nearest Vehicle (km)"
                    value={dashboardData.dispatchMetrics?.avgDistanceToNearestVehicle || 0}
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