"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  ComposedChart,
} from "recharts";

import { DataPoint } from "@/types/weather";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TrendingUp, Droplets, Activity, Waves } from "lucide-react";

export default function LineChartComponent({ data }: { data: DataPoint[] }) {
  const safeData = Array.isArray(data) ? data : [];

  const avgHumidity =
    safeData.length > 0
      ? (
          safeData.reduce((sum, d) => sum + d.humidity, 0) / safeData.length
        ).toFixed(1)
      : 0;

  const currentHumidity = safeData[safeData.length - 1]?.humidity || 0;

  const highestHumidity =
    safeData.length > 0 ? Math.max(...safeData.map((d) => d.humidity)) : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-700 mb-1">{label}</p>

          <p className="text-sm text-emerald-600 font-medium">
            Kelembapan: {payload[0].value}%
          </p>
        </div>
      );
    }

    return null;
  };

  if (safeData.length === 0) {
    return (
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Grafik Kelembapan
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-80 rounded-2xl bg-gray-50 flex flex-col items-center justify-center text-center">
            <Droplets className="h-12 w-12 text-gray-300 mb-3" />

            <p className="text-gray-600 font-medium">Belum ada data tersedia</p>

            <p className="text-sm text-gray-400 mt-1">
              Menunggu data sensor...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-white overflow-hidden">
      <CardHeader className="border-b bg-white">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2 text-gray-800 text-sm md:text-base">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            Grafik Kelembapan Udara
          </CardTitle>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs md:text-sm font-medium whitespace-nowrap">
            <Activity className="h-4 w-4" />
            {safeData.length} Data
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Chart */}
        <div className="h-95 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={safeData}>
              <defs>
                <linearGradient
                  id="humidityGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />

                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E5E7EB"
                vertical={false}
              />

              <XAxis
                dataKey="time"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="humidity"
                fill="url(#humidityGradient)"
                stroke="none"
              />

              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#10B981"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#10B981",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                activeDot={{
                  r: 6,
                  fill: "#059669",
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-4 w-4 text-emerald-600" />

              <p className="text-[11px] md:text-sm text-gray-500">Saat Ini</p>
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-gray-800">
              {currentHumidity}%
            </h3>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Waves className="h-4 w-4 text-sky-600" />

              <p className="text-[11px] md:text-sm text-gray-500">Rata-rata</p>
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-gray-800">
              {avgHumidity}%
            </h3>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3 md:p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-amber-600" />

              <p className="text-[11px] md:text-sm text-gray-500">Tertinggi</p>
            </div>

            <h3 className="text-lg md:text-2xl font-bold text-gray-800">
              {highestHumidity}%
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
