import type { Sensor } from "../mocks/sensors";
import { getMetricLabel } from "../utils/metricLabels";

const typeLabels: Record<Sensor["type"], string> = {
  traffic: "Трафик",
  air: "Воздух",
  water: "Вода",
  energy: "Энергия",
  waste: "Отходы",
  noise: "Шум",
  parking: "Парковка"
};

const statusLabels: Record<Sensor["status"], string> = {
  online: "онлайн",
  maintenance: "техработы",
  offline: "офлайн"
};

const formatMetric = (sensor: Sensor) => {
  const entries = Object.entries(sensor.metrics);
  if (entries.length === 0) return "—";
  const [key, value] = entries[0];
  return `${getMetricLabel(key)}: ${value}`;
};

const SensorTable = ({ sensors }: { sensors: Sensor[] }) => {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Поток датчиков</h2>
        <span className="badge muted">Обновлено только что</span>
      </div>
      <div className="table">
        <div className="table-header">
          <span>ID</span>
          <span>Тип</span>
          <span>Статус</span>
          <span>Район</span>
          <span>Ключевая метрика</span>
        </div>
        {sensors.map((sensor) => (
          <div key={sensor.id} className="table-row">
            <span>{sensor.id}</span>
            <span className={`chip chip-${sensor.type}`}>{typeLabels[sensor.type]}</span>
            <span className={`status-dot status-${sensor.status}`}>{statusLabels[sensor.status]}</span>
            <span>{sensor.zone}</span>
            <span>{formatMetric(sensor)}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SensorTable;
