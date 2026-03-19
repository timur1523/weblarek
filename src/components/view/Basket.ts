import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Basket extends Component<HTMLElement> {
    private list: HTMLElement;
    private totalPrice: HTMLElement;
    private orderButton: HTMLButtonElement;


    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.list = ensureElement<HTMLElement>(".basket__list", container);
        this.totalPrice = ensureElement<HTMLElement>(".basket__price", container);
        this.orderButton = ensureElement<HTMLButtonElement>(".basket__button", container);

        this.orderButton.addEventListener("click", () => {
            this.events.emit('order:start');
        })
    }

    setItems(items: HTMLElement[]) {
        this.list.replaceChildren(...items);
    }

    setTotalPrice(total: number) {
        this.setText(this.totalPrice, `${total} синапсов`);
    }

    setButtonDisabled(disabled: boolean) {
        this.orderButton.disabled = disabled;
    }
}