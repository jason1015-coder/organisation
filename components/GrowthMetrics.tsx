import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Download,
  Minus,
  TrendingUp,
} from "lucide-react";

interface GrowthMetricsProps {
  totalDownloads: number;
  currentSevenDay: number;
  currentThirtyDay: number;
  trend: "up" | "down" | "neutral";
}

export function GrowthMetrics({
  totalDownloads,
  currentSevenDay,
  currentThirtyDay,
  trend,
}: GrowthMetricsProps) {
  const TrendIcon =
    trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus;

  const trendColor =
    trend === "up"
      ? "text-green-600 dark:text-green-400"
      : trend === "down"
        ? "text-red-600 dark:text-red-400"
        : "text-foreground";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Total Downloads */}
      <div className="border border-foreground/20 bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 mb-4 pb-2 border-b border-foreground/10">
          <h3 className="text-sm font-semibold tracking-tight">
            Total Downloads
          </h3>
          <Download className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            {totalDownloads.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">For selected period</p>
        </div>
      </div>

      {/* 7-Day Average */}
      <div className="border border-foreground/20 bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 mb-4 pb-2 border-b border-foreground/10">
          <h3 className="text-sm font-semibold tracking-tight">
            7-Day Average
          </h3>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            {currentSevenDay.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Downloads per day</p>
        </div>
      </div>

      {/* 30-Day Average */}
      <div className="border border-foreground/20 bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 mb-4 pb-2 border-b border-foreground/10">
          <h3 className="text-sm font-semibold tracking-tight">
            30-Day Average
          </h3>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            {currentThirtyDay.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Downloads per day</p>
        </div>
      </div>

      {/* Trend */}
      <div className="border border-foreground/20 bg-background p-6">
        <div className="flex flex-row items-center justify-between space-y-0 mb-4 pb-2 border-b border-foreground/10">
          <h3 className="text-sm font-semibold tracking-tight">Weekly Trend</h3>
          <TrendIcon className={`h-4 w-4 ${trendColor}`} />
        </div>
        <div>
          <div
            className={`text-3xl font-bold tracking-tight mb-1 ${trendColor}`}
          >
            {trend === "up"
              ? "Growing"
              : trend === "down"
                ? "Declining"
                : "Stable"}
          </div>
          <p className="text-xs text-muted-foreground">
            {trend === "up" && "7-day avg increasing"}
            {trend === "down" && "7-day avg decreasing"}
            {trend === "neutral" && "Minimal change"}
          </p>
        </div>
      </div>
    </div>
  );
}
