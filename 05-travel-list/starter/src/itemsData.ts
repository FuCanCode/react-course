export interface iItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export const items: iItem[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];
