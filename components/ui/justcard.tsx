"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { CloudRain, Droplets, Wind } from "lucide-react";
import { WeatherData } from "@/types/weather";
import { getWeatherData } from "@/app/actions";
import { getHumidityMessage, getWeatherMessage } from "@/lib/weather-message";
import { motion } from "framer-motion";

export default function JustCards() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    setError("");

    const { data, error: weatherError } = await getWeatherData();

    if (weatherError) {
      setError(weatherError);
      setWeather(null);
    }

    if (data) {
      setWeather(data);
    }
  };

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
              <h1 className="flex text-4xl font-bold text-[#1E1E1E] items-center justify-center">
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
                {getWeatherMessage(weather.weather[0].main)}
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
              <h1 className="text-4xl font-bold text-[#1E1E1E] flex items-center justify-center gap-3">
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
                <p className="">440 ppm</p>
              </h1>

              <p className="text-xs text-gray-600 mt-8 leading-relaxed">
                Udara yang ideal untuk aktivitas kognitif berat di area
                Politeknik Negeri Bali
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
              <h1 className="text-4xl font-bold text-[#1E1E1E] flex items-center justify-center gap-3">
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

              <p className="text-xs text-gray-600 mt-8 leading-relaxed">
                {getHumidityMessage(weather.main.humidity)}
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
              <h1 className="flex text-4xl font-bold text-[#1E1E1E] items-center justify-center">
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
                {getWeatherMessage(weather.weather[0].main)}
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
              <h1 className="text-4xl font-bold text-[#1E1E1E] flex items-center justify-center gap-3">
                <Wind className="w-8 h-8" />
                <p className="">440 ppm</p>
              </h1>

              <p className="text-xs text-gray-600 mt-8 leading-relaxed">
                Udara yang ideal untuk aktivitas kognitif berat di area
                Politeknik Negeri Bali
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
              <h1 className="text-4xl font-bold text-[#1E1E1E] flex items-center justify-center gap-3">
                <Droplets className="w-8 h-8" />
                {weather.main.humidity} %
              </h1>

              <p className="text-xs text-gray-600 mt-8 leading-relaxed">
                {getHumidityMessage(weather.main.humidity)}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[30px] bg-[#F2EEE5] border-none shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-sm font-medium tracking-wide underline underline-offset-4 decoration-[#5E5EFF]">
                DAILY REPORT
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between font-semibold">
                  <span>Hari</span>
                  <span>Kadar CO2</span>
                  <span>Cuaca</span>
                </div>

                {[
                  ["Minggu", "560ppm", "Hujan"],
                  ["Senin", "600ppm", "Berawan"],
                  ["Selasa", "440ppm", "Cerah"],
                  ["Rabu", "700ppm", "Gerimis"],
                  ["Kamis", "600ppm", "Badai"],
                  ["Jumat", "900ppm", "Hujan"],
                  ["Sabtu", "330ppm", "Cerah"],
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item[0]}</span>
                    <span>{item[1]}</span>
                    <span>{item[2]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}
