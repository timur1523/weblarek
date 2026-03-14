import { IBuyer, TPayment } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

export class OrderForm extends Form<IBuyer> {
    private paymentButtons: HTMLButtonElement[];
    private address: string;

    constructor(private events: IEvents, container: HTMLFormElement) {
        super(events, container);
        this.paymentButtons = ensureAllElements<HTMLButtonElement>(".button_alt", container);

        this.paymentButtons.forEach(element => {
            element.addEventListener('click', () => {
                this.events.emit("order:payment-changed", {payment:element.name});
            })
        });
    }

    setCurrentPayment(value: TPayment) {
        this.paymentButtons.forEach(element => {
           element.classList.toggle("active", element.name === value);
        });
    }

    setAddress(value: string) {
        this.address = value;
    }
}