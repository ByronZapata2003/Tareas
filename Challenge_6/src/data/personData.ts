export interface Person {
  name: string;
  withdrawal: number;
  arrivalDate: string;
}

function getRandomDate(): string {
  const start = new Date("2026-03-12T08:00:00");
  const randomMs = Math.floor(Math.random() * 8 * 60 * 60 * 1000);
  return new Date(start.getTime() + randomMs).toISOString();
}

export const MOCK_PEOPLE: Person[] = [
  { name: "Carlos Perez",   withdrawal: 200,  arrivalDate: getRandomDate() },
  { name: "Maria Lopez",    withdrawal: 500,  arrivalDate: getRandomDate() },
  { name: "Juan Rodriguez", withdrawal: 150,  arrivalDate: getRandomDate() },
  { name: "Ana Martinez",   withdrawal: 1000, arrivalDate: getRandomDate() },
];