import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

export const KPICard = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeLabel, 
  variant = 'default',
  size = 'md' 
}: KPICardProps) => {
  const getTrendIcon = () => {
    if (!change) return <Minus className="h-3 w-3" />;
    return change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />;
  };

  const getTrendColor = () => {
    if (!change) return 'text-muted-foreground';
    return change > 0 ? 'text-success' : 'text-destructive';
  };

  const cardVariants = {
    default: 'border-border',
    primary: 'border-primary/20 bg-primary-light/50',
    success: 'border-success/20 bg-success-light/50',
    warning: 'border-warning/20 bg-warning-light/50',
    destructive: 'border-destructive/20 bg-destructive-light/50',
  };

  const sizeVariants = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <Card className={cn('transition-all hover:shadow-md', cardVariants[variant])}>
      <CardHeader className={cn('pb-2', sizeVariants[size])}>
        <CardTitle className={cn(
          'text-sm font-medium text-muted-foreground tracking-wide uppercase',
          size === 'lg' && 'text-base'
        )}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn('pt-0', sizeVariants[size])}>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline space-x-1">
            <span className={cn(
              'text-2xl font-bold text-foreground',
              size === 'sm' && 'text-xl',
              size === 'lg' && 'text-3xl'
            )}>
              {value}
            </span>
            {unit && (
              <span className="text-sm text-muted-foreground font-medium">
                {unit}
              </span>
            )}
          </div>
          
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              <div className={cn('flex items-center space-x-1', getTrendColor())}>
                {getTrendIcon()}
                <span className="text-xs font-medium">
                  {Math.abs(change)}{changeLabel || '%'}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {change !== undefined && (
          <div className="mt-2">
            <Badge 
              variant="secondary" 
              className={cn(
                'text-xs',
                change > 0 && 'bg-success-light text-success-foreground',
                change < 0 && 'bg-destructive-light text-destructive-foreground',
                change === 0 && 'bg-muted text-muted-foreground'
              )}
            >
              vs prev. period
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};