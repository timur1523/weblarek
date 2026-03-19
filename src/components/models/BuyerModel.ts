import { IBuyer } from "../../types";
import { IEvents } from "../base/Events";

export class BuyerModel {
    private _data: IBuyer = {
        payment: null,
        email: "",
        phone: "",
        address: "",
    }
    constructor(private events: IEvents) { }

    setBuyerData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data };
        this.events.emit('buyer:changed', this._data);
    }

    getData(): IBuyer {
        return this._data
    }

    clearData(): void {
        this._data = {
            payment: null,
            email: "",
            phone: "",
            address: "",
        }
        this.events.emit('buyer:changed', this._data);
    }

    isValidData(): { [key: string]: string } {
        const errors: { [key: string]: string } = {};
        if (!this._data.payment) {
            errors.payment = "Выберите способ оплаты"
        }
        if (!this._data.email) {
            errors.email = "Укажите ваш почтовый ящик"
        } else if (!this.validateEmail(this._data.email)) {
            errors.email = "Неверный формат почты"
        }
        if (!this._data.phone) {
            errors.phone = "Укажите ваш номер телефона"
        } else if (this._data.phone.length !== 12 || !this._data.phone.startsWith("+7") || isNaN(+this._data.phone.replace("+", ""))) {
            errors.phone = "Номер телефона указан неверно"
        }
        if (!this._data.address) {
            errors.address = "Укажите ваш адрес проживания"
        }
        return errors
    }

    protected validateEmail(email: string): boolean {
        const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.]+\.[a-zA-Z]{2,}$/;
        return reg.test(email);
    }
}
