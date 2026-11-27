import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all machines from the backend API.
 */
export async function getMachines() {
  const response = await apiClient.get("/machines");
  return response.data;
}

/**
 * Fetch a single machine by its ID.
 */
export async function getMachineById(id) {
  const response = await apiClient.get(`/machines/${id}`);
  return response.data;
}

/**
 * Update a machine's status (running | idle | fault).
 */
export async function updateMachineStatus(id, status) {
  const response = await apiClient.patch(`/machines/${id}/status`, { status });
  return response.data;
}

export default apiClient;
