export function getWeatherMessage(condition: string) {
  switch (condition) {
    case "Thunderstorm":
      return "Hujan disertai petir dan angin kencang terpantau di area kampus Politeknik Negeri Bali. Mohon seluruh civitas akademika tetap waspada dan hindari berteduh di bawah pohon atau tiang listrik.";

    case "Drizzle":
      return "Gerimis ringan terpantau di sekitar area kampus. Disarankan membawa payung saat beraktivitas di luar ruangan.";

    case "Rain":
      return "Hujan sedang terjadi di area kampus Politeknik Negeri Bali. Tetap berhati-hati terhadap jalanan licin dan genangan air.";

    case "Snow":
      return "Cuaca bersalju terdeteksi dengan suhu rendah di wilayah sekitar. Gunakan pakaian hangat saat beraktivitas.";

    case "Clear":
      return "Cuaca cerah terpantau di lingkungan kampus dan mendukung aktivitas luar ruangan.";

    case "Clouds":
      return "Langit berawan menyelimuti area kampus dengan kondisi cuaca yang relatif stabil.";

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Fog":
      return "Kabut tipis terpantau di sekitar area kampus sehingga jarak pandang sedikit berkurang.";

    case "Dust":
    case "Sand":
    case "Ash":
      return "Partikel debu di udara meningkat. Disarankan menggunakan masker saat berada di luar ruangan.";

    case "Squall":
      return "Angin kencang terpantau di area kampus. Hindari berada di dekat pohon besar atau baliho.";

    case "Tornado":
      return "Peringatan cuaca ekstrem terdeteksi. Seluruh aktivitas luar ruangan sebaiknya dihentikan sementara.";

    default:
      return "Kondisi cuaca di area kampus Politeknik Negeri Bali terpantau normal.";
  }
}

export function getHumidityMessage(humidity: number) {
  if (humidity >= 85) {
    return "Kelembapan udara berada pada tingkat sangat tinggi sehingga udara terasa lebih lembap dan gerah.";
  }

  if (humidity >= 70) {
    return "Kelembapan udara terpantau cukup tinggi dengan kondisi udara yang relatif lembab.";
  }

  if (humidity >= 50) {
    return "Kelembapan udara berada pada tingkat normal dan cukup nyaman untuk beraktivitas.";
  }

  if (humidity >= 30) {
    return "Kelembapan udara cenderung rendah sehingga udara terasa lebih kering dari biasanya.";
  }

  return "Kelembapan udara berada pada tingkat sangat rendah. Disarankan menjaga asupan cairan selama beraktivitas.";
}
