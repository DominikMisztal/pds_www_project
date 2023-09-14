import React from 'react';

interface PatientDetailsProps {
  patient: {
    id: number;
    name: string;
    surname: string;
    age: number;
    birthday: Date;
    pesel: string;
    gender: "MALE" | "FEMALE";
  };
  onClose: () => void; // Function to close the details
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onClose }) => {
  return (
    <div className="h-1/4 w-max max-w-md space-y-8 rounded-lg bg-white p-4 shadow-md">
      <h2 className="text-center text-3xl font-extrabold">Patient Information</h2>
      <div className="mt-8 space-y-2">
        <p className="text-sm font-medium text-gray-700">Imie: {patient.name}</p>
        <p className="text-sm font-medium text-gray-700">Nazwisko: {patient.surname}</p>
        <p className="text-sm font-medium text-gray-700">Urodzony: {new Date(patient.birthday).toLocaleDateString()}</p>
        <p className="text-sm font-medium text-gray-700">Wiek: {patient.age}</p>
        <p className="text-sm font-medium text-gray-700">Pesel: {patient.pesel}</p>
        <p className="text-sm font-medium text-gray-700">Płeć: {patient.gender}</p>
      </div>
      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-600"
        onClick={onClose} // Call the onClose function when the button is clicked
      >
        Close
      </button>
    </div>
  );
};

export default PatientDetails;