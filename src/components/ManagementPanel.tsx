import type { Sensor, SensorStatus } from "../mocks/sensors";

const statusLabels: Record<SensorStatus, string> = {
  online: "Онлайн",
  maintenance: "Техработы",
  offline: "Офлайн"
};

const statusColors: Record<SensorStatus, string> = {
  online: "status-good",
  maintenance: "status-warn",
  offline: "status-bad"
};

const ManagementPanel = ({ sensors }: { sensors: Sensor[] }) => {
  const counts = sensors.reduce(
    (acc, sensor) => {
      acc.total += 1;
      acc[sensor.status] += 1;
      acc[sensor.type] = (acc[sensor.type] ?? 0) + 1;
      return acc;
    },
    {
      total: 0,
      online: 0,
      maintenance: 0,
      offline: 0
    } as Record<string, number>
  );

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Оперативная панель</h2>
        <span className="badge">Онлайн</span>
      </div>
      <div className="metric-grid">
        <div className="metric-card">
          <p>Всего датчиков</p>
          <strong>{counts.total}</strong>
          <span>Активные точки сбора по городу.</span>
        </div>
        <div className="metric-card">
          <p>Мобильность</p>
          <strong>{counts.traffic ?? 0}</strong>
          <span>Мониторинг трафика и парковок.</span>
        </div>
        <div className="metric-card">
          <p>Экология</p>
          <strong>{(counts.air ?? 0) + (counts.water ?? 0) + (counts.noise ?? 0)}</strong>
          <span>Датчики воздуха, воды и шума.</span>
        </div>
        <div className="metric-card">
          <p>Инфраструктура</p>
          <strong>{(counts.energy ?? 0) + (counts.waste ?? 0)}</strong>
          <span>Энергосеть и контур отходов.</span>
        </div>
      </div>
      <div className="status-grid">
        {(Object.keys(statusLabels) as SensorStatus[]).map((status) => (
          <div key={status} className={`status-card ${statusColors[status]}`}>
            <p>{statusLabels[status]}</p>
            <strong>{counts[status]}</strong>
            <span>узлов</span>
          </div>
        ))}
      </div>
      <div className="panel-section">
        <h3>Командные сценарии</h3>
        <div className="toggle-grid">
          <button type="button">Ночной цикл светофоров</button>
          <button type="button">Экологический обход</button>
          <button type="button">Снижение нагрузки сети</button>
          <button type="button">Приоритет вывоза отходов</button>
        </div>
      </div>
    </section>
  );
};

export default ManagementPanel;
