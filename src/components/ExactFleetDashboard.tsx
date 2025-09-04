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
      
      <div className="container max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="level1" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="level1">Fleet Efficiency & Deployment - Level 1</TabsTrigger>
            <TabsTrigger value="level2">Utilization Analysis - Level 2</TabsTrigger>
          </TabsList>

          <TabsContent value="level1" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="level2" className="space-y-6">
            {/* Level 2 Dashboard Content */}
            <div className="grid grid-cols-12 gap-4">
              {/* Left Column - Pie Charts */}
              <div className="col-span-3 space-y-4">
                <UtilizationChart
                  title="Own Vehicles - Utilization"
                  data={[
                    { name: 'Utilized', value: 90, color: '#10B981' },
                    { name: 'Idle', value: 10, color: '#F59E0B' }
                  ]}
                  centerValue="90%"
                  centerLabel="Target: 82%"
                />
                <UtilizationChart
                  title="Vendor Vehicles - Utilization"
                  data={[
                    { name: 'Utilized', value: 65, color: '#10B981' },
                    { name: 'Idle', value: 35, color: '#F59E0B' }
                  ]}
                  centerValue="65%"
                  centerLabel="Target: 68%"
                />
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold mb-3">Trip Type</h3>
                  <div className="space-y-2">
                    <div className="w-16 h-16 mx-auto">
                      <div className="w-full h-full rounded-full bg-blue-500"></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold mb-3">Utilization by Vehicle Class</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Scorpio</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '84%'}}></div>
                        </div>
                        <span>84</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Bolero</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '76%'}}></div>
                        </div>
                        <span>76</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Safari</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '68%'}}></div>
                        </div>
                        <span>68</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Mini Van</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '58%'}}></div>
                        </div>
                        <span>58</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold mb-3">Utilization by Shift</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Shift A</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '84%'}}></div>
                        </div>
                        <span>84</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Shift B</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '78%'}}></div>
                        </div>
                        <span>78</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Shift C</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded">
                          <div className="h-2 bg-blue-500 rounded" style={{width: '65%'}}></div>
                        </div>
                        <span>65</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Column - Charts */}
              <div className="col-span-6 space-y-4">
                <div className="grid grid-cols-5 gap-2 mb-4">
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
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <MetricCard
                    title="Volatility Index"
                    value="7.4"
                    variant="compact"
                  />
                  <MetricCard
                    title="Demand-to-Fleet Ratio"
                    value="6.5"
                    variant="compact"
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-semibold">Fleet Utilization % by Date</h3>
                    <div className="flex space-x-1 text-xs">
                      <button className="px-2 py-1 bg-gray-700 text-white rounded">Monthly</button>
                      <button className="px-2 py-1 bg-gray-200 rounded">Weekly</button>
                      <button className="px-2 py-1 bg-gray-200 rounded">Daily</button>
                      <button className="px-2 py-1 bg-gray-200 rounded">Quarterly</button>
                    </div>
                  </div>
                  <PerformanceChart 
                    title="Fleet Utilization % by Date"
                    data={dashboardData.performanceData || []}
                    lines={[
                      { dataKey: 'utilization', name: 'Average Utilization %', color: '#3B82F6' },
                      { dataKey: 'percentile75', name: '75th Percentile', color: '#EF4444' },
                      { dataKey: 'percentile90', name: '90th Percentile', color: '#10B981' }
                    ]}
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold mb-4">Trip Duration Distribution (Minutes)</h3>
                  <FleetHistogram 
                    title="Trip Duration Distribution (Minutes)"
                    data={dashboardData.tripDurationData || []} 
                  />
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold mb-4">Histogram Of Vehicle Utilization %</h3>
                  <FleetHistogram 
                    title="Histogram Of Vehicle Utilization %"
                    data={dashboardData.utilizationHistogramData || []} 
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-3 space-y-4">
                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold">Fleet Utilization % By Day & Time</h3>
                    <div className="text-xs">
                      <select className="border rounded px-2 py-1">
                        <option>Vehicle Class: Scorpio</option>
                      </select>
                    </div>
                  </div>
                  <HeatmapTable 
                    title="Fleet Utilization % By Day & Time"
                    data={dashboardData.heatmapData || []} 
                  />
                </div>

                <div className="bg-white rounded-lg border">
                  <div className="bg-gray-700 text-white px-4 py-2 rounded-t-lg">
                    <h3 className="text-sm font-semibold">Top Performers</h3>
                  </div>
                  <div className="p-4">
                    <VendorPerformanceTable 
                      title="Top Performers"
                      data={dashboardData.vendorPerformanceData || []} 
                    />
                  </div>
                  <div className="bg-gray-300 text-gray-700 px-4 py-2">
                    <h3 className="text-sm font-semibold">Bottom Performers</h3>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-sm font-semibold mb-3">Idle Time by Vehicle</h3>
                  <div className="space-y-1 text-xs">
                    {dashboardData.idleTimeData?.slice(0, 20).map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="w-8">{item.vehicle}</span>
                        <div className="flex items-center space-x-2 flex-1 ml-2">
                          <div className="flex-1 h-3 bg-gray-200 rounded">
                            <div 
                              className="h-3 bg-blue-500 rounded" 
                              style={{width: `${item.idleTime}%`}}
                            ></div>
                          </div>
                          <span className="w-8 text-right">{item.idleTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};