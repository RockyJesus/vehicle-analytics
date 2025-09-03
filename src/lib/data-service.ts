// Data service for loading and filtering fleet data from JSON

export interface Vehicle {
  id: string;
  name: string;
  type: 'Scorpio' | 'Bolero' | 'Safari' | 'Mini Van';
  status: 'active' | 'idle' | 'maintenance';
  utilization: number;
  location: {
    lat: number;
    lng: number;
  };
  fuel: number;
  mileage: number;
  lastUpdate: string;
  vendor: string;
  shift: 'Shift A' | 'Shift B' | 'Shift C';
  tripCount: number;
  idleTime: number;
  maintenanceStatus: 'excellent' | 'good' | 'fair' | 'repair';
  age: number;
  downtime: number;
}

export interface FleetData {
  vehicles: Vehicle[];
  heatmapData: any[];
  tripDurationData: any[];
  performanceTimeSeries: any[];
  utilizationHistogram: any[];
}

export interface FilterOptions {
  vehicleType?: string;
  status?: string;
  vendor?: string;
  shift?: string;
  utilizationMin?: number;
  utilizationMax?: number;
  maintenanceStatus?: string;
}

class DataService {
  private data: FleetData | null = null;

  async loadData(): Promise<FleetData> {
    if (this.data) {
      return this.data;
    }

    try {
      // Generate mock data since we're in a demo environment
      this.data = this.generateMockData();
      return this.data;
    } catch (error) {
      console.error('Failed to load fleet data:', error);
      // Fallback to generated data
      this.data = this.generateMockData();
      return this.data;
    }
  }

  private generateMockData(): FleetData {
    const vehicles: Vehicle[] = Array.from({ length: 150 }, (_, i) => ({
      id: `VH${String(i + 1).padStart(3, '0')}`,
      name: `Vehicle ${i + 1}`,
      type: ['Scorpio', 'Bolero', 'Safari', 'Mini Van'][Math.floor(Math.random() * 4)] as Vehicle['type'],
      status: ['active', 'idle', 'maintenance'][Math.floor(Math.random() * 3)] as Vehicle['status'],
      utilization: Math.floor(Math.random() * 40) + 60,
      location: {
        lat: 28.6139 + (Math.random() - 0.5) * 0.1,
        lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      },
      fuel: Math.floor(Math.random() * 40) + 60,
      mileage: Math.floor(Math.random() * 50000) + 20000,
      lastUpdate: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      vendor: ['Thriveni Vehicles', 'Chintamani Devi', 'Neha Kumari', 'Suraj Tiwari', 'Sabita Devi', 'Sanjay', 'John'][Math.floor(Math.random() * 7)],
      shift: ['Shift A', 'Shift B', 'Shift C'][Math.floor(Math.random() * 3)] as Vehicle['shift'],
      tripCount: Math.floor(Math.random() * 20),
      idleTime: Math.random() * 10,
      maintenanceStatus: ['excellent', 'good', 'fair', 'repair'][Math.floor(Math.random() * 4)] as Vehicle['maintenanceStatus'],
      age: Math.floor(Math.random() * 10) + 1,
      downtime: Math.random() * 5
    }));

    return {
      vehicles,
      heatmapData: [
        { time: '12:00 AM', mon: 96, tue: 24, wed: 18, thu: 67, fri: 21, sat: 21, sun: 21 },
        { time: '02:00 AM', mon: 45, tue: 30, wed: 77, thu: 66, fri: 20, sat: 34, sun: 21 },
        { time: '04:00 AM', mon: 34, tue: 78, wed: 98, thu: 55, fri: 14, sat: 35, sun: 23 },
        { time: '06:00 AM', mon: 23, tue: 34, wed: 67, thu: 100, fri: 18, sat: 56, sun: 23 },
        { time: '08:00 AM', mon: 45, tue: 45, wed: 32, thu: 31, fri: 78, sat: 76, sun: 45 },
        { time: '10:00 AM', mon: 55, tue: 96, wed: 45, thu: 34, fri: 53, sat: 35, sun: 52 },
        { time: '12:00 PM', mon: 56, tue: 64, wed: 55, thu: 28, fri: 78, sat: 45, sun: 87 },
        { time: '02:00 PM', mon: 78, tue: 50, wed: 49, thu: 64, fri: 40, sat: 49, sun: 56 },
        { time: '04:00 PM', mon: 43, tue: 34, wed: 45, thu: 34, fri: 73, sat: 55, sun: 56 },
        { time: '06:00 PM', mon: 87, tue: 34, wed: 33, thu: 39, fri: 22, sat: 46, sun: 44 },
        { time: '08:00 PM', mon: 78, tue: 34, wed: 45, thu: 39, fri: 53, sat: 49, sun: 73 },
        { time: '10:00 PM', mon: 44, tue: 34, wed: 49, thu: 49, fri: 77, sat: 57, sun: 76 }
      ],
      tripDurationData: [
        { range: '0-5', count: 50 },
        { range: '5-10', count: 120 },
        { range: '10-15', count: 180 },
        { range: '15-20', count: 250 },
        { range: '20-25', count: 300 },
        { range: '25-30', count: 280 },
        { range: '30-35', count: 200 },
        { range: '35-40', count: 150 },
        { range: '40-45', count: 100 },
        { range: '45+', count: 80 }
      ],
      performanceTimeSeries: [
        { period: 'Jan 22', utilization: 68, percentile75: 60, percentile90: 50 },
        { period: 'Feb 22', utilization: 72, percentile75: 65, percentile90: 55 },
        { period: 'Mar 22', utilization: 75, percentile75: 70, percentile90: 60 },
        { period: 'Apr 22', utilization: 74, percentile75: 70, percentile90: 65 },
        { period: 'May 22', utilization: 78, percentile75: 75, percentile90: 70 },
        { period: 'Jun 22', utilization: 74, percentile75: 70, percentile90: 65 }
      ],
      utilizationHistogram: [
        { range: '0-10', count: 0 },
        { range: '10-20', count: 5 },
        { range: '20-30', count: 15 },
        { range: '30-40', count: 25 },
        { range: '40-50', count: 35 },
        { range: '50-60', count: 45 },
        { range: '60-70', count: 55 },
        { range: '70-80', count: 65 },
        { range: '80-90', count: 50 },
        { range: '90-100', count: 35 }
      ]
    };
  }

