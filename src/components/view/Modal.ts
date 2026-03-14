import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<HTMLElement> {
    private closeButton: HTMLButtonElement;
    private content: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);
        this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", container);
        this.content = ensureElement<HTMLElement>(".modal__content", container);
        this.closeButton.addEventListener('click', () => {
            this.modalClose()
        })

        this.container.addEventListener('click', () => {
            this.modalClose()
        })


    }

    modalOpen(): void {
        this.container.classList.add("modal_active");
        this.events.emit("modal:open")
    }

    modalClose(): void {
        this.container.classList.remove("modal_active");
        this.events.emit("modal:close")
    }

    setContent(content: HTMLElement) {
        this.content.replaceChildren(content);
    }
}