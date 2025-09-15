import type { Patient } from "../types/Patient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const getPatients = async (): Promise<Patient[]> => {
  const res = await fetch(`${API_URL}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  const json = await res.json();
  return json?.data;
};

export const addPatient = async (patient: FormData): Promise<Patient> => {
  const res = await fetch(`${API_URL}/patients`, {
    method: "POST",
    body: patient,
  });
  if (!res.ok) throw new Error("Failed to add patient");
  return res.json();
};