import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardPreview extends Card {
    private button: HTMLButtonElement;
    private description: HTMLElement;
    protected image: HTMLImageElement;
  

    constructor (private events: IEvents, container: HTMLElement) {
        super(container);
        this.image = ensureElement<HTMLImageElement>(".card__image", container);
        this.button = ensureElement<HTMLButtonElement>(".card__button", container);
        this.description = ensureElement<HTMLButtonElement>(".card__text", container);
        

        this.button.addEventListener("click", () => {
            this.events.emit("button:basket-changed", {id: this.container.dataset.id});
        })
    }

    setDescription(value: string) {
        this.setText(this.description, value)
    }

    render(data?: IProduct & {inBasket: boolean}): HTMLElement {
        if(!data) return this.container;
        this.container.dataset.id = data.id;
        this.setTitle(data.title);
        this.setPrice(data.price);
        this.setDescription(data.description);
        this.updateImage(data.image, this.image);
        if(!data.price) {
            this.button.disabled = true;
            this.button.textContent = "Недоступно";
        } else {
            this.button.textContent = data.inBasket? "Удалить из корзины" : "Купить";
        }
        return this.container
    }

}