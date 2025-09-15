import { useState, useEffect } from "react";
import type { Patient } from "../types/Patient";
import { getPatients } from "../services/patientService";

import { keysToCamel } from "../utils/case"; // ajusta la ruta según corresponda

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatients();
      setPatients(keysToCamel(data));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const refetchPatients = () => {
    fetchPatients();
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, fetchPatients, setPatients, refetchPatients };
};