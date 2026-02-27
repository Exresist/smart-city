import { useEffect, useMemo, useRef, useState } from "react";
import type { Sensor } from "../mocks/sensors";
import { getMetricLabel } from "../utils/metricLabels";

type YMapInstance = {
  destroy: () => void;
  geoObjects: {
    add: (object: unknown) => void;
    removeAll: () => void;
  };
};

type YMapsApi = {
  ready: (cb: () => void) => void;
  Map: new (
    container: HTMLElement,
    state: { center: [number, number]; zoom: number; controls?: string[] }
  ) => YMapInstance;
  Placemark: new (
    coordinates: [number, number],
    properties: Record<string, string>,
    options: { preset: string; iconColor: string }
  ) => unknown;
};

declare global {
  interface Window {
    ymaps?: YMapsApi;
  }
}

const YANDEX_MAP_CENTER: [number, number] = [58.0105, 56.2502];
const YANDEX_MAP_ZOOM = 12;
const YANDEX_MAPS_SCRIPT_ID = "yandex-maps-api";

const getYandexScriptUrl = () => {
  const apiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY as string | undefined;
  const keyQuery = apiKey ? `&apikey=${apiKey}` : "";
  return `https://api-maps.yandex.ru/2.1/?lang=ru_RU${keyQuery}`;
};

const resolveWhenReady = (ymaps: YMapsApi, resolve: (value: YMapsApi) => void) => {
  ymaps.ready(() => resolve(ymaps));
};

const ensureYandexMaps = (): Promise<YMapsApi> =>
  new Promise((resolve, reject) => {
    if (window.ymaps) {
      resolveWhenReady(window.ymaps, resolve);
      return;
    }

    const existingScript = document.getElementById(YANDEX_MAPS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        if (window.ymaps) {
          resolveWhenReady(window.ymaps, resolve);
          return;
        }
        reject(new Error("Yandex Maps API is unavailable"));
      });
      existingScript.addEventListener("error", () => reject(new Error("Yandex Maps script load failed")));
      return;
    }

    const script = document.createElement("script");
    script.id = YANDEX_MAPS_SCRIPT_ID;
    script.src = getYandexScriptUrl();
    script.async = true;
    script.onload = () => {
      if (!window.ymaps) {
        reject(new Error("Yandex Maps API is unavailable"));
        return;
      }
      resolveWhenReady(window.ymaps, resolve);
    };
    script.onerror = () => reject(new Error("Yandex Maps script load failed"));
    document.head.appendChild(script);
  });

const formatMetrics = (metrics: Sensor["metrics"]) =>
  Object.entries(metrics)
    .map(([key, value]) => `${getMetricLabel(key)}: ${value}`)
    .join(" · ");

const statusToColor: Record<Sensor["status"], string> = {
  online: "#6be7a2",
  maintenance: "#ffb74d",
  offline: "#ff6f6f"
};

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

const MapPanel = ({ sensors }: { sensors: Sensor[] }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<YMapInstance | null>(null);
  const ymapsRef = useRef<YMapsApi | null>(null);
  const [mapLoadError, setMapLoadError] = useState<string | null>(null);

  const markersPayload = useMemo(
    () =>
      sensors.map((sensor) => ({
        coordinates: [sensor.location.lat, sensor.location.lng] as [number, number],
        balloonContentHeader: sensor.name,
        balloonContentBody: `${typeLabels[sensor.type]} · ${statusLabels[sensor.status]}<br/>${formatMetrics(
          sensor.metrics
        )}`,
        iconColor: statusToColor[sensor.status]
      })),
    [sensors]
  );

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let isMounted = true;

    ensureYandexMaps()
      .then((ymaps) => {
        if (!isMounted || !mapRef.current) return;
        ymapsRef.current = ymaps;
        const map = new ymaps.Map(mapRef.current, {
          center: YANDEX_MAP_CENTER,
          zoom: YANDEX_MAP_ZOOM,
          controls: ["zoomControl"]
        });
        mapInstanceRef.current = map;
      })
      .catch((error: unknown) => {
        if (isMounted) {
          const reason = error instanceof Error ? error.message : "Unknown error";
          setMapLoadError(`Не удалось загрузить Yandex Maps API: ${reason}`);
        }
      });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !ymapsRef.current) return;

    mapInstanceRef.current.geoObjects.removeAll();

    markersPayload.forEach((marker) => {
      const placemark = new ymapsRef.current!.Placemark(
        marker.coordinates,
        {
          balloonContentHeader: marker.balloonContentHeader,
          balloonContentBody: marker.balloonContentBody
        },
        {
          preset: "islands#circleDotIcon",
          iconColor: marker.iconColor
        }
      );

      mapInstanceRef.current?.geoObjects.add(placemark);
    });
  }, [markersPayload]);

  return (
    <section className="panel map-panel">
      <div className="panel-header">
        <h2>Карта Перми</h2>
        <span className="badge muted">Yandex Maps API</span>
      </div>
      <div ref={mapRef} className="map" />
      {mapLoadError ? <p className="map-error">{mapLoadError}</p> : null}
      <div className="map-legend">
        <span className="legend online">Онлайн</span>
        <span className="legend maintenance">Техработы</span>
        <span className="legend offline">Офлайн</span>
      </div>
    </section>
  );
};

export default MapPanel;
