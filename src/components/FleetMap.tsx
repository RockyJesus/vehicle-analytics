import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Note: For the demo, we'll create a placeholder map component
// In a real implementation, you would integrate with Mapbox or Leaflet

interface MapProps {
  title: string;
  vehicles?: Array<{
    id: string;
    lat: number;
    lng: number;
    status: 'active' | 'idle' | 'maintenance';
  }>;
}

export const FleetMap = ({ title, vehicles = [] }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Placeholder for map initialization
    // In a real implementation, you would initialize Mapbox/Leaflet here
    if (mapContainer.current) {
      // Example: mapboxgl.accessToken = 'your-token';
      // const map = new mapboxgl.Map({...});
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapContainer} 
          className="w-full h-64 bg-muted rounded-lg flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5e7eb' fill-opacity='0.3'%3E%3Cpath d='m0 40 40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '20px 20px'
          }}
        >
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold text-muted-foreground">GPS Fleet Tracking Map</div>
            <div className="text-sm text-muted-foreground">
              Interactive map showing real-time vehicle locations
            </div>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-xs">Active ({vehicles.filter(v => v.status === 'active').length})</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-xs">Idle ({vehicles.filter(v => v.status === 'idle').length})</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span className="text-xs">Maintenance ({vehicles.filter(v => v.status === 'maintenance').length})</span>
              </div>
            </div>
          </div>
          
          {/* Simulated vehicle markers */}
          <div className="absolute inset-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  i < 5 ? 'bg-success' : i < 7 ? 'bg-warning' : 'bg-destructive'
                }`}
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>🗺️ To integrate a real map, add your Mapbox token and uncomment the map initialization code.</p>
          <p>📍 This placeholder shows simulated vehicle locations across the fleet coverage area.</p>
        </div>
      </CardContent>
    </Card>
  );
};