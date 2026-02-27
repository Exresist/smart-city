import { useEffect, useMemo, useState } from "react";
import AlertsPanel from "./components/AlertsPanel";
import Header from "./components/Header";
import ManagementPanel from "./components/ManagementPanel";
import MapPanel from "./components/MapPanel";
import SensorTable from "./components/SensorTable";
import { fetchAlerts, fetchSensors, fetchZones } from "./services/api";
import type { Alert, Sensor } from "./mocks/sensors";
import "./styles.css";

const App = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [zones, setZones] = useState<string[]>([]);
  const [activeZone, setActiveZone] = useState("Все районы");

  useEffect(() => {
    fetchSensors().then(setSensors);
    fetchAlerts().then(setAlerts);
    fetchZones().then(setZones);
  }, []);

  const filteredSensors = useMemo(() => {
    if (activeZone === "Все районы") return sensors;
    return sensors.filter((sensor) => sensor.zone === activeZone);
  }, [activeZone, sensors]);

  return (
    <div className="app">
      <Header activeZone={activeZone} onZoneChange={setActiveZone} zones={zones} />
      <main className="grid">
        <div className="grid-left">
          <ManagementPanel sensors={filteredSensors} />
        </div>
        <div className="grid-center">
          <MapPanel sensors={filteredSensors} />
          <AlertsPanel alerts={alerts} />
          <SensorTable sensors={filteredSensors} />
        </div>
        <aside className="grid-right">
          <section className="panel insight">
            <h2>Сводка</h2>
            <p className="insight-title">Индекс готовности города</p>
            <div className="progress">
              <div className="progress-bar" style={{ width: "82%" }} />
            </div>
            <p className="insight-detail">
              Транспорт и экологические контуры стабильны. В инженерной
              инфраструктуре зафиксирована умеренная нагрузка.
            </p>
            <div className="insight-grid">
              <div>
                <span>Время реакции</span>
                <strong>2,8 мин</strong>
              </div>
              <div>
                <span>Критические тревоги</span>
                <strong>1</strong>
              </div>
              <div>
                <span>Энергорезерв</span>
                <strong>14%</strong>
              </div>
              <div>
                <span>Активные бригады</span>
                <strong>12</strong>
              </div>
            </div>
          </section>
          <section className="panel">
            <h2>Заметки смены</h2>
            <ul className="notes">
              <li>Передача смены с транспортной службой в 09:30.</li>
              <li>Запустить диагностику водного контура после завершения обслуживания.</li>
              <li>Подготовить информирование жителей по трафику на выходные.</li>
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
};

export default App;
