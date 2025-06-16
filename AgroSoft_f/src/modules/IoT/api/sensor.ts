import apiClient from "@/api/apiClient";
import { Sensor } from "../types/sensorTypes";

export const get = async (): Promise<Sensor[]> => {
  const response = await apiClient.get("sensores");
  return response.data;
};

export const post = async (data?: any): Promise<Sensor> => {
  const response = await apiClient.post<Sensor>("sensores", data);
  return response.data;
};

export const put = async (id: number, data: Partial<Sensor>): Promise<Sensor> => {
  const response = await apiClient.put<Sensor>(`sensores/${id}`, data);
  return response.data;
};

export const deleteSensor = async (id: number): Promise<Sensor> => {
  const response = await apiClient.delete<Sensor>(`sensores/${id}`);
  return response.data;
};
