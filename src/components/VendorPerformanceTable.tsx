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
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground border-b pb-2">
            <div>Vendor</div>
            <div className="text-right">Utilization %</div>
          </div>
          {data.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 items-center py-2 hover:bg-muted/30 rounded px-2">
              <div className="text-xs font-medium truncate">{item.vendor}</div>
              <div className="flex items-center justify-end space-x-2">
                <div className="w-12 sm:w-16">
                  <Progress 
                    value={item.utilization} 
                    className="h-2"
                  />
                </div>
                <span className="text-xs font-bold min-w-[30px] text-right">
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