  async getVehicles(filters?: FilterOptions): Promise<Vehicle[]> {
    const data = await this.loadData();
    let vehicles = data.vehicles;

    if (filters) {
      vehicles = vehicles.filter(vehicle => {
        if (filters.vehicleType && vehicle.type !== filters.vehicleType) {
          return false;
        }
        if (filters.status && vehicle.status !== filters.status) {
          return false;
        }
        if (filters.vendor && vehicle.vendor !== filters.vendor) {
          return false;
        }
        if (filters.shift && vehicle.shift !== filters.shift) {
          return false;
        }
        if (filters.utilizationMin && vehicle.utilization < filters.utilizationMin) {
          return false;
        }
        if (filters.utilizationMax && vehicle.utilization > filters.utilizationMax) {
          return false;
        }
        if (filters.maintenanceStatus && vehicle.maintenanceStatus !== filters.maintenanceStatus) {
          return false;
        }
        return true;
      });
    }

    return vehicles;
  }

  async getFleetMetrics(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    
    const totalVehicles = vehicles.length;
    const activeVehicles = vehicles.filter(v => v.status === 'active').length;
    const idleVehicles = vehicles.filter(v => v.status === 'idle').length;
    const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance').length;
    
    const avgUtilization = Math.round(
      vehicles.reduce((sum, v) => sum + v.utilization, 0) / totalVehicles
    );
    
    const totalMiles = vehicles.reduce((sum, v) => sum + v.mileage, 0);
    const avgFuel = Math.round(
      vehicles.reduce((sum, v) => sum + v.fuel, 0) / totalVehicles
    );

    return {
      totalVehicles,
      activeVehicles,
      idleVehicles,
      maintenanceVehicles,
      avgUtilization,
      totalMiles,
      avgFuel,
      utilizationRate: Math.round((activeVehicles / totalVehicles) * 100)
    };
  }

