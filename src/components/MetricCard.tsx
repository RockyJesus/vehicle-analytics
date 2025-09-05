import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="h-full border border-gray-200 bg-white">
      <CardContent className={variant === 'compact' ? "p-3" : "p-4"}>
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-gray-600 leading-tight">
            {title}
          </h3>
          <div className="flex items-baseline space-x-1">
            <span className={`font-bold text-gray-900 ${variant === 'compact' ? 'text-lg' : 'text-xl'}`}>
              {value}
            </span>
            {unit && unit !== 'undefined' && (
              <span className="text-xs text-gray-600 font-medium">
                {unit}
              </span>
            )}
          </div>
          
          {prevValue && (
            <div className="text-xs text-gray-500">
              {prevLabel} {prevValue}
            </div>
          )}
          
          {showProgress && progressValue !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-blue-600">Current</span>
                <span className="text-green-500">Previous</span>
              </div>
              <div className="space-y-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(Math.max(progressValue, 0), 100)}%` }}
                  ></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(Math.max((progressValue || 0) + 5, 0), 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};