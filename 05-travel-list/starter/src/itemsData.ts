interface Items {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

class ItemList {
  items: Items[] = [];
}

const items: Items[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

// ADD

// Pack

// Clear

// Sort
