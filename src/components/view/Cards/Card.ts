import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export class Card extends Component<IProduct> {
    protected title: HTMLElement;
    protected price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.title = ensureElement<HTMLElement>(".card__title", container);
        this.price = ensureElement<HTMLElement>(".card__price", container);
    }

    setTitle(value: string) {
        this.setText(this.title, value)
    }
    updateImage(src: string, imgContainer: HTMLImageElement) {
        this.setImage(imgContainer, src, this.title.textContent)
    }
    setPrice(value: number | null) {
        this.setText(this.price, value? `${value} синапсов` : "Бесценно")
    }
}