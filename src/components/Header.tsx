import "../styles.css";

type HeaderProps = {
  activeZone: string;
  onZoneChange: (zone: string) => void;
  zones: string[];
};

const statuses = ["Все системы в норме", "148 датчиков", "7 районов"];

const Header = ({ activeZone, onZoneChange, zones }: HeaderProps) => {
  return (
    <header className="header">
      <div>
        <p className="eyebrow">Панель управления умным городом</p>
        <h1>Администрирование умного города</h1>
        <p className="subtitle">
          Единый оперативный экран транспорта, экологии, инженерных сетей и
          городских сервисов в реальном времени.
        </p>
      </div>
      <div className="header-actions">
        <div className="status-row">
          {statuses.map((status) => (
            <span key={status} className="status-pill">
              {status}
            </span>
          ))}
        </div>
        <label className="select">
          <span>Активный район</span>
          <select value={activeZone} onChange={(event) => onZoneChange(event.target.value)}>
            <option value="Все районы">Все районы</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
};

export default Header;
