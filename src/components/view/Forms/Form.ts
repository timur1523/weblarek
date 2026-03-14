import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export class Form extends Component<HTMLFormElement> {
    private submit: HTMLButtonElement;
    private error: HTMLElement;

    constructor(private events: IEvents, private container: HTMLFormElement) {
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

            this.events.emit(`${container.name}:change`, {field, value});
        })
    }

    setError(error: string) {
        this.setText(this.error, error);
    }

    clearForm() {
        this.container.reset();
    }

    render(state: Partial<T> & {valid: boolean; error: string}): HTMLElement {
        const {error, valid, ...inputs} = state;
        if (valid) {
            this.submit.setAttribute("disabled", 'disabled');
        } else {
            this.submit.removeAttribute("disabled");
        }

        this.error = error;

        return this.container
    }
}