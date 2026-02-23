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
    product.setItems(products);// сохраненяем массив товаров, полученного с сервера
    product.setPreview(products[5]);// устанавливаем определенный товар для подробного просмотра
    console.log("Возвращаем массив всех товаров " + product.getItems());
    console.log("Находим и возвращаем товар по его id " + product.getItem(products[2].id));
    console.log("Получили товар для подробного отображения " + product.getPreview());
    console.log("Методы класса BasketModel");
    basket.addItem(products[0]);//добавляем товар в массив корзины;
    basket.addItem(products[1]);
    basket.addItem(products[2]);
    console.log("Получили массив товаров, которые находятся в корзине " + basket.getItems());
    console.log("Получили стоимость всех товаров в корзине " + basket.getTotalPrice());
    console.log("Узнали количество товаров в корзине " + basket.getTotalCount());
    console.log("Проверили наличие товара в корзине по его id " + basket.hasItem(products[2].id));
    basket.deleteItem(products[2].id);//удаляем товар, полученный в параметре из массива корзины
    console.log("Получили массив товаров, которые находятся в корзине " + basket.getItems());
    basket.clearBasket();// очистили корзину
    console.log("Снова получили массив товаров, которые находятся в корзине " + basket.getItems());
    console.log("Методы класса BuyerModel");
    buyer.setBuyerData({ payment: 'cash', address: '' })//сохраненяем данные в модели
    console.log("Валидация данных " + buyer.isValidData());
    console.log("Получили все данные покупателя " + buyer.getData());
    buyer.clearData();//очистили данные покупателя
    console.log("Снова получили все данные покупателя " + buyer.getData());
})



console.log(baseApi);
console.log(API_URL);
