declare global {
  export interface IPizza {
    id: number;
    name: string;
    unitPrice: number;
    imageUrl: string;
    ingredients: string[];
    soldOut: boolean;
  }

  export type IMenu = IPizza[];

  export interface ICartItem {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }

  export interface ICartItemResponse {
    addIngredients: string[];
    removeIngredients: string[];
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }

  export interface IOrderRequest {
    customer: string;
    phone: string;
    address: string;
    priority: boolean;
    cart: ICartItem[];
  }

  export interface IOrderResponse extends Omit<IOrderRequest, "cart"> {
    id: string;
    status?: string;
    cart: ICartItemResponse[];
    estimatedDelivery: string;
    position: string;
    orderPrice: number;
    priorityPrice: number;
  }
}

export {};
