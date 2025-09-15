import type { Patient } from "../../types/Patient";
import PatientCard from "../PatientCard/PatientCard";
import styles from "./PatientList.module.css";

interface Props {
  patients: Patient[];
}

const PatientList = ({ patients }: Props) => {
  if (!patients || patients.length === 0) return <p>No patients found</p>;

  return (
    <div className={styles.container}>
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
};

export default PatientList;