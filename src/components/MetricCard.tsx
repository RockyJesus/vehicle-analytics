import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  prevValue?: string | number;
  prevLabel?: string;
  showProgress?: boolean;
  progressValue?: number;
  variant?: 'default' | 'compact';
}

export const MetricCard = ({ 
  title, 
  value, 
  unit, 
  prevValue, 
  prevLabel = "vs prev",
  showProgress = false,
  progressValue,
  variant = 'default'
}: MetricCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className={variant === 'compact' ? "p-3" : "p-4"}>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground leading-tight">
            {title}
          </h3>
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-1">
              <span className={`font-bold text-foreground ${variant === 'compact' ? 'text-xl' : 'text-2xl'}`}>
                {value}
              </span>
              {unit && (
                <span className="text-sm text-muted-foreground font-medium">
                  {unit}
                </span>
              )}
            </div>
          </div>
          
          {prevValue && (
            <div className="text-xs text-muted-foreground">
              {prevLabel} {prevValue} {unit}
            </div>
          )}
          
          {showProgress && progressValue !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-success">Current</span>
                <span className="text-chart-2">Previous</span>
              </div>
              <div className="relative">
                <Progress value={progressValue} className="h-2" />
                <div className="absolute top-0 left-0 w-full h-2 bg-chart-2/30 rounded-full -z-10"></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};