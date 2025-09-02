import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface UtilizationData {
  name: string;
  value: number;
  color: string;
}

interface UtilizationChartProps {
  title: string;
  data: UtilizationData[];
  centerValue?: string;
  centerLabel?: string;
}

export const UtilizationChart = ({ 
  title, 
  data, 
  centerValue, 
  centerLabel 
}: UtilizationChartProps) => {
  const COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderCenterContent = () => {
    if (!centerValue) return null;
    
    return (
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
        <tspan 
          x="50%" 
          y="45%" 
          className="text-2xl font-bold fill-foreground"
        >
          {centerValue}
        </tspan>
        <tspan 
          x="50%" 
          y="55%" 
          className="text-xs fill-muted-foreground"
        >
          {centerLabel}
        </tspan>
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {renderCenterContent()}
              <Tooltip 
                formatter={(value: any, name: string) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};