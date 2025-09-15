import { useState } from "react";
import type { Patient } from "../../types/Patient";
import styles from "./PatientCard.module.css";
import Button from "../Button/Button";

interface Props {
  patient: Patient;
}

const IMAGE_BASE_URL = import.meta.env.VITE_STORAGE_URL || "http://localhost:8000/storage/";

const PatientCard= ({ patient }: Props)  => {
  const [expanded, setExpanded] = useState(false);

  const photoUrl = patient.documentPhoto.startsWith("http")
    ? patient.documentPhoto
    : `${IMAGE_BASE_URL}${patient.documentPhoto}`;

  return (
    <div className={styles.card}>
        <div className={styles.photoContainer}>
            <img src={photoUrl} alt={patient.fullName} className={styles.photo} />

        </div>
        <h3>{patient.fullName}</h3>

        <Button
          color="info"
          onClick={() => setExpanded(!expanded)}
        >
            {expanded ? "Hide details" : "Show details"}
        </Button>

        {expanded && (
            <div className={styles.details}>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            </div>
        )}
    </div>
  );
};

export default PatientCard;
