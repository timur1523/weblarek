import { ISuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Success extends Component<ISuccess> {
    private closeButton: HTMLButtonElement;
    private description: HTMLElement;

    constructor(private events: IEvents, container: HTMLElement) {
        super(container);

        this.closeButton = ensureElement<HTMLButtonElement>(".order-success__close", container);
        this.description = ensureElement<HTMLElement>(".order-success__description", container);

        this.closeButton.addEventListener("click", () => {
            this.events.emit("success:close");
        })
    }

    setDescription(value: number) {
        this.setText(this.description, `Списано ${value} синапсов`);
    }
}