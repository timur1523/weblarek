import { IPage } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Page extends Component<IPage> {
    private counter: HTMLElement;
    private gallery: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.counter = ensureElement<HTMLElement>('.header__basket-counter', container);
        this.gallery = ensureElement<HTMLElement>('.gallery', container);

        const button = ensureElement<HTMLElement>('.header__basket', container);
        button.addEventListener('click', () => {
            this.events.emit('basket:open')
        })
    }

    setCounter(value: number): void {
        this.setText(this.counter, value.toString());
    }

    setGallery(items: HTMLElement[]): void {
        this.gallery.replaceChildren(...items);
    }
}