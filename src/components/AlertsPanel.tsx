import { useMemo, useState } from "react";
import type { Alert } from "../mocks/sensors";

const AlertsPanel = ({ alerts }: { alerts: Alert[] }) => {
  const [acknowledgedIds, setAcknowledgedIds] = useState<string[]>([]);
  const [taskIds, setTaskIds] = useState<string[]>([]);

  const activeCount = useMemo(
    () => alerts.filter((alert) => !acknowledgedIds.includes(alert.id)).length,
    [acknowledgedIds, alerts]
  );

  const acknowledgeAlert = (alertId: string) => {
    if (!acknowledgedIds.includes(alertId)) {
      setAcknowledgedIds((prev) => [...prev, alertId]);
    }
  };

  const createTask = (alertId: string) => {
    if (!taskIds.includes(alertId)) {
      setTaskIds((prev) => [...prev, alertId]);
    }
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Тревоги</h2>
        <span className="badge">{activeCount} активные</span>
      </div>
      <div className="alert-list">
        {alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.level}`}>
            <div className="alert-main">
              <p className="alert-title">{alert.title}</p>
              <p className="alert-description">{alert.description}</p>
              <div className="alert-actions">
                <button
                  type="button"
                  className="alert-btn"
                  onClick={() => acknowledgeAlert(alert.id)}
                  disabled={acknowledgedIds.includes(alert.id)}
                >
                  {acknowledgedIds.includes(alert.id) ? "Подтверждено" : "Подтвердить"}
                </button>
                <button
                  type="button"
                  className="alert-btn alert-btn-secondary"
                  onClick={() => createTask(alert.id)}
                  disabled={taskIds.includes(alert.id)}
                >
                  {taskIds.includes(alert.id) ? "Задача создана" : "Создать задачу"}
                </button>
                <button type="button" className="alert-btn alert-btn-link">
                  Подробнее
                </button>
              </div>
            </div>
            <div className="alert-meta">
              <span>{alert.zone}</span>
              <span>{new Date(alert.createdAt).toLocaleTimeString("ru-RU")}</span>
              <span className="alert-id">{alert.id}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlertsPanel;
