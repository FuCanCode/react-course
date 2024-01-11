export interface iItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
  deleted?: boolean;
}

export const items: iItem[] = [
  {
    id: 2,
    description: "Passports",
    quantity: 2,
    packed: false,
  },
  {
    id: 1,
    description: "Socks",
    quantity: 12,
    packed: false,
  },
];
