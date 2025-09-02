import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Vehicle } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface VehicleTableProps {
  title: string;
  vehicles: Vehicle[];
  limit?: number;
}

export const VehicleTable = ({ title, vehicles, limit = 10 }: VehicleTableProps) => {
  const getStatusVariant = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'idle':
        return 'secondary';
      case 'maintenance':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active':
        return 'text-success';
      case 'idle':
        return 'text-warning';
      case 'maintenance':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const displayVehicles = limit ? vehicles.slice(0, limit) : vehicles;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Fuel</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayVehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.id}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vehicle.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={getStatusVariant(vehicle.status)}
                      className={getStatusColor(vehicle.status)}
                    >
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={vehicle.utilization} className="w-20" />
                      <span className="text-sm font-medium min-w-[35px]">
                        {vehicle.utilization}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={vehicle.fuel} 
                        className={cn(
                          "w-16",
                          vehicle.fuel < 30 && "[&>div]:bg-destructive",
                          vehicle.fuel >= 30 && vehicle.fuel < 60 && "[&>div]:bg-warning",
                          vehicle.fuel >= 60 && "[&>div]:bg-success"
                        )}
                      />
                      <span className="text-sm">{vehicle.fuel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{vehicle.mileage.toLocaleString()} km</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(vehicle.lastUpdate, { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};