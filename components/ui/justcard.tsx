"use client";

import React, { useState, useEffect, use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { getDailySummary, getWeatherData } from "@/app/actions";
import { getWeatherMessage } from "@/lib/weather";
import { motion } from "framer-motion";
import {
  getHumidityMessage,
  getHumidityStatus,
  getHumidityStyle,
} from "@/lib/humidity";
import { getCO2Message, getCO2Status, getCO2Style } from "@/lib/co2";

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

export default function JustCards() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [co2, setCo2] = useState<number>(400);
  const [dailyReports, setDailyReports] = useState<any[]>([]);

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      setError("");

      const { data, error: weatherError } = await getWeatherData();

      if (weatherError) {
        setError(weatherError);
        setWeather(null);
        return;
      }
      if (data) {
        setWeather(data);
      }
    };
    fetchWeather();
  }, []);

  // Fetch DB
  useEffect(() => {
    const fetchWeather = async () => {
      setError("");

      const { data, error: weatherError } = await getWeatherData();

      if (weatherError) {
        setError(weatherError);
        setWeather(null);
        return;
      }

      if (data) {
        setWeather(data);
      }
    };

    const fetchDailyReports = async () => {
      const res = await getDailySummary();

      if (res?.data) {
        setDailyReports(res.data);
      }
    };

    fetchWeather();
    fetchDailyReports();
  }, []);

  // Dummy CO2 data
  useEffect(() => {
    const interval = setInterval(() => {
      setCo2((prev) => {
        const change = Math.floor(Math.random() * 21) - 10;
        return Math.max(300, prev + change);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const humidity = weather?.main.humidity ?? 0;
  const weatherMain = weather?.weather[0].main ?? "";

  const humidityMessage = weather
    ? getHumidityMessage(weather.main.humidity)
    : "";

  const weatherMessage = weather
    ? getWeatherMessage(weather.weather[0].main)
    : "";

  const status = getHumidityStatus(humidity);
  const style = getHumidityStyle(humidity);

  const co2Status = getCO2Status(co2);
  const co2Style = getCO2Style(co2);
  const co2Message = getCO2Message(co2);

  return (
    <section className="relative z-20 md:-mt-24 px-2 pb-10">
      {/* Mobile */}

      {weather && (
        <div className="md:hidden flex gap-4 overflow-x-scroll p-2 px-6 snap-x snap-mandatory scrollbar-hide">
          <Card className="min-w-70 snap-center rounded-4xl bg-[#F2EEE5]/50 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                CUACA SAAT INI
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center">
              <h1 className="flex text-4xl font-bold  text-gray-600 items-center justify-center">
                <motion.img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {Math.round(weather.main.temp)}°C
              </h1>

              <p className="mt-3 text-sm font-medium">
                <span className="capitalize">
                  {weather.weather[0].description}
                </span>
                <span className="text-gray-400"> • {weather.name}</span>
              </p>

              <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                {weatherMessage}
              </p>
            </CardContent>
          </Card>

          <Card className="min-w-70 snap-center rounded-4xl bg-[#F2EEE5]/50 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                KONDISI UDARA
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center mt-5">
              <h1 className="text-4xl font-bold text-gray-600 flex items-center justify-center gap-3">
                <motion.div
                  animate={{
                    x: [0, 4, -4, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Wind className="w-8 h-8" />
                </motion.div>
                <p className="">{co2} ppm</p>
              </h1>

              <p className="mt-8">
                <span
                  className={`mt-6 rounded-full px-5 py-1 text-sm font-semibold ring-1 ${co2Style}`}
                >
                  {co2Status}
                </span>
              </p>

              <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                {co2Message}
              </p>
            </CardContent>
          </Card>

          <Card className="min-w-70 snap-center rounded-4xl bg-[#F2EEE5]/50 border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                KELEMBAPAN UDARA
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center mt-5">
              <h1 className="text-4xl font-bold text-gray-600 flex items-center justify-center gap-3">
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Droplets className="w-8 h-8" />
                </motion.div>
                {weather.main.humidity} %
              </h1>

              <p className="mt-6 text-lg font-semibold">
                <span
                  className={`mt-6 rounded-full px-5 py-1 text-sm font-semibold ring-1 ${style}`}
                >
                  {status}
                </span>
              </p>

              <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                {humidityMessage}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Desktop */}

      {weather && (
        <div className="hidden md:grid max-w-7xl mx-auto grid-cols-4 gap-6 px-6">
          <Card className="rounded-[30px] bg-[#F2EEE5] border-none shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                CUACA SAAT INI
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center">
              <h1 className="flex text-4xl font-bold text-gray-600 items-center justify-center">
                <motion.img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                  width={80}
                  height={80}
                  className="drop-shadow-lg"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {Math.round(weather.main.temp)}°C
              </h1>

              <p className="mt-3 text-sm font-medium">
                <span className="capitalize">
                  {weather.weather[0].description}
                </span>
                <span className="text-gray-400"> • {weather.name}</span>
              </p>

              <p className="text-xs text-gray-600 mt-4 leading-relaxed">
                {weatherMessage}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] bg-[#F2EEE5] border-none shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                KONDISI UDARA
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center mt-5">
              <h1 className="text-4xl font-bold text-gray-600 flex items-center justify-center gap-3">
                <motion.div
                  animate={{
                    x: [-6, 6, -6],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Wind className="w-8 h-8" />
                </motion.div>

                <p>{co2} ppm</p>
              </h1>

              <p className="mt-8">
                <span
                  className={`mt-6 rounded-full px-5 py-1 text-sm font-semibold ring-1 ${co2Style}`}
                >
                  {co2Status}
                </span>
              </p>

              <p className="text-xs text-gray-600 mt-8 leading-relaxed">
                {co2Message}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] bg-[#F2EEE5] border-none shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                KELEMBAPAN UDARA
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center mt-5">
              <h1 className="text-4xl font-bold text-gray-600 flex items-center justify-center gap-3">
                <motion.div
                  animate={{
                    y: [0, 6, 0],
                  }}
                  transition={{
                    duration: 3.0,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Droplets className="w-8 h-8" />
                </motion.div>
                {weather.main.humidity} %
              </h1>

              <p className="mt-6 text-lg font-semibold">
                <span
                  className={`mt-6 rounded-full px-5 py-1 text-sm font-semibold ring-1 ${style}`}
                >
                  {status}
                </span>
              </p>

              <p className="text-xs text-gray-600 mt-8 leading-relaxed">
                {humidityMessage}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] bg-[#F2EEE5] border-none shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <CardHeader className="pb-1">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                LAPORAN HARIAN
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="overflow-hidden rounded-2xl">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#D8D2C5]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Hari
                      </th>

                      <th className="px-4 py-3 text-center font-semibold text-gray-700">
                        CO₂
                      </th>

                      <th className="px-4 py-3 text-right font-semibold text-gray-700">
                        Cuaca
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {dailyReports.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-[#DDD7CB] last:border-none hover:bg-white/40 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-700 font-medium">
                          {new Date(item.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                          })}
                        </td>

                        <td className="px-4 py-3 text-center font-semibold text-emerald-700">
                          {item.avg_co2} ppm
                        </td>

                        <td className="px-4 py-3 text-right text-gray-600">
                          <div className="flex items-center justify-end gap-2">
                            {getWeatherIcon(item.weather)}
                            <span>{item.weather}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
