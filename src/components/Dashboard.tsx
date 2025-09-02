import { useState, useEffect } from "react";
import { KPICard } from "./KPICard";
import { UtilizationChart } from "./UtilizationChart";
import { PerformanceChart } from "./PerformanceChart";
import { BarChart } from "./BarChart";
import { VehicleTable } from "./VehicleTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  generateFleetMetrics, 
  generateVehicles, 
  generatePerformanceData,
  generateVendorPerformance,
  generateUtilizationByType,
  generateShiftData,
  Vehicle 
} from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Settings } from "lucide-react";

export const Dashboard = () => {
  const [metrics, setMetrics] = useState(generateFleetMetrics());
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVehicles(generateVehicles());
  }, []);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMetrics(generateFleetMetrics());
    setVehicles(generateVehicles());
    setIsLoading(false);
  };

  const performanceData = generatePerformanceData();
  const vendorData = generateVendorPerformance();
  const utilizationByType = generateUtilizationByType();
  const shiftData = generateShiftData();

  const utilizationData = [
    { name: 'Active', value: 75, color: 'hsl(var(--success))' },
    { name: 'Idle', value: 20, color: 'hsl(var(--warning))' },
    { name: 'Maintenance', value: 5, color: 'hsl(var(--destructive))' }
  ];

  const activeVehicles = vehicles.filter(v => v.status === 'active');
  const idleVehicles = vehicles.filter(v => v.status === 'idle');
  const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-xl font-bold">Fleet Analytics</div>
              <Badge variant="secondary" className="bg-primary-light text-primary-dark">
                Level 1
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="secondary" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2 text-sm opacity-90">
            Data Last Updated on | {new Date().toLocaleDateString('en-US', { 
              day: '2-digit', 
              month: 'short', 
              year: 'numeric' 
            })}
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
            <TabsTrigger value="utilization">Utilization Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Average Active Vehicles (per Day)"
                value={metrics.activeVehicles}
                variant="primary"
                change={5.2}
              />
              <KPICard
                title="Average Unallocated Vehicles (per Day)"
                value={metrics.idleVehicles}
                change={-2.1}
              />
              <KPICard
                title="Total Miles"
                value={metrics.totalMiles.toLocaleString()}
                change={10.5}
                changeLabel=""
              />
              <KPICard
                title="Avg. Rider Wait Time"
                value={metrics.avgRiderWaitTime}
                unit="Min"
                change={-0.3}
                changeLabel=" min"
                variant="success"
              />
            </div>

            {/* Fleet Utilization Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <UtilizationChart
                  title="Fleet Utilization Efficiency"
                  data={utilizationData}
                  centerValue="74%"
                  centerLabel="Current"
                />
              </div>
              <div className="lg:col-span-2">
                <PerformanceChart
                  title="Fleet Utilization % by Date"
                  data={performanceData}
                  lines={[
                    { dataKey: 'utilization', name: 'Average Utilization %', color: 'hsl(var(--primary))' },
                    { dataKey: 'efficiency', name: 'Efficiency %', color: 'hsl(var(--success))' }
                  ]}
                />
              </div>
            </div>

            {/* Vehicle Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BarChart
                title="Utilization by Vehicle Class"
                data={utilizationByType}
                dataKey="utilization"
                nameKey="name"
                color="hsl(var(--primary))"
              />
              <BarChart
                title="Utilization by Shift"
                data={shiftData}
                dataKey="utilization"
                nameKey="shift"
                color="hsl(var(--success))"
              />
            </div>
          </TabsContent>

          <TabsContent value="utilization" className="space-y-6">
            {/* Utilization Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KPICard
                title="Fleet Utilization"
                value={74}
                unit="%"
                change={1.5}
                variant="primary"
                size="lg"
              />
              <KPICard
                title="Idle Time"
                value={26}
                unit="%"
                change={-1.2}
                variant="warning"
                size="lg"
              />
              <KPICard
                title="Fleet Availability Rate"
                value={95}
                unit="%"
                change={2.1}
                variant="success"
                size="lg"
              />
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <VehicleTable
                  title="Top Performing Vehicles"
                  vehicles={activeVehicles.sort((a, b) => b.utilization - a.utilization)}
                  limit={8}
                />
              </div>
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">Vendor Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {vendorData.map((vendor, index) => (
                        <div key={vendor.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <div>
                            <div className="font-medium">{vendor.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {vendor.vehicles} vehicles
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">{vendor.utilization}%</div>
                            <div className="text-xs text-muted-foreground">
                              ★ {vendor.rating}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <KPICard
                title="Avg. Dispatch Assignment Time"
                value="00:30"
                unit="Sec"
                change={-10}
                variant="success"
              />
              <KPICard
                title="Avg. Rider Wait Time"
                value="02:30"
                unit="Min"
                change={-5}
                variant="success"
              />
              <KPICard
                title="Fleet Response Radius"
                value="1.5"
                unit="KM"
                change={0}
              />
              <KPICard
                title="On Time Pickup %"
                value={90}
                unit="%"
                change={2}
                variant="primary"
              />
            </div>

            {/* Detailed Tables */}
            <div className="space-y-6">
              <VehicleTable
                title="All Vehicles - Detailed View"
                vehicles={vehicles}
                limit={20}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};