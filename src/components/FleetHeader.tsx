import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export const FleetHeader = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto px-6 py-4">
        {/* Header with Logo and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white px-3 py-1 rounded">
              <span className="text-primary font-bold text-lg">deepworks</span>
            </div>
            <div className="text-xl font-semibold">Fleet Efficiency & Deployment- Level 1</div>
          </div>
          <div className="text-sm">
            Data Last Updated on | 1st Jan 2022
          </div>
        </div>

        {/* Filter Row */}
        <div className="flex items-center space-x-6 bg-white/10 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Period :</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white text-primary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Vehicle Class :</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white text-primary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="scorpio">Scorpio</SelectItem>
                <SelectItem value="bolero">Bolero</SelectItem>
                <SelectItem value="safari">Safari</SelectItem>
                <SelectItem value="minivan">Mini Van</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Vehicle Ownership :</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white text-primary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="owned">Owned</SelectItem>
                <SelectItem value="leased">Leased</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Shift :</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white text-primary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="shift-a">Shift A</SelectItem>
                <SelectItem value="shift-b">Shift B</SelectItem>
                <SelectItem value="shift-c">Shift C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Trip Types :</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white text-primary border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="bg-accent/20 border-accent">
            <div className="p-4 text-center">
              <div className="text-sm text-primary-foreground/80">Average Active Vehicles (per Day)</div>
              <div className="text-3xl font-bold text-primary-foreground mt-1">112</div>
            </div>
          </Card>
          <Card className="bg-accent/20 border-accent">
            <div className="p-4 text-center">
              <div className="text-sm text-primary-foreground/80">Average Unallocated Vehicles (per Day)</div>
              <div className="text-3xl font-bold text-primary-foreground mt-1">4.5</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};