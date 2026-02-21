import { IBuyer } from "../../types";

export class BuyerModel {
    private _data: IBuyer = {
        payment: null,
        email: "",
        phone: "",
        address: "",
    }

    setBuyerData(data: Partial<IBuyer>): void {
        this._data = { ...this._data, ...data }
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
    }

    isValidData(): {[key: string]: string} {
        const errors: {[key: string]: string} = {};
        if (!this._data.payment) {
            errors.payment = "Выберите способ оплаты"
        } 
        if (!this._data.email) {
            errors.email = "Укажите ваш почтовый ящик"
        }
        if(!this._data.phone) {
            errors.phone = "Укажите ваш номер телефона"
        }
        if(!this._data.address) {
            errors.address = "Укажите ваш адрес проживания"
        }
        return errors
    }

}
