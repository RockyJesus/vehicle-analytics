import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VendorData {
  vendor: string;
  utilization: number;
}

interface PerformanceTableProps {
  title: string;
  data: VendorData[];
  isTopPerformers?: boolean;
}

export const VendorPerformanceTable = ({ 
  title, 
  data, 
  isTopPerformers = true 
}: PerformanceTableProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          {!isTopPerformers && (
            <CardTitle className="text-sm font-semibold bg-muted px-2 py-1 rounded">
              Bottom Performers
            </CardTitle>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-muted-foreground border-b pb-2">
            <div>Vendor</div>
            <div className="text-right">Utilization %</div>
          </div>
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 items-center py-2 hover:bg-muted/30 rounded px-2">
              <div className="text-sm font-medium">{item.vendor}</div>
              <div className="flex items-center justify-end space-x-2">
                <div className="w-16">
                  <Progress 
                    value={item.utilization} 
                    className="h-2"
                  />
                </div>
                <span className="text-sm font-bold min-w-[35px] text-right">
                  {item.utilization}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};