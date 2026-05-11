"use client";

import { useEffect, useState } from "react";
import { getDailySummary, saveDailySummary } from "@/app/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Droplets,
  Wind,
  Cloud,
  RefreshCw,
  TrendingUp,
  Sun,
  CloudRain,
} from "lucide-react";
import { format } from "date-fns";

type DailyData = {
  id: string;
  date: string;
  avg_co2: number;
  avg_humidity: number;
  weather: string;
};

type SummaryStats = {
  avgCO2: number;
  avgHumidity: number;
  totalDays: number;
  mostCommonWeather: string;
};

function getWeatherIcon(weather: string) {
  if (weather === "Cerah") {
    return <Sun className="h-3.5 w-3.5 text-yellow-500" />;
  }

  if (weather === "Hujan") {
    return <CloudRain className="h-3.5 w-3.5 text-blue-500" />;
  }

  if (weather === "Berawan") {
    return <Cloud className="h-3.5 w-3.5 text-gray-500" />;
  }

  return <Cloud className="h-3.5 w-3.5 text-gray-400" />;
}

export default function DailyDataPage() {
  const [data, setData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await getDailySummary();

      if (res?.data) {
        setData(res.data);
      }

      setLoading(false);
    }

    load();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);

    const res = await saveDailySummary();

    if (res?.data) {
      const latest = await getDailySummary();

      if (latest?.data) {
        setData(latest.data);
      }
    }

    setRefreshing(false);
  };

  const calculateStats = (): SummaryStats => {
    if (data.length === 0) {
      return {
        avgCO2: 0,
        avgHumidity: 0,
        totalDays: 0,
        mostCommonWeather: "N/A",
      };
    }

    const avgCO2 =
      data.reduce((sum, item) => sum + item.avg_co2, 0) / data.length;

    const avgHumidity =
      data.reduce((sum, item) => sum + item.avg_humidity, 0) / data.length;

    const weatherCount = data.reduce(
      (acc, item) => {
        acc[item.weather] = (acc[item.weather] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    const mostCommonWeather =
      Object.entries(weatherCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    return {
      avgCO2,
      avgHumidity,
      totalDays: data.length,
      mostCommonWeather,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <main className="px-4 md:px-6 lg:px-10 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Ringkasan Harian
            </h1>

            <p className="text-sm md:text-base text-gray-500 mt-1">
              Monitoring kualitas udara & kelembapan secara realtime
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="h-11 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />

            {refreshing ? "Memperbarui..." : "Perbarui Data"}
          </button>
        </div>

        {/* Stats */}
        {!loading && data.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* CO2 */}
            <Card className="border-0 shadow-md rounded-3xl bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">
                      Rata-rata CO₂
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                      {stats.avgCO2.toFixed(1)}
                    </h2>

                    <span className="text-xs text-gray-400">ppm</span>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <Wind className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Humidity */}
            <Card className="border-0 shadow-md rounded-3xl bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">
                      Rata-rata Kelembapan
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                      {stats.avgHumidity.toFixed(1)}%
                    </h2>

                    <span className="text-xs text-gray-400">humidity</span>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-sky-100 flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-sky-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total */}
            <Card className="border-0 shadow-md rounded-3xl bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-gray-500">
                      Total Data
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                      {stats.totalDays}
                    </h2>

                    <span className="text-xs text-gray-400">tersimpan</span>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-violet-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-violet-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weather */}
            <Card className="border-0 shadow-md rounded-3xl bg-white">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-gray-500">
                      Cuaca Dominan
                    </p>

                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mt-1 truncate">
                      {stats.mostCommonWeather}
                    </h2>

                    <span className="text-xs text-gray-400">
                      kondisi terbanyak
                    </span>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-amber-100 flex items-center justify-center">
                    <Cloud className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Table */}
        <Card className="border-0 rounded-3xl shadow-xl bg-white overflow-hidden">
          <CardHeader className="border-b border-gray-100 py-4 px-5 md:px-7">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Data Historis
              </CardTitle>

              <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                {data.length} data tersimpan
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-12 flex-1 rounded-xl" />
                    <Skeleton className="h-12 flex-1 rounded-xl" />
                    <Skeleton className="h-12 flex-1 rounded-xl" />
                    <Skeleton className="h-12 flex-1 rounded-xl" />
                  </div>
                ))}
              </div>
            ) : data.length === 0 ? (
              <div className="py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gray-400" />
                </div>

                <p className="text-gray-700 font-semibold">
                  Belum ada data tersedia
                </p>

                <p className="text-sm text-gray-400 mt-1">
                  Tekan tombol "Perbarui Data"
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-175">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/60">
                      <th className="px-5 md:px-7 py-4 text-left text-xs md:text-sm font-semibold text-gray-500 whitespace-nowrap">
                        Tanggal
                      </th>

                      <th className="px-5 md:px-7 py-4 text-left text-xs md:text-sm font-semibold text-gray-500 whitespace-nowrap">
                        CO₂
                      </th>

                      <th className="px-5 md:px-7 py-4 text-left text-xs md:text-sm font-semibold text-gray-500 whitespace-nowrap">
                        Kelembapan
                      </th>

                      <th className="px-5 md:px-7 py-4 text-left text-xs md:text-sm font-semibold text-gray-500 whitespace-nowrap">
                        Cuaca
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-100 last:border-0 transition-all hover:bg-emerald-50/40 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                        }`}
                      >
                        <td className="px-5 md:px-7 py-4 text-sm md:text-base text-gray-700 font-medium whitespace-nowrap">
                          {format(new Date(item.date), "EEEE, dd MMM yyyy")}
                        </td>

                        <td className="px-5 md:px-7 py-4 text-sm md:text-base font-semibold text-emerald-700 whitespace-nowrap">
                          {item.avg_co2} ppm
                        </td>

                        <td className="px-5 md:px-7 py-4 text-sm md:text-base text-sky-700 whitespace-nowrap">
                          {item.avg_humidity}%
                        </td>

                        <td className="px-5 md:px-7 py-4 whitespace-nowrap">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-xs md:text-sm text-gray-700">
                            {getWeatherIcon(item.weather)}
                            {item.weather}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
