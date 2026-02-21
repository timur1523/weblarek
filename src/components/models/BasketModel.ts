import { IProduct } from "../../types";

export class BasketModel {
    private _items: IProduct[] = [];

    getItems(): IProduct[] {
        return this._items
    }

    addItem(item: IProduct): void {
        this._items.push(item);
    }

    deleteItem(id: string): void {
        this._items = this._items.filter(item => item.id !== id)
    }

    clearBasket(): void {
        this._items = []
    }

    getTotalPrice(): number {
        return this._items.reduce((acc, item) => acc + (item.price ?? 0), 0)
    }

    getTotalCount(): number {
        return this._items.length
    }

    hasItem(id: string): boolean {
        return this._items.some(item => item.id === id)
    }
}

