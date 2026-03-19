import { TPayment } from "../../../types";
import { ensureAllElements } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

export class OrderForm extends Form {
    private paymentButtons: HTMLButtonElement[];

    constructor(events: IEvents, protected container: HTMLFormElement) {
        super(events, container);

        this.paymentButtons = ensureAllElements<HTMLButtonElement>(".button_alt", container);

        this.paymentButtons.forEach(element => {
            element.addEventListener('click', () => {
                this.events.emit("order:payment-changed", { payment: element.name });
            })
        });
    }
    setCurrentPayment(value: TPayment | null) {
        this.paymentButtons.forEach(element => {
            element.classList.toggle("button_alt-active", element.name === value);
        });
    }
}