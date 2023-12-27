import { iItem } from "./itemsData";

export class ItemList {
  private items: iItem[];

  constructor(il?: iItem[]) {
    this.items = il ? il : [];
  }

  public getList() {
    return this.items;
  }

  // ADD
  public addItem(qty: number, descr: string): iItem {
    const newItem: iItem = {
      id: this.items.length + 1,
      description: descr,
      quantity: qty,
      packed: false,
    };
    this.items.push(newItem);

    return newItem;
  }

  // Pack
  public togglePackStatus(id: number): void {
    const itemToToggle = this.items.find((item) => item.id === id);

    if (!itemToToggle) return;

    itemToToggle.packed = !itemToToggle.packed;
  }

  // Clear

  // Sort
}
