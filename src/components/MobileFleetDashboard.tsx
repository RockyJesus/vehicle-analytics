import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Filter, X } from "lucide-react";
import { MetricCard } from "./MetricCard";
import { UtilizationChart } from "./UtilizationChart";
import { PerformanceChart } from "./PerformanceChart";
import { BarChart } from "./BarChart";
import { FleetHistogram } from "./FleetHistogram";
import { VendorPerformanceTable } from "./VendorPerformanceTable";
import { HeatmapTable } from "./HeatmapTable";
import { FleetMap } from "./FleetMap";
import { dataService, FilterOptions } from "@/lib/data-service";

export const MobileFleetDashboard = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [dashboardData, setDashboardData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadDashboardData();
    setIsRefreshing(false);
  };

  const updateFilter = (key: keyof FilterOptions, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => value !== undefined).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <div className="text-lg font-medium">Loading Fleet Analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="bg-white px-2 py-1 rounded text-primary font-bold text-sm">
                deepworks
              </div>
              <div className="text-sm font-semibold">Fleet Analytics</div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-8 px-3"
              >
                <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          
          {/* Filter Toggle Button */}
          <div className="flex items-center justify-between">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-8 px-3"
            >
              <Filter className="h-3 w-3 mr-1" />
              Filters
              {getActiveFilterCount() > 0 && (
                <Badge variant="destructive" className="ml-2 h-4 w-4 p-0 text-xs">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
            <div className="text-xs opacity-90">
              Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Expandable Filter Section */}
        {showFilters && (
          <div className="border-t border-primary-foreground/20 bg-primary-dark">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Filter Options</h3>
                <div className="flex items-center space-x-2">
                  {getActiveFilterCount() > 0 && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={clearFilters}
                      className="h-7 px-2 text-xs"
                    >
                      Clear All
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="h-7 w-7 p-0 text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Vehicle Type</label>
                  <select 
                    className="w-full h-8 px-2 text-xs rounded border bg-white text-primary"
                    value={filters.vehicleType || 'all'}
                    onChange={(e) => updateFilter('vehicleType', e.target.value)}
                  >
                    <option value="all">All Types</option>
                    {dataService.getVehicleTypes().map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium">Status</label>
                  <select 
                    className="w-full h-8 px-2 text-xs rounded border bg-white text-primary"
                    value={filters.status || 'all'}
                    onChange={(e) => updateFilter('status', e.target.value)}
                  >
                    <option value="all">All Status</option>
                    {dataService.getVehicleStatuses().map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium">Vendor</label>
                  <select 
                    className="w-full h-8 px-2 text-xs rounded border bg-white text-primary"
                    value={filters.vendor || 'all'}
                    onChange={(e) => updateFilter('vendor', e.target.value)}
                  >
                    <option value="all">All Vendors</option>
                    {dataService.getUniqueVendors().map(vendor => (
                      <option key={vendor} value={vendor}>{vendor}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium">Shift</label>
                  <select 
                    className="w-full h-8 px-2 text-xs rounded border bg-white text-primary"
                    value={filters.shift || 'all'}
                    onChange={(e) => updateFilter('shift', e.target.value)}
                  >
                    <option value="all">All Shifts</option>
                    {dataService.getShifts().map(shift => (
                      <option key={shift} value={shift}>{shift}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="overview" className="text-xs">Fleet Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Key Metrics - Mobile Optimized */}
            <div className="grid grid-cols-2 gap-3">
              <MetricCard
                title="Fleet Utilization"
                value={dashboardData.fleetMetrics?.avgUtilization?.toString() || "0"}
                unit="%"
                prevValue="75"
                showProgress={true}
                progressValue={dashboardData.fleetMetrics?.avgUtilization || 0}
                variant="compact"
              />
              <MetricCard
                title="Active Vehicles"
                value={dashboardData.fleetMetrics?.activeVehicles?.toString() || "0"}
                prevValue="44"
                showProgress={true}
                progressValue={dashboardData.fleetMetrics?.utilizationRate || 0}
                variant="compact"
              />
              <MetricCard
                title="Total Miles"
                value={dashboardData.fleetMetrics?.totalMiles?.toLocaleString() || "0"}
                prevValue="45,800"
                variant="compact"
              />
              <MetricCard
                title="Avg. Fuel Level"
                value={dashboardData.fleetMetrics?.avgFuel?.toString() || "0"}
                unit="%"
                prevValue="75"
                showProgress={true}
                progressValue={dashboardData.fleetMetrics?.avgFuel || 0}
                variant="compact"
              />
            </div>

            {/* Utilization Charts - Stacked for Mobile */}
            <div className="space-y-4">
              <UtilizationChart
                title="Fleet Utilization Efficiency"
                data={dashboardData.fleetUtilizationData || []}
                centerValue={`${dashboardData.fleetMetrics?.avgUtilization || 0}%`}
                centerLabel="Current"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UtilizationChart
                  title="Own Vehicles"
                  data={dashboardData.ownVehiclesData || []}
                  centerValue={`${dashboardData.ownVehiclesData?.[0]?.value || 0}%`}
                  centerLabel="Target: 82%"
                />
                <UtilizationChart
                  title="Vendor Vehicles"
                  data={dashboardData.vendorVehiclesData || []}
                  centerValue={`${dashboardData.vendorVehiclesData?.[0]?.value || 0}%`}
                  centerLabel="Target: 68%"
                />
              </div>
            </div>

            {/* Performance Chart - Full Width */}
            <PerformanceChart
              title="Fleet Utilization % by Date"
              data={dashboardData.performanceData || []}
              lines={[
                { dataKey: 'utilization', name: 'Avg Utilization %', color: 'hsl(var(--chart-4))' },
                { dataKey: 'percentile75', name: '75th Percentile', color: 'hsl(var(--chart-3))' },
                { dataKey: 'percentile90', name: '90th Percentile', color: 'hsl(var(--chart-1))' }
              ]}
              height={250}
            />

            {/* Vehicle Class and Shift Charts */}
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
                height={200}
              />
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            {/* Dispatch Metrics */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Dispatch & Routing</h3>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  title="Avg. Dispatch Time"
                  value={dashboardData.dispatchMetrics?.avgDispatchTime || "0:00"}
                  unit="Sec"
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Wait Time"
                  value={dashboardData.dispatchMetrics?.avgRiderWaitTime || "0:00"}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Response Radius"
                  value={dashboardData.dispatchMetrics?.fleetResponseRadius || "0"}
                  unit="KM"
                  variant="compact"
                />
                <MetricCard
                  title="On Time Pickup"
                  value={dashboardData.dispatchMetrics?.onTimePickup || 0}
                  unit="%"
                  variant="compact"
                />
              </div>
            </div>

            {/* Vehicle Health */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary">Vehicle Health</h3>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  title="Avg. Downtime"
                  value={dashboardData.maintenanceData?.avgVehicleDowntime || "0:00"}
                  unit="Min"
                  variant="compact"
                />
                <MetricCard
                  title="Maintenance Compliance"
                  value={dashboardData.maintenanceData?.scheduledMaintenanceCompliance || 0}
                  unit="%"
                  variant="compact"
                />
                <MetricCard
                  title="Vehicles Due Service"
                  value={dashboardData.maintenanceData?.vehiclesDueForService || 0}
                  variant="compact"
                />
                <MetricCard
                  title="Avg. Vehicle Age"
                  value={dashboardData.maintenanceData?.avgVehicleAge || 0}
                  unit="years"
                  variant="compact"
                />
              </div>
            </div>

            {/* Histograms - Stacked for Mobile */}
            <div className="space-y-4">
              <FleetHistogram
                title="Trip Duration Distribution (Minutes)"
                data={dashboardData.tripDurationData || []}
                height={200}
              />
              <FleetHistogram
                title="Vehicle Utilization % Histogram"
                data={dashboardData.utilizationHistogramData || []}
                height={200}
              />
            </div>

            {/* Performance Tables */}
            <div className="space-y-4">
              <VendorPerformanceTable
                title="Top Performing Vendors"
                data={dashboardData.vendorPerformanceData || []}
                isTopPerformers={true}
              />
              <VendorPerformanceTable
                title="Idle Time by Vehicle"
                data={(dashboardData.idleTimeData || []).slice(0, 8).map((item: any) => ({
                  vendor: item.vehicle,
                  utilization: item.idleTime
                }))}
                isTopPerformers={false}
              />
            </div>

            {/* Heatmap Table - Mobile Optimized */}
            <HeatmapTable
              title="Fleet Utilization % By Day & Time"
              data={dashboardData.heatmapData || []}
            />

            {/* GPS Map */}
            <FleetMap 
              title="GPS Fleet Tracking"
              vehicles={(dashboardData.vehicles || []).slice(0, 15).map((vehicle: any) => ({
                id: vehicle.id,
                lat: vehicle.location?.lat || 0,
                lng: vehicle.location?.lng || 0,
                status: vehicle.status
              }))}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};