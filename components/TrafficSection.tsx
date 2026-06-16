"use client";

import { Eye, TrendingUp, Users } from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TrafficPoint {
  date: string;
  pageViews: number;
  visits: number;
}

interface SiteTraffic {
  label: string;
  data: TrafficPoint[];
  totalPageViews: number;
  totalVisits: number;
}

interface TrafficSectionProps {
  traffic: SiteTraffic[];
}

const PERIODS = [
  { value: "7", label: "Last 7 Days" },
  { value: "30", label: "Last 30 Days" },
  { value: "90", label: "Last 90 Days" },
  { value: "365", label: "Last 12 Months" },
  { value: "all", label: "All Time" },
];

export function TrafficSection({ traffic }: TrafficSectionProps) {
  const [period, setPeriod] = useState<string>("30");

  // Aggregate every zone into a single daily series.
  const aggregated = useMemo<TrafficPoint[]>(() => {
    const byDate: Record<string, { pageViews: number; visits: number }> = {};
    traffic.forEach((site) => {
      site.data.forEach((d) => {
        const entry = byDate[d.date] ?? { pageViews: 0, visits: 0 };
        entry.pageViews += d.pageViews;
        entry.visits += d.visits;
        byDate[d.date] = entry;
      });
    });
    return Object.entries(byDate)
      .map(([date, v]) => ({ date, ...v }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [traffic]);

  const filtered = useMemo<TrafficPoint[]>(() => {
    if (period === "all") return aggregated;
    const cutoff = new Date();
    cutoff.setUTCDate(cutoff.getUTCDate() - Number(period));
    const cutoffStr = cutoff.toISOString().split("T")[0];
    return aggregated.filter((d) => d.date >= cutoffStr);
  }, [aggregated, period]);

  // Nothing configured / no traffic — render nothing.
  if (traffic.length === 0) {
    return null;
  }

  const totalVisits = filtered.reduce((s, d) => s + d.visits, 0);
  const totalPageViews = filtered.reduce((s, d) => s + d.pageViews, 0);
  const avgDailyVisits = Math.round(totalVisits / (filtered.length || 1));
  const periodLabel =
    PERIODS.find((p) => p.value === period)?.label ?? "Selected period";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ dataKey: string; value: number | null; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length && label) {
      return (
        <div className="bg-card border border-border p-4 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{formatDate(label)}</p>
          {payload.map((entry) => {
            if (entry.value === null || entry.value === undefined) return null;
            const name = entry.dataKey === "visits" ? "Visits" : "Page Views";
            return (
              <p
                key={entry.dataKey}
                className="text-sm"
                style={{ color: entry.color }}
              >
                {name}: {entry.value.toLocaleString()}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Website Traffic
          </h2>
          <p className="text-muted-foreground">
            Visits and page views across our sites, via Cloudflare Analytics.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="traffic-period-select"
            className="text-sm font-medium text-muted-foreground"
          >
            Time Period
          </label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger
              id="traffic-period-select"
              className="w-full lg:w-[250px]"
            >
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              {PERIODS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalVisits.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{periodLabel}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPageViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{periodLabel}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Daily Visits
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgDailyVisits.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Visits per day</p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <div className="mt-12 bg-card p-6 rounded-lg border">
        <h3 className="text-2xl font-bold mb-6">Traffic Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={filtered}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              minTickGap={50}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="pageViews"
              stroke="oklch(0.6 0.15 250)"
              strokeWidth={1.5}
              dot={false}
              name="Page Views"
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke="oklch(0.7 0.15 340)"
              strokeWidth={1.5}
              dot={false}
              name="Visits"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 pt-5">
          <span className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-5 h-0.5"
              style={{ backgroundColor: "oklch(0.7 0.15 340)" }}
            />
            Visits
          </span>
          <span className="flex items-center gap-2 text-sm">
            <span
              className="inline-block w-5 h-0.5"
              style={{ backgroundColor: "oklch(0.6 0.15 250)" }}
            />
            Page Views
          </span>
        </div>
      </div>
    </div>
  );
}
