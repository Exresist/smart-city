export type SensorType =
  | "traffic"
  | "air"
  | "water"
  | "energy"
  | "waste"
  | "noise"
  | "parking";

export type SensorStatus = "online" | "maintenance" | "offline";

export type Sensor = {
  id: string;
  name: string;
  type: SensorType;
  status: SensorStatus;
  zone: string;
  updatedAt: string;
  location: {
    lat: number;
    lng: number;
  };
  metrics: Record<string, number>;
};

export type Alert = {
  id: string;
  level: "critical" | "warning" | "info";
  title: string;
  description: string;
  sensorId?: string;
  zone: string;
  createdAt: string;
};

export const zones = [
  "Ленинский",
  "Свердловский",
  "Мотовилихинский",
  "Кировский",
  "Индустриальный",
  "Дзержинский",
  "Орджоникидзевский"
];

export const sensors: Sensor[] = [
  {
    id: "TRF-201",
    name: "Трафик на ул. Ленина",
    type: "traffic",
    status: "online",
    zone: "Ленинский",
    updatedAt: "2026-02-08T08:10:00Z",
    location: { lat: 58.0108, lng: 56.2442 },
    metrics: { vehiclesPerHour: 1640, avgSpeedKph: 32 }
  },
  {
    id: "AIR-104",
    name: "Качество воздуха: Сибирская",
    type: "air",
    status: "online",
    zone: "Свердловский",
    updatedAt: "2026-02-08T08:12:00Z",
    location: { lat: 58.0009, lng: 56.2558 },
    metrics: { pm25: 18, no2: 32, o3: 41 }
  },
  {
    id: "WTR-330",
    name: "Турбидность Камы",
    type: "water",
    status: "maintenance",
    zone: "Кировский",
    updatedAt: "2026-02-08T07:55:00Z",
    location: { lat: 58.0129, lng: 56.2406 },
    metrics: { turbidity: 2.3, ph: 7.4 }
  },
  {
    id: "ENG-055",
    name: "Узел энергосети 5",
    type: "energy",
    status: "online",
    zone: "Индустриальный",
    updatedAt: "2026-02-08T08:09:00Z",
    location: { lat: 57.9994, lng: 56.2716 },
    metrics: { megawatts: 38.6, voltage: 12.4 }
  },
  {
    id: "WST-412",
    name: "Контейнерная площадка 12",
    type: "waste",
    status: "offline",
    zone: "Мотовилихинский",
    updatedAt: "2026-02-08T06:40:00Z",
    location: { lat: 58.0408, lng: 56.2148 },
    metrics: { fillLevel: 91, temperature: 28 }
  },
  {
    id: "NOI-221",
    name: "Шумовой фон: кампус",
    type: "noise",
    status: "online",
    zone: "Дзержинский",
    updatedAt: "2026-02-08T08:07:00Z",
    location: { lat: 58.0262, lng: 56.3044 },
    metrics: { decibels: 63, peak: 81 }
  },
  {
    id: "PRK-778",
    name: "Парковка: Разгуляй",
    type: "parking",
    status: "online",
    zone: "Орджоникидзевский",
    updatedAt: "2026-02-08T08:05:00Z",
    location: { lat: 58.0908, lng: 56.2972 },
    metrics: { occupancy: 78, freeSpots: 42 }
  },
  {
    id: "AIR-318",
    name: "Качество воздуха: Гайва",
    type: "air",
    status: "online",
    zone: "Орджоникидзевский",
    updatedAt: "2026-02-08T08:03:00Z",
    location: { lat: 58.0814, lng: 56.3096 },
    metrics: { pm25: 22, no2: 27, o3: 38 }
  }
];

export const alerts: Alert[] = [
  {
    id: "ALT-9901",
    level: "critical",
    title: "Площадка отходов близка к переполнению",
    description: "Контейнерная площадка 12 заполнена более чем на 90% и недоступна.",
    sensorId: "WST-412",
    zone: "Мотовилихинский",
    createdAt: "2026-02-08T07:58:00Z"
  },
  {
    id: "ALT-9902",
    level: "warning",
    title: "Повышенный уровень NO2",
    description: "В Свердловском районе фиксируется рост NO2 в течение 40 минут.",
    sensorId: "AIR-104",
    zone: "Свердловский",
    createdAt: "2026-02-08T07:46:00Z"
  },
  {
    id: "ALT-9903",
    level: "info",
    title: "Рост трафика из-за события",
    description: "Интенсивность потока на ул. Ленина выше базовой на 18%.",
    sensorId: "TRF-201",
    zone: "Ленинский",
    createdAt: "2026-02-08T07:30:00Z"
  }
];
