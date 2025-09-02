import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface HistogramProps {
  title: string;
  data: { range: string; count: number }[];
  height?: number;
}

export const FleetHistogram = ({ title, data, height = 200 }: HistogramProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height }} className="w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="range" 
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                fontSize={10}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--chart-4))"
                radius={[2, 2, 0, 0]}
                stroke="hsl(var(--chart-4))"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};