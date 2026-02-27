import { alerts, sensors, zones, type Alert, type Sensor } from "../mocks/sensors";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchZones = async (): Promise<string[]> => {
  await delay(260);
  return zones;
};

export const fetchSensors = async (): Promise<Sensor[]> => {
  await delay(320);
  return sensors;
};

export const fetchAlerts = async (): Promise<Alert[]> => {
  await delay(220);
  return alerts;
};

export const fetchSensorById = async (id: string): Promise<Sensor | undefined> => {
  await delay(180);
  return sensors.find((sensor) => sensor.id === id);
};
