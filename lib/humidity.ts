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

export function getHumidityStatus(humidity: number) {
  if (humidity < 40) return "Kering";
  if (humidity <= 60) return "Nyaman";
  if (humidity <= 80) return "Lembap";
  return "Sangat Lembap";
}

export function getHumidityStyle(humidity: number) {
  if (humidity < 40) return "text-yellow-700 bg-yellow-100 ring-yellow-200";
  if (humidity <= 60) return "text-green-700 bg-green-100 ring-green-200";
  if (humidity <= 80) return "text-blue-700 bg-blue-100 ring-blue-200";
  return "text-red-700 bg-red-100 ring-red-200";
}
