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

    protected setCategory(categoryContainer: HTMLElement, value: string) {
        this.setText(categoryContainer, value)
        let className: string = "card__category_";
        switch (value) {
            case "софт-скил":
                className += "soft";
                break;
            case "другое":
                className += "other";
                break
            case "дополнительное":
                className += "additional"
                break;
            case "кнопка":
                className += "button"
                break;
            case "хард-скил":
                className += "hard"
        }
        categoryContainer.classList.add(className)
    }


    setPrice(value: number | null) {
        this.setText(this.price, value ? `${value} синапсов` : "Бесценно")
    }
}