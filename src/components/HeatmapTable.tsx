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
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-4 text-xs">
            <span>Vehicle Class</span>
            <select className="border rounded px-2 py-1 text-xs">
              <option>Scorpio</option>
              <option>Bolero</option>
              <option>Safari</option>
              <option>Mini Van</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b">
                <th className="text-left p-1 font-medium">Time</th>
                <th className="text-center p-1 font-medium">Mon</th>
                <th className="text-center p-1 font-medium">Tue</th>
                <th className="text-center p-1 font-medium">Wed</th>
                <th className="text-center p-1 font-medium">Thu</th>
                <th className="text-center p-1 font-medium">Fri</th>
                <th className="text-center p-1 font-medium">Sat</th>
                <th className="text-center p-1 font-medium">Sun</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="p-1 font-medium">{row.time}</td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.mon)}`}>
                    {row.mon}
                  </td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.tue)}`}>
                    {row.tue}
                  </td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.wed)}`}>
                    {row.wed}
                  </td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.thu)}`}>
                    {row.thu}
                  </td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.fri)}`}>
                    {row.fri}
                  </td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.sat)}`}>
                    {row.sat}
                  </td>
                  <td className={`text-center p-1 rounded m-1 ${getHeatmapColor(row.sun)}`}>
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