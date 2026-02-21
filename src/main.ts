import { Api } from './components/base/Api';
import { ApiModel } from './components/models/ApiModel';
import { BasketModel } from './components/models/BasketModel';
import { BuyerModel } from './components/models/BuyerModel';
import { ProductsModel } from './components/models/ProductsModel';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

const product = new ProductsModel()
const basket = new BasketModel()
const buyer = new BuyerModel()

const baseApi = new Api(API_URL)
const apiModel = new ApiModel(baseApi)
apiModel.getProducts().then((products) => {
    console.log("Методы класса ProductsModel");
    product.setItems(products);
    product.setPreview(products[5]);
    console.log(product.getItems());
    console.log(product.getItem(products[2].id));
    console.log(product.getPreview());
    console.log("Методы класса BasketModel");
    basket.addItem(products[0]);
    basket.addItem(products[1]);
    basket.addItem(products[2]);
    console.log(basket.getItems());
    console.log(basket.getTotalPrice());
    console.log(basket.getTotalCount());
    console.log(basket.hasItem(products[2].id));
    basket.deleteItem(products[2].id);
    console.log(basket.getItems());
    basket.clearBasket();
    console.log(basket.getItems());
    console.log("Методы класса BuyerModel");
    buyer.setBuyerData({payment: 'cash', address: ''})
    console.log(buyer.isValidData());
    console.log(buyer.getData());
    buyer.clearData();
    console.log(buyer.getData());
})



console.log(baseApi);
console.log(API_URL);
