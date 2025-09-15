import { useState } from "react";
import { usePatients } from "../../hooks/usePatients";
import PatientCard from "../../components/PatientCard/PatientCard";
import styles from "./PatientScreen.module.css";
import Modal from "../../components/Modal/Modal";
import AddPatientForm from "../../components/AddPatientForm/AddPatientForm";
import { addPatient } from "../../services/patientService";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";

const PatientsScreen = () => {
  const { patients, loading, error, refetchPatients } = usePatients();
  const [isModalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isFeedbackOpen, setFeedbackOpen] = useState(false);


  const handleAddPatient = async (data: {
    fullName: string;
    email: string;
    phoneCountry: string;
    phoneNumber: string;
    documentPhoto: FileList;
  }) => {
    try {
      const fullPhone = `${data.phoneCountry}${data.phoneNumber}`;
      const formData = new FormData();
      formData.append("full_name", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", fullPhone);
      formData.append("document_photo", data.documentPhoto[0]);

      await addPatient(formData);

      refetchPatients();
      setModalOpen(false);

      setFeedbackOpen(true);
      setFeedback({ type: "success", message: "Patient added successfully!" });
    } catch (err) {
      console.error(err);
      setFeedbackOpen(true);
      setFeedback({ type: "error", message: "There was an error adding the patient. Please try again." });
    }
  };

  return (
    <div>
      <h1>Patient Registration App</h1>

      <Button onClick={() => setModalOpen(true)}>Add Patient</Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <AddPatientForm onSubmit={handleAddPatient} />
      </Modal>

      {/* Feedback modal */}
      <Modal isOpen={isFeedbackOpen} onClose={() => setFeedbackOpen(false)} showCloseButton={false}>
        {feedback && (
          <div className={styles.feedback}>
            <h2>{feedback.type === "success" ? "✅ Success" : "❌ Error"}</h2>
            <p>{feedback.message}</p>
            <Button color="primary" onClick={() => setFeedbackOpen(false)}>Close</Button>
          </div>
        )}
      </Modal>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p>Error: {error}</p>
      ) : patients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        <div className={styles.container}>
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientsScreen;
