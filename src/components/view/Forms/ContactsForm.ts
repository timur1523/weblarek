import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form {
    private phone: HTMLInputElement;
    private email: HTMLInputElement;
    constructor(events: IEvents, container: HTMLFormElement) {
        super(events, container);
        this.phone = ensureElement<HTMLInputElement>("[name='phone']", container);
        this.email = ensureElement<HTMLInputElement>("[name='email']", container);
    };

    setEmail(value: string) {
        this.email.value = value ?? "";
    };

    setPhone(value: string) {
        this.phone.value = value ?? "";
    };
};