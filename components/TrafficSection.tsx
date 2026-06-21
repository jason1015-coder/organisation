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

// Brand-aligned chart colours: blue accent for visits, muted zinc for views.
const VISITS_COLOR = "#0000EE";
const VIEWS_COLOR = "#a1a1aa";

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
        <div className="bg-background border border-foreground/20 p-4 font-mono text-sm">
          <p className="font-bold mb-2">{formatDate(label)}</p>
          {payload.map((entry) => {
            if (entry.value === null || entry.value === undefined) return null;
            const name = entry.dataKey === "visits" ? "Visits" : "Page Views";
            return (
              <p key={entry.dataKey} style={{ color: entry.color }}>
                {name}: {entry.value.toLocaleString()}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  const metrics = [
    { label: "Visits", value: totalVisits, sub: periodLabel, icon: Users },
    {
      label: "Page Views",
      value: totalPageViews,
      sub: periodLabel,
      icon: Eye,
    },
    {
      label: "Avg Daily Visits",
      value: avgDailyVisits,
      sub: "Visits per day",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="mt-12">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 border-b border-foreground/20 pb-4 sm:pb-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight mb-2">
            Website Traffic
          </h2>
          <p className="text-sm text-foreground/70 font-mono">
            Visits and page views across our sites, via Cloudflare Analytics.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="traffic-period-select"
            className="text-xs font-semibold uppercase tracking-widest text-foreground/70"
          >
            Time Period
          </label>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger
              id="traffic-period-select"
              className="w-full lg:w-[250px] rounded-none border-foreground/20"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/20 border border-foreground/20">
        {metrics.map((m) => (
          <div key={m.label} className="bg-background p-6 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-foreground/60 font-semibold">
                {m.label}
              </span>
              <m.icon className="h-4 w-4 text-foreground/50" />
            </div>
            <div className="font-mono text-2xl md:text-3xl font-bold tracking-tight">
              {m.value.toLocaleString()}
            </div>
            <p className="text-xs text-foreground/50 font-mono">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-8 border border-foreground/20 bg-background p-4 sm:p-8">
        <h3 className="text-xl font-bold tracking-tight mb-8">
          Traffic Trends
        </h3>
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
              stroke={VIEWS_COLOR}
              strokeWidth={1.5}
              dot={false}
              name="Page Views"
            />
            <Line
              type="monotone"
              dataKey="visits"
              stroke={VISITS_COLOR}
              strokeWidth={1.5}
              dot={false}
              name="Visits"
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 pt-5 font-mono text-sm">
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-5 h-0.5"
              style={{ backgroundColor: VISITS_COLOR }}
            />
            Visits
          </span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block w-5 h-0.5"
              style={{ backgroundColor: VIEWS_COLOR }}
            />
            Page Views
          </span>
        </div>
      </div>
    </div>
  );
}
