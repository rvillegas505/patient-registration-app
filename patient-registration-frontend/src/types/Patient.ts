export interface Patient {
  id: number;
  fullName: string;
  email: string;
  // phoneCountry: string;
  // phoneNumber: string;
  phone: string;
  documentPhoto: string;
}

export interface NewPatient {
  fullName: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  documentPhoto: File;
}