import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardBasket extends Card {
    private index: HTMLElement;
    private deleteButton: HTMLButtonElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.index = ensureElement<HTMLElement>(".basket__item-index", container);
        this.deleteButton = ensureElement<HTMLButtonElement>(".basket__item-delete", container);

        this.deleteButton.addEventListener("click", () => {
            this.events.emit("basket:remove", {id: this.container.dataset.id});
        })
    }

    render(data: IProduct & {index: number}): HTMLElement {
        super.render(data);
        this.container.dataset.id = data.id;
        this.setText(this.title, data.title);
        this.setText(this.price, `${data.price} синапсов`);
        this.setText(this.index, String(data.index));
        return this.container
    }
}