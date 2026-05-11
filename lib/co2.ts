export function getCO2Message(ppm: number) {
  if (ppm <= 450) {
    return "Kualitas udara sangat baik dan ideal untuk aktivitas produktif.";
  }

  if (ppm <= 600) {
    return "Kualitas udara masih baik dan nyaman untuk aktivitas sehari-hari.";
  }

  if (ppm <= 800) {
    return "Kualitas udara mulai menurun, disarankan ventilasi yang baik.";
  }

  if (ppm <= 1000) {
    return "Kualitas udara kurang sehat, dapat menyebabkan rasa tidak nyaman.";
  }

  return "Kualitas udara buruk, disarankan mengurangi aktivitas di area ini.";
}

export function getCO2Status(ppm: number) {
  if (ppm <= 450) return "Sangat Baik";
  if (ppm <= 600) return "Baik";
  if (ppm <= 800) return "Sedang";
  if (ppm <= 1000) return "Kurang Sehat";
  return "Buruk";
}

export function getCO2Style(ppm: number) {
  if (ppm <= 450) return "text-green-700 bg-green-100 ring-green-200";

  if (ppm <= 600) return "text-lime-700 bg-lime-100 ring-lime-200";

  if (ppm <= 800) return "text-yellow-700 bg-yellow-100 ring-yellow-200";

  if (ppm <= 1000) return "text-orange-700 bg-orange-100 ring-orange-200";

  return "text-red-700 bg-red-100 ring-red-200";
}
