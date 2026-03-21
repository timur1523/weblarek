import { TPayment } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

export class OrderForm extends Form {
    private paymentButtons: HTMLButtonElement[];
    private address: HTMLInputElement;

    constructor(events: IEvents, protected container: HTMLFormElement) {
        super(events, container);

        this.paymentButtons = ensureAllElements<HTMLButtonElement>(".button_alt", container);
        this.address = ensureElement<HTMLInputElement>("[name='address']", container);

        this.paymentButtons.forEach(element => {
            element.addEventListener('click', () => {
                this.events.emit("order:payment-changed", { payment: element.name });
            })
        });
    }
    setCurrentPayment(value: TPayment | null) {
        if (value) {
            this.paymentButtons.forEach(element => {
                element.classList.toggle("button_alt-active", element.name === value);
            });
        } else {
            this.paymentButtons.forEach(element => {
                element.classList.remove("button_alt-active");
            });
        }
    }

    setAddress(value: string) {
        this.address.value = value ?? "";
    }

}