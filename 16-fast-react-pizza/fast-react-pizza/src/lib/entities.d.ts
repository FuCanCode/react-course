declare global {
  export type IMenuItem = {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    ingredients: string[];
    soldOut: boolean;
  };

  export type IMenu = IMenuItem[];
}

export {};
