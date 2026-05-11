"use server";

import z from "zod";
import type { WeatherData, DataPoint } from "@/types/weather";
import { supabaseAdmin } from "@/lib/supabase";

/* =========================
   WEATHER (CARD)
========================= */

const weatherSchema = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
    feels_like: z.number(),
  }),
  weather: z.array(
    z.object({
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    }),
  ),
  wind: z.object({
    speed: z.number(),
  }),
});

export async function getWeatherData(): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Jimbaran,ID&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    );

    const raw = await res.json();
    const data = weatherSchema.parse(raw);

    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to fetch weather",
    };
  }
}

/* =========================
   CHART (FORECAST 06–21)
========================= */

const forecastSchema = z.object({
  list: z.array(
    z.object({
      dt_txt: z.string(),
      main: z.object({
        humidity: z.number(),
      }),
    }),
  ),
});

export async function getWeatherChartData(): Promise<{
  data?: DataPoint[];
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=Jimbaran,ID&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    );

    const raw = await res.json();
    const data = forecastSchema.parse(raw);

    const hours = [6, 9, 12, 15, 18, 21];

    const mapped: DataPoint[] = hours.map((h) => {
      const found = data.list.find((item) => {
        const hour = new Date(item.dt_txt).getUTCHours() + 8; // FIX WITA
        return hour === h;
      });

      return {
        time: `${h.toString().padStart(2, "0")}:00`,
        humidity: found?.main.humidity ?? 0,
      };
    });

    return { data: mapped };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch chart data",
    };
  }
}

/* =========================
   DAILY SUMMARY (SUPABASE)
========================= */

function generateCO2() {
  return Math.floor(380 + Math.random() * 120);
}

function mapWeather(main: string) {
  if (main === "Clear") return "Cerah";
  if (main === "Clouds") return "Berawan";
  if (main === "Rain") return "Hujan";
  return "Unknown";
}

export async function getDailySummary() {
  const { data, error } = await supabaseAdmin
    .from("daily_summary")
    .select("*")
    .order("date", { ascending: false });

  return { data, error };
}

export async function saveDailySummary() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // cek data hari ini
    const { data: existing } = await supabaseAdmin
      .from("daily_summary")
      .select("id")
      .eq("date", today)
      .single();

    // kalau sudah ada
    if (existing) {
      return {
        message: "Data hari ini sudah tersedia",
      };
    }

    // fetch cuaca
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Jimbaran,ID&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`,
    );

    const weather = await res.json();

    const payload = {
      date: today,
      avg_co2: generateCO2(),
      avg_humidity: weather.main.humidity,
      weather: mapWeather(weather.weather[0].main),
    };

    // insert
    const { data, error } = await supabaseAdmin
      .from("daily_summary")
      .insert([payload])
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);
      return { error };
    }

    return { data };
  } catch (err) {
    console.log("SERVER ERROR:", err);
    return {
      error: "Terjadi kesalahan server",
    };
  }
}
