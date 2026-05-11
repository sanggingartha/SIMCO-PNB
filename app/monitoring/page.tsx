"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import LineChartComponent from "@/components/ui/chart-humidity";
import { getWeatherChartData, getWeatherData } from "../actions";
import { WeatherData } from "@/types/weather";
import { DataPoint } from "@/types/weather";

export default function Monitoring() {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [weatherRes, chartRes] = await Promise.all([
        getWeatherData(),
        getWeatherChartData(),
      ]);

      if (weatherRes.data) setWeather(weatherRes.data);
      if (chartRes.data) setChartData(chartRes.data);

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 space-y-10">
          {/* WEATHER CARD
          {weather && (
            <div className="p-6 rounded-2xl bg-white shadow">
              <h1 className="text-xl font-bold">{weather.name}</h1>
              <p>Temp: {weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          )} */}
          {/* CHART */}
          {loading ? (
            <div className="h-80 flex items-center justify-center text-gray-500">
              Loading chart...
            </div>
          ) : (
            <LineChartComponent data={chartData} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
