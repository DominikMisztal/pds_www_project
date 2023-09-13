export type Patient = {
  index: number;
  name: string;
  surname: string;
};

export type Visit = {
  index: number;
  date: Date;
  patient: Patient;
};

export const randomPatients = [
  { index: 0, name: "Adam", surname: "Awokado" },
  { index: 1, name: "Jan", surname: "Pietruszka" },
  { index: 2, name: "Anna", surname: "Bakłażan" },
  { index: 3, name: "Bartosz", surname: "Dynia" },
  { index: 4, name: "Julia", surname: "Cebula" },
  { index: 5, name: "Stefan", surname: "Papryka" },
] as Patient[];

export const randomVisits = [
  { index: 0, date: new Date(2023, 3, 21, 19, 20), patient: randomPatients[0] },
  { index: 1, date: new Date(2023, 4, 18, 19, 20), patient: randomPatients[1] },
  { index: 2, date: new Date(2023, 3, 16, 19, 20), patient: randomPatients[2] },
  { index: 3, date: new Date(2023, 2, 12, 19, 20), patient: randomPatients[3] },
  { index: 4, date: new Date(2022, 6, 11, 19, 20), patient: randomPatients[4] },
  { index: 5, date: new Date(2023, 7, 21, 19, 20), patient: randomPatients[5] },
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