  async getUtilizationData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    const utilized = vehicles.filter(v => v.status === 'active').length;
    const idle = vehicles.filter(v => v.status !== 'active').length;
    
    const utilizedPercentage = Math.round((utilized / vehicles.length) * 100);
    const idlePercentage = 100 - utilizedPercentage;

    return [
      { name: 'Utilized', value: utilizedPercentage, color: 'hsl(var(--chart-1))' },
      { name: 'Idle', value: idlePercentage, color: 'hsl(var(--chart-2))' }
    ];
  }

  async getOwnVehiclesData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    // Assume first 3 vendors are "own" vehicles
    const ownVendors = ['Thriveni Vehicles', 'Chintamani Devi', 'Neha Kumari'];
    const ownVehicles = vehicles.filter(v => ownVendors.includes(v.vendor));
    
    const utilized = ownVehicles.filter(v => v.status === 'active').length;
    const idle = ownVehicles.filter(v => v.status !== 'active').length;
    
    const utilizedPercentage = Math.round((utilized / ownVehicles.length) * 100);
    const idlePercentage = 100 - utilizedPercentage;

    return [
      { name: 'Utilized', value: utilizedPercentage, color: 'hsl(var(--chart-1))' },
      { name: 'Idle', value: idlePercentage, color: 'hsl(var(--chart-3))' }
    ];
  }

  async getVendorVehiclesData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    // Assume last 4 vendors are "vendor" vehicles
    const vendorNames = ['Suraj Tiwari', 'Sabita Devi', 'Sanjay', 'John'];
    const vendorVehicles = vehicles.filter(v => vendorNames.includes(v.vendor));
    
    const utilized = vendorVehicles.filter(v => v.status === 'active').length;
    const idle = vendorVehicles.filter(v => v.status !== 'active').length;
    
    const utilizedPercentage = Math.round((utilized / vendorVehicles.length) * 100);
    const idlePercentage = 100 - utilizedPercentage;

    return [
      { name: 'Utilized', value: utilizedPercentage, color: 'hsl(var(--chart-1))' },
      { name: 'Idle', value: idlePercentage, color: 'hsl(var(--chart-3))' }
    ];
  }

  async getVehicleUtilizationData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    const typeStats = vehicles.reduce((acc, vehicle) => {
      if (!acc[vehicle.type]) {
        acc[vehicle.type] = { total: 0, utilizationSum: 0 };
      }
      acc[vehicle.type].total++;
      acc[vehicle.type].utilizationSum += vehicle.utilization;
      return acc;
    }, {} as Record<string, { total: number; utilizationSum: number }>);

    return Object.entries(typeStats).map(([type, stats]) => ({
      name: type,
      utilization: Math.round(stats.utilizationSum / stats.total)
    }));
  }

  async getShiftUtilizationData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    const shiftStats = vehicles.reduce((acc, vehicle) => {
      if (!acc[vehicle.shift]) {
        acc[vehicle.shift] = { total: 0, utilizationSum: 0 };
      }
      acc[vehicle.shift].total++;
      acc[vehicle.shift].utilizationSum += vehicle.utilization;
      return acc;
    }, {} as Record<string, { total: number; utilizationSum: number }>);

    return Object.entries(shiftStats).map(([shift, stats]) => ({
      name: shift,
      utilization: Math.round(stats.utilizationSum / stats.total)
    }));
  }

  async getVendorPerformanceData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    const vendorStats = vehicles.reduce((acc, vehicle) => {
      if (!acc[vehicle.vendor]) {
        acc[vehicle.vendor] = { total: 0, utilizationSum: 0 };
      }
      acc[vehicle.vendor].total++;
      acc[vehicle.vendor].utilizationSum += vehicle.utilization;
      return acc;
    }, {} as Record<string, { total: number; utilizationSum: number }>);

    return Object.entries(vendorStats)
      .map(([vendor, stats]) => ({
        vendor,
        utilization: Math.round(stats.utilizationSum / stats.total)
      }))
      .sort((a, b) => b.utilization - a.utilization);
  }

  async getIdleTimeByVehicleData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    return vehicles
      .map(vehicle => ({
        vehicle: vehicle.id,
        idleTime: Math.round(vehicle.idleTime * 10) // Convert to percentage-like value
      }))
      .sort((a, b) => b.idleTime - a.idleTime)
      .slice(0, 20); // Top 20 for display
  }

  async getMaintenanceData(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    const maintenanceVehicles = vehicles.filter(v => v.status === 'maintenance');
    const avgDowntime = vehicles.reduce((sum, v) => sum + v.downtime, 0) / vehicles.length;
    const avgAge = vehicles.reduce((sum, v) => sum + v.age, 0) / vehicles.length;
    
    const overdueService = vehicles.filter(v => v.maintenanceStatus === 'repair').length;
    const dueForService = vehicles.filter(v => 
      v.maintenanceStatus === 'fair' || v.age > 5
    ).length;

    return {
      avgVehicleDowntime: `${Math.floor(avgDowntime)}:${Math.round((avgDowntime % 1) * 60).toString().padStart(2, '0')}`,
      avgRepairTime: `${Math.floor(avgDowntime)}:${Math.round((avgDowntime % 1) * 60).toString().padStart(2, '0')}`,
      unplannedBreakdowns: maintenanceVehicles.length,
      overdueServiceVehicles: overdueService,
      scheduledMaintenanceCompliance: Math.round((1 - overdueService / vehicles.length) * 100),
      vehiclesDueForService: dueForService,
      avgVehicleAge: Math.round(avgAge)
    };
  }

  async getDispatchMetrics(filters?: FilterOptions) {
    const vehicles = await this.getVehicles(filters);
    const activeVehicles = vehicles.filter(v => v.status === 'active');
    
    return {
      avgDispatchTime: '00:30',
      avgRiderWaitTime: '02:30',
      fleetResponseRadius: '1.5',
      availableVehiclesPerRequest: (activeVehicles.length / 100).toFixed(2),
      onTimePickup: 90,
      avgVehiclesAvailablePerRequest: (activeVehicles.length / 20).toFixed(2),
      dispatchCoverage: Math.round((activeVehicles.length / vehicles.length) * 100),
      avgRideNPS: 4.25,
      firstTimeAssignment: 90,
      tripFulfillment: 95,
      avgDistanceToNearestVehicle: 4.5,
      driverDecline: 13,
      riderCancellation: 10,
      tripPooling: 23
    };
  }

  async getHeatmapData(): Promise<any[]> {
    const data = await this.loadData();
    return data.heatmapData;
  }

  async getTripDurationData(): Promise<any[]> {
    const data = await this.loadData();
    return data.tripDurationData;
  }

  async getPerformanceTimeSeriesData(): Promise<any[]> {
    const data = await this.loadData();
    return data.performanceTimeSeries;
  }

  async getVehicleUtilizationHistogram(): Promise<any[]> {
    const data = await this.loadData();
    return data.utilizationHistogram;
  }

  getUniqueVendors(): string[] {
    return ['Thriveni Vehicles', 'Chintamani Devi', 'Neha Kumari', 'Suraj Tiwari', 'Sabita Devi', 'Sanjay', 'John'];
  }

  getVehicleTypes(): string[] {
    return ['Scorpio', 'Bolero', 'Safari', 'Mini Van'];
  }

  getVehicleStatuses(): string[] {
    return ['active', 'idle', 'maintenance'];
  }

  getShifts(): string[] {
    return ['Shift A', 'Shift B', 'Shift C'];
  }

  getMaintenanceStatuses(): string[] {
    return ['excellent', 'good', 'fair', 'repair'];
  }
}

export const dataService = new DataService();