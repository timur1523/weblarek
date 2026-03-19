import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export class Form extends Component<HTMLFormElement> {
    private submit: HTMLButtonElement;
    private error: HTMLElement;

    constructor(protected events: IEvents, protected container: HTMLFormElement) {
        super(container);
        this.submit = ensureElement<HTMLButtonElement>('button[type="submit"]', container);
        this.error = ensureElement<HTMLElement>(".form__errors", container);

        container.addEventListener('submit', (event) => {
            event.preventDefault();

            this.events.emit(`${container.name}:submit`);
        })

        container.addEventListener('input', (event) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;

            this.events.emit(`${container.name}:change`, { field, value });
        })
    }

    setError(error: string) {
        this.setText(this.error, error);
    }

    clearForm() {
        this.container.reset();
    }

    setValid(valid: boolean) {
        if (!valid) {
            this.submit.disabled = true;
        } else {
            this.submit.disabled = false;
        }
    }
}