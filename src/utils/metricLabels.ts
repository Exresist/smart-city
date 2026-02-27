const metricLabels: Record<string, string> = {
  vehiclesPerHour: "Транспортный поток (авто/ч)",
  avgSpeedKph: "Средняя скорость (км/ч)",
  pm25: "PM2.5 (мкг/м3)",
  no2: "NO2 (мкг/м3)",
  o3: "O3 (мкг/м3)",
  turbidity: "Мутность (NTU)",
  ph: "Кислотность (pH)",
  megawatts: "Нагрузка (МВт)",
  voltage: "Напряжение (кВ)",
  fillLevel: "Заполнение контейнера (%)",
  temperature: "Температура (°C)",
  decibels: "Шум (дБ)",
  peak: "Пиковый шум (дБ)",
  occupancy: "Занятость парковки (%)",
  freeSpots: "Свободные места"
};

export const getMetricLabel = (metricKey: string): string => metricLabels[metricKey] ?? metricKey;
