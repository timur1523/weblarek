import { IApi, IData, IGetProducts, IProduct, TOrder } from "../../types";

export class ApiModel {
    private _api: IApi
    constructor(api: IApi) {
        this._api = api
    }

    getProducts(): Promise<IProduct[]> {
        try {
            return this._api.get<{ items: IProduct[]; total: number }>('/product/').then((res: IGetProducts) => res.items)
        } catch (error) {
            console.log("Ошибка при получении продуктов " + error)
        }
    }

    postProducts(data: IData): Promise<TOrder> {
        try {
            return this._api.post<TOrder>('/order/', data)
        } catch (error) {
            console.log("Ошибка при оформлении заказа " + error)
        }
    }
}