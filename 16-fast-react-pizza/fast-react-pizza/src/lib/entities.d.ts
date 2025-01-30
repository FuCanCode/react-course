declare global {
  export type IPizza = {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    ingredients: string[];
    soldOut: boolean;
  };

  export type IMenu = IPizza[];
}

export {};
