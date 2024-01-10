export interface iItem {
  id: string;
  description: string;
  quantity: number;
  packed: boolean;
  deleted?: boolean;
}

export const items: iItem[] = [
  {
    id: crypto.randomUUID(),
    description: "Passports",
    quantity: 2,
    packed: false,
  },
  {
    id: crypto.randomUUID(),
    description: "Socks",
    quantity: 12,
    packed: false,
  },
];
