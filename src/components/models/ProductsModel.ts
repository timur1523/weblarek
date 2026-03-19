import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductsModel {
    private _items: IProduct[] = [];
    private _preview: IProduct | null = null;

    constructor(private events: IEvents) { };

    setItems(items: IProduct[]): void {
        this._items = items;
        this.events.emit('products:changed');
    }

    getItems(): IProduct[] {
        return this._items;
    }

    getItem(id: string): IProduct | undefined {
        return this._items.find(item => item.id === id)
    }

    setPreview(item: IProduct): void {
        this._preview = item;
        this.events.emit('preview:changed', item);
    }

    getPreview(): IProduct | null {
        return this._preview
    }
}