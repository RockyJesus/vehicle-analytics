// Exact mock data matching the reference dashboard images

export const getHeatmapData = () => [
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
];

export const getFleetUtilizationData = () => [
  { name: 'Utilized', value: 74, color: 'hsl(var(--chart-1))' },
  { name: 'Idle', value: 26, color: 'hsl(var(--chart-2))' }
];

export const getOwnVehiclesData = () => [
  { name: 'Utilized', value: 90, color: 'hsl(var(--chart-1))' },
  { name: 'Idle', value: 10, color: 'hsl(var(--chart-3))' }
];

export const getVendorVehiclesData = () => [
  { name: 'Utilized', value: 65, color: 'hsl(var(--chart-1))' },
  { name: 'Idle', value: 35, color: 'hsl(var(--chart-3))' }
];

export const getPerformanceTimeSeriesData = () => [
  { period: 'Jan 22', utilization: 68, percentile75: 60, percentile90: 50 },
  { period: 'Feb 22', utilization: 72, percentile75: 65, percentile90: 55 },
  { period: 'Mar 22', utilization: 75, percentile75: 70, percentile90: 60 },
  { period: 'Apr 22', utilization: 74, percentile75: 70, percentile90: 65 },
  { period: 'May 22', utilization: 78, percentile75: 75, percentile90: 70 },
  { period: 'Jun 22', utilization: 74, percentile75: 70, percentile90: 65 }
];

export const getTripDurationData = () => [
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
];

export const getVendorPerformanceData = () => [
  { vendor: 'Thriveni Vehicles', utilization: 95 },
  { vendor: 'Chintamani Devi', utilization: 94 },
  { vendor: 'Neha Kumari', utilization: 93 },
  { vendor: 'Suraj Tiwari', utilization: 92 },
  { vendor: 'Sabita Devi', utilization: 92 },
  { vendor: 'Sanjay', utilization: 91 },
  { vendor: 'John', utilization: 90 }
];

export const getIdleTimeByVehicleData = () => [
  { vehicle: 'VH 1', idleTime: 91 },
  { vehicle: 'VH 2', idleTime: 87 },
  { vehicle: 'VH 3', idleTime: 85 },
  { vehicle: 'VH 4', idleTime: 84 },
  { vehicle: 'VH 5', idleTime: 80 },
  { vehicle: 'VH 6', idleTime: 78 },
  { vehicle: 'VH 7', idleTime: 76 },
  { vehicle: 'VH 8', idleTime: 75 },
  { vehicle: 'VH 9', idleTime: 65 },
  { vehicle: 'VH 10', idleTime: 55 },
  { vehicle: 'VH 11', idleTime: 45 },
  { vehicle: 'VH 12', idleTime: 44 },
  { vehicle: 'VH 13', idleTime: 39 },
  { vehicle: 'VH 14', idleTime: 38 },
  { vehicle: 'VH 15', idleTime: 35 },
  { vehicle: 'VH 16', idleTime: 30 },
  { vehicle: 'VH 17', idleTime: 28 },
  { vehicle: 'VH 18', idleTime: 26 },
  { vehicle: 'VH 19', idleTime: 25 },
  { vehicle: 'VH 20', idleTime: 25 }
];

export const getVehicleUtilizationData = () => [
  { name: 'Scorpio', utilization: 84 },
  { name: 'Bolero', utilization: 76 },
  { name: 'Safari', utilization: 68 },
  { name: 'Mini Van', utilization: 58 }
];

export const getShiftUtilizationData = () => [
  { name: 'Shift A', utilization: 84 },
  { name: 'Shift B', utilization: 78 },
  { name: 'Shift C', utilization: 65 }
];

export const getVehicleUtilizationHistogram = () => [
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
];

export const getMaintenanceData = () => ({
  avgVehicleDowntime: '02:30',
  avgRepairTime: '02:30',
  unplannedBreakdowns: 13,
  overdueServiceVehicles: 18,
  scheduledMaintenanceCompliance: 90,
  vehiclesDueForService: 40,
  avgVehicleAge: 9
});

export const getDispatchMetrics = () => ({
  avgDispatchTime: '00:30',
  avgRiderWaitTime: '02:30',
  fleetResponseRadius: '1.5',
  availableVehiclesPerRequest: 1.75,
  onTimePickup: 90,
  avgVehiclesAvailablePerRequest: 5.25,
  dispatchCoverage: 95,
  avgRideNPS: 4.25,
  firstTimeAssignment: 90,
  tripFulfillment: 95,
  avgDistanceToNearestVehicle: 4.5,
  driverDecline: 13,
  riderCancellation: 10,
  tripPooling: 23
});