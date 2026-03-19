import { IEvents } from "../../base/Events";
import { Form } from "./Form";

export class ContactsForm extends Form{
    constructor(events: IEvents, container: HTMLFormElement) {
        super(events, container);
    }
};