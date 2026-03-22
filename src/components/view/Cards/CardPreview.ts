import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardPreview extends Card {
    private button: HTMLButtonElement;
    private description: HTMLElement;
    protected image: HTMLImageElement;
    private category: HTMLElement;


    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.image = ensureElement<HTMLImageElement>(".card__image", container);
        this.button = ensureElement<HTMLButtonElement>(".card__button", container);
        this.description = ensureElement<HTMLButtonElement>(".card__text", container);
        this.category = ensureElement(".card__category", container);


        this.button.addEventListener("click", () => {
            this.events.emit("button:basket-changed", { id: this.container.dataset.id });
        })
    }

    setDescription(value: string) {
        this.setText(this.description, value)
    }

    render(data?: IProduct & { inBasket: boolean }): HTMLElement {
        if (!data) return this.container;
        this.container.dataset.id = data.id;
        this.setTitle(data.title);
        this.setPrice(data.price);
        this.setCategory(this.category, data.category);
        this.setDescription(data.description);
        this.updateImage(data.image, this.image);
        return this.container
    }

    setButton(value: string) {
        this.button.textContent = value;
    }

    setButtonDisabled(value: boolean) {
        this.button.disabled = value;
    }
}