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

  export type IOrderRequest = {
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    cart: ICartItem[];
  };

  export type IOrderResponse = IOrderRequest & {
    id: string;
    status?: string;
    estimatedDelivery: string;
    position: string;
    orderPrice: number;
    priorityPrice: number;
  };
}

export {};
