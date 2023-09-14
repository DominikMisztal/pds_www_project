export type Patient = {
  id: number;
  name: string;
  surname: string;
  age: number;
  birthday: Date;
  pesel: string;
  gender: "MALE" | "FEMALE";
};

export type Visit = {
  index: number;
  date: Date;
  patientId: number;
  doctorId: number;
  duration: number;
  teeth?: unknown;
};

export const randomPatients = [
  {
    id: 0,
    name: "Adam",
    surname: "Awokado",
    birthday: new Date(),
    age: 0,
    pesel: "121233112",
    gender: "MALE",
  },
  {
    id: 1,
    name: "Jan",
    surname: "Pietruszka",
    birthday: new Date(),
    age: 0,
    pesel: "121233112",
    gender: "MALE",
  },
  {
    id: 2,
    name: "Anna",
    surname: "Bakłażan",
    birthday: new Date(),
    age: 0,
    pesel: "121233112",
    gender: "FEMALE",
  },
  {
    id: 3,
    name: "Bartosz",
    surname: "Dynia",
    birthday: new Date(),
    age: 0,
    pesel: "121233112",
    gender: "MALE",
  },
  {
    id: 4,
    name: "Julia",
    surname: "Cebula",
    birthday: new Date(),
    age: 0,
    pesel: "121233112",
    gender: "FEMALE",
  },
  {
    id: 5,
    name: "Stefan",
    surname: "Papryka",
    birthday: new Date(),
    age: 0,
    pesel: "121233112",
    gender: "MALE",
  },
] as Patient[];

export const randomVisits = [
  {
    index: 0,
    date: new Date(2023, 3, 21, 19, 20),
    patientId: 0,
    doctorId: 0,
    duration: 10,
  },
  {
    index: 1,
    date: new Date(2023, 4, 18, 19, 20),
    patientId: 0,
    doctorId: 0,
    duration: 10,
  },
  {
    index: 2,
    date: new Date(2023, 3, 16, 19, 20),
    patientId: 0,
    doctorId: 0,
    duration: 10,
  },
  {
    index: 3,
    date: new Date(2023, 2, 12, 19, 20),
    patientId: 0,
    doctorId: 0,
    duration: 10,
  },
  {
    index: 4,
    date: new Date(2022, 6, 11, 19, 20),
    patientId: 0,
    doctorId: 0,
    duration: 10,
  },
  {
    index: 5,
    date: new Date(2023, 7, 21, 19, 20),
    patientId: 0,
    doctorId: 0,
    duration: 10,
  },
] as Visit[];

export const calculateAge = (birthday: Date) => {
  const now = new Date();
  let years = now.getFullYear() - birthday.getFullYear();
  let months = now.getMonth() - birthday.getMonth();
  const days = now.getDay() - birthday.getDay();
  if (days < 0) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
  }
  return years;
};

export const ITEMS_PER_PAGE = 10;
