// Mock data generator for fleet analytics dashboard

export interface Vehicle {
  id: string;
  name: string;
  type: 'Scorpio' | 'Bolero' | 'Safari' | 'Mini Van';
  utilization: number;
  status: 'active' | 'idle' | 'maintenance';
  location: { lat: number; lng: number };
  fuel: number;
  mileage: number;
  lastUpdate: Date;
}

export interface FleetMetrics {
  totalVehicles: number;
  activeVehicles: number;
  idleVehicles: number;
  maintenanceVehicles: number;
  avgUtilization: number;
  totalMiles: number;
  avgRiderWaitTime: number;
  fleetResponseRadius: number;
}

export interface PerformanceData {
  period: string;
  utilization: number;
  trips: number;
  revenue: number;
  efficiency: number;
}

export interface VendorPerformance {
  name: string;
  utilization: number;
  vehicles: number;
  rating: number;
}

// Generate mock fleet data
export const generateFleetMetrics = (): FleetMetrics => ({
  totalVehicles: 150,
  activeVehicles: 112,
  idleVehicles: 26,
  maintenanceVehicles: 12,
  avgUtilization: 74,
  totalMiles: 50670,
  avgRiderWaitTime: 2.5,
  fleetResponseRadius: 1.5,
});

export const generateVehicles = (count: number = 150): Vehicle[] => {
  const types: Vehicle['type'][] = ['Scorpio', 'Bolero', 'Safari', 'Mini Van'];
  const statuses: Vehicle['status'][] = ['active', 'idle', 'maintenance'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `VH${String(i + 1).padStart(3, '0')}`,
    name: `Vehicle ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    utilization: Math.floor(Math.random() * 40) + 60, // 60-100%
    status: statuses[Math.floor(Math.random() * statuses.length)],
    location: {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
    },
    fuel: Math.floor(Math.random() * 40) + 60, // 60-100%
    mileage: Math.floor(Math.random() * 200) + 100,
    lastUpdate: new Date(Date.now() - Math.random() * 86400000), // Last 24 hours
  }));
};

export const generatePerformanceData = (): PerformanceData[] => [
  { period: 'Jan 22', utilization: 68, trips: 1240, revenue: 45000, efficiency: 72 },
  { period: 'Feb 22', utilization: 72, trips: 1380, revenue: 48000, efficiency: 75 },
  { period: 'Mar 22', utilization: 75, trips: 1420, revenue: 52000, efficiency: 78 },
  { period: 'Apr 22', utilization: 74, trips: 1350, revenue: 49000, efficiency: 76 },
  { period: 'May 22', utilization: 78, trips: 1480, revenue: 55000, efficiency: 80 },
  { period: 'Jun 22', utilization: 74, trips: 1400, revenue: 51000, efficiency: 74 },
];

export const generateVendorPerformance = (): VendorPerformance[] => [
  { name: 'Thriveni Vehicles', utilization: 95, vehicles: 28, rating: 4.8 },
  { name: 'Chintamani Devi', utilization: 94, vehicles: 25, rating: 4.7 },
  { name: 'Neha Kumari', utilization: 93, vehicles: 22, rating: 4.6 },
  { name: 'Suraj Tiwari', utilization: 92, vehicles: 24, rating: 4.5 },
  { name: 'Sabita Devi', utilization: 92, vehicles: 26, rating: 4.5 },
  { name: 'Sanjay', utilization: 91, vehicles: 18, rating: 4.4 },
  { name: 'John', utilization: 90, vehicles: 20, rating: 4.3 },
];

export const generateUtilizationByType = () => [
  { name: 'Scorpio', utilization: 84, total: 45 },
  { name: 'Bolero', utilization: 76, total: 38 },
  { name: 'Safari', utilization: 68, total: 42 },
  { name: 'Mini Van', utilization: 58, total: 25 },
];

export const generateShiftData = () => [
  { shift: 'Shift A', utilization: 84, vehicles: 50 },
  { shift: 'Shift B', utilization: 78, vehicles: 48 },
  { shift: 'Shift C', utilization: 65, vehicles: 52 },
];

export const generateTimeSeriesData = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  return hours.map(hour => ({
    time: `${hour.toString().padStart(2, '0')}:00`,
    utilization: Math.floor(Math.random() * 40) + 50,
    active: Math.floor(Math.random() * 30) + 70,
    idle: Math.floor(Math.random() * 20) + 10,
  }));
};