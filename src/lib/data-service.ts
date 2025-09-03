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
      const response = await fetch('/fleet-data.json');
      this.data = await response.json();
      return this.data!;
    } catch (error) {
      console.error('Failed to load fleet data:', error);
      throw new Error('Failed to load fleet data');
    }
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