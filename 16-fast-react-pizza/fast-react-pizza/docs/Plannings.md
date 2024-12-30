# Planning the app

## Requirements

- [ ] simple application where users can order **one or more pizzas from a menu**
- [ ] no user account required; login via Name before using the app
- [x] menu can change and should be loaded from an API
- [ ] a cart which can hold multiple pizzas
- [ ] required order infos: **name, phone number, address**
- [ ] enable priority orders for 20% of cart price
- [ ] orders are made by sending a **POST request** with user data + pizzas
- [ ] payment on delivery
- [ ] each order gets unique ID for reference
- [ ] mark their orders with priority even after order has been placed

## Feature categories

- User
- Menu
- Cart
- Order

## Necessary Pages

| Name                | Route             |
| ------------------- | ----------------- |
| Homepage            | `/`               |
| Pizza menu          | `/menu`           |
| Cart                | `/cart`           |
| Placing new order   | `/order/new`      |
| Looking up an order | `/order/:orderID` |

## Technologies

| Task                    | Technology   |
| ----------------------- | ------------ |
| Routing                 | React Router |
| Styling                 | Tailwind CSS |
| Remote State Management | React Router |
| UI State Management     | Redux        |
