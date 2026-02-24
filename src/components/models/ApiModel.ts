import { IApi, IData, IGetProducts, IProduct, TOrder } from "../../types";

export class ApiModel {
    private _api: IApi
    constructor(api: IApi) {
        this._api = api
    }

    getProducts(): Promise<IProduct[]> {
        return this._api.get<{ items: IProduct[]; total: number }>('/product/').then((res: IGetProducts) => res.items)
    }

    postProducts(data: IData): Promise<TOrder> {
        return this._api.post<TOrder>('/order/', data)
    }
}