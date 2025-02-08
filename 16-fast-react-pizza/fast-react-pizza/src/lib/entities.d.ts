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

  export type ICartItem = {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  };

  export type IOrder = {
    id: string;
    customer: string;
    phone: string;
    address: string;
    priority: true;
    status?: string;
    estimatedDelivery: string;
    cart: ICartItem[];
    position: string;
    orderPrice: number;
    priorityPrice: number;
  };
}

export {};
