import { IProduct } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Card } from "./Card";

export class CardCatalog extends Card {
    protected image: HTMLImageElement;
    private category: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.image = ensureElement<HTMLImageElement>(".card__image", container);
        this.category = ensureElement(".card__category", container);
        container.addEventListener("click", () => {
            this.events.emit("card:select", { id: this.container.dataset.id });
        })
    }

    render(data?: IProduct): HTMLElement {
        if (!data) return this.container;
        this.container.dataset.id = data.id;
        this.setTitle(data.title);
        this.updateImage(data.image, this.image);
        this.setCategory(this.category, data.category);
        this.setPrice(data.price);
        return this.container
    }
};