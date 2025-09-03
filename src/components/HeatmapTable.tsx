import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeatmapData {
  time: string;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  sun: number;
}

interface HeatmapTableProps {
  title: string;
  data: HeatmapData[];
}

export const HeatmapTable = ({ title, data }: HeatmapTableProps) => {
  const getHeatmapColor = (value: number) => {
    if (value >= 80) return 'bg-chart-1/80 text-white';
    if (value >= 60) return 'bg-chart-4/60 text-white';
    if (value >= 40) return 'bg-chart-2/60 text-foreground';
    if (value >= 20) return 'bg-chart-2/30 text-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left p-1 font-medium min-w-[60px]">Time</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Mon</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Tue</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Wed</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Thu</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Fri</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Sat</th>
                <th className="text-center p-1 font-medium min-w-[35px]">Sun</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="p-1 font-medium text-xs">{row.time}</td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.mon)}`}>
                    {row.mon}
                  </td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.tue)}`}>
                    {row.tue}
                  </td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.wed)}`}>
                    {row.wed}
                  </td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.thu)}`}>
                    {row.thu}
                  </td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.fri)}`}>
                    {row.fri}
                  </td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.sat)}`}>
                    {row.sat}
                  </td>
                  <td className={`text-center p-1 rounded m-0.5 text-xs ${getHeatmapColor(row.sun)}`}>
                    {row.sun}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};