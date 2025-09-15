import { useState, type DragEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import styles from "./AddPatientForm.module.css";
import Button from "../Button/Button";

interface FormData {
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  documentPhoto: FileList;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const AddPatientForm = ({ onSubmit } : Props) => {
  const { register, handleSubmit, formState: { errors }, setValue, trigger, watch } = useForm<FormData>();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const documentPhoto = watch("documentPhoto");

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragover" || e.type === "dragenter") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === "image/jpeg") {
        setValue("documentPhoto", files, { shouldValidate: true, shouldDirty: true });
        trigger("documentPhoto"); // force validation
      } else {
        alert("Only .jpg files are allowed");
      }
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formField}>
        <label>Full Name</label>
        <input 
          className={styles.customInput}
          {...register("fullName", {
            required: "Full name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only letters are allowed in the full name"
            }
          })}
        />
        {errors.fullName && <p className={styles.error}>{errors.fullName.message}</p>}
      </div>

      <div className={styles.formField}>
        <label>Email</label>
        <input
          className={styles.customInput}
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[^@]+@gmail\.com$/,
              message: "Only gmail addresses are allowed"
            }
            })} 
          
          />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Phone</label>
        <div className={styles.phone}>
          
          <input
                    inputMode="numeric"
            pattern="[0-9]*"
            className={styles.customInput}
            {...register("phoneCountry", {
              required: "Country code is required",
              pattern: {
                value: /^[0-9]{1,3}$/,
                message: "Country code must be 1 to 3 digits"
              }
            })}
            placeholder="549"
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                e.preventDefault();
              }
            }}
          />

          
          <input
            className={styles.customInput}
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{4,10}$/,
                message: "Phone number must be 4 to 10 digits"
              }
            })}
            placeholder="12345678"
            onKeyDown={(e) => {
              if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                e.preventDefault();
              }
            }}
          />
        </div>
      

        {(errors.phoneCountry || errors.phoneNumber) && (
          <div className={styles.error}>
            {errors.phoneCountry && <p>{errors.phoneCountry.message}</p>}
            {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
          </div>
        )}
      </div>

      <div>
        <label>Document Photo (.jpg)</label>
        <div 
          className={`${styles.dropzone} ${dragActive ? styles.active : ""}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {documentPhoto?.length ? documentPhoto[0].name : "Drag & drop a .jpg file here or click to select"}
          <input 
            type="file" 
            accept=".jpg" 
            {...register("documentPhoto", { required: true })} 
            ref={inputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                setValue("documentPhoto", e.target.files, { shouldValidate: true, shouldDirty: true });
                trigger("documentPhoto"); // force validation
              }
            }}
          />
        </div>
        {errors.documentPhoto && <p className={styles.error}>File required</p>}
      </div>

      <Button type="submit">Add Patient</Button>
    </form>
  );
};

export default AddPatientForm;
