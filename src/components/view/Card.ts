import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Card extends Component<IProduct> {
    protected title: HTMLElement;
    protected image: HTMLImageElement;
    protected price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.title = ensureElement<HTMLElement>(".card__title", container);
        this.image = ensureElement<HTMLImageElement>(".card__image", container);
        this.price = ensureElement<HTMLElement>(".card__price", container);
    }

    setTitle(value: string) {
        this.setText(this.title, value)
    }
    updateImage(src: string) {
        this.setImage(this.image, src, this.title.textContent)
    }
    setPrice(value: number) {
        this.setText(this.price, value.toString())
    }
}