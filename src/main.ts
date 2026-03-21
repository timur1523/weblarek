import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { ApiModel } from './components/models/ApiModel';
import { BasketModel } from './components/models/BasketModel';
import { BuyerModel } from './components/models/BuyerModel';
import { ProductsModel } from './components/models/ProductsModel';
import { Basket } from './components/view/Basket';
import { CardBasket } from './components/view/Cards/CardBasket';
import { CardCatalog } from './components/view/Cards/CardCatalog';
import { CardPreview } from './components/view/Cards/CardPreview';
import { ContactsForm } from './components/view/Forms/ContactsForm';
import { OrderForm } from './components/view/Forms/OrderForm';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import { Success } from './components/view/Success';
import './scss/styles.scss';
import { IBuyer, ICardSelectEvent, InputOrder, IPayment, IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';

const events = new EventEmitter();
const product = new ProductsModel(events);
const basketModel = new BasketModel(events);
const buyer = new BuyerModel(events);

const baseApi = new Api(API_URL);
const apiModel = new ApiModel(baseApi);
const modalContainer = document.getElementById("modal-container") as HTMLElement;

//Получаем шаблоны
const successTemplate = document.getElementById("success") as HTMLTemplateElement;
const cardCatalogTemplate = document.getElementById("card-catalog") as HTMLTemplateElement;
const cardPreviewTemplate = document.getElementById("card-preview") as HTMLTemplateElement;
const cardBasketTemplate = document.getElementById("card-basket") as HTMLTemplateElement;
const basketTemplate = document.getElementById("basket") as HTMLTemplateElement;
const orderTemplate = document.getElementById("order") as HTMLTemplateElement;
const contactsTemplate = document.getElementById("contacts") as HTMLTemplateElement;

const modal = new Modal(events, modalContainer);
const basket = new Basket(events, cloneTemplate(basketTemplate));
const page = new Page(events, document.querySelector(".page") as HTMLElement);
const orderForm = new OrderForm(events, cloneTemplate(orderTemplate));
const contactsForm = new ContactsForm(events, cloneTemplate(contactsTemplate));

apiModel.getProducts().then((products) => {
    product.setItems(products);
}).catch(error => {
    console.log(error);
});

events.on('products:changed', () => {
    const products = product.getItems();
    const cardsElements = products.map(product => {
        const el = cloneTemplate(cardCatalogTemplate);
        const card = new CardCatalog(events, el);
        return card.render({ ...product, image: CDN_URL + product.image })
    })
    page.setGallery(cardsElements);
});

events.on('card:select', (event: ICardSelectEvent) => {
    const item = product.getItem(event.id);
    if (item) {
        product.setPreview(item);
    }
});

events.on('preview:changed', (item: IProduct) => {
    const card = new CardPreview(events, cloneTemplate(cardPreviewTemplate));
    if (item.price) {
        card.setButton(basketModel.hasItem(item.id) ? "Удалить из корзины" : "Купить")
    } else {
        card.setButton("Недоступно");
        card.setButtonDisabled(true);
    }
    modal.setContent(card.render({ ...item, image: CDN_URL + item.image, inBasket: basketModel.hasItem(item.id) }));
    modal.modalOpen();
});

events.on("button:basket-changed", (event: ICardSelectEvent) => {
    const item = product.getItem(event.id);
    if (!item) return;
    basketModel.hasItem(event.id) ? basketModel.deleteItem(event.id) : basketModel.addItem(item);
    modal.modalClose();
});

events.on('basket:changed', () => {
    const items = basketModel.getItems().map((item, index) => {
        const el = cloneTemplate(cardBasketTemplate);
        const card = new CardBasket(events, el);
        return card.render({ ...item, index: index + 1 })
    })
    const basketCount = basketModel.getTotalCount()
    basket.setItems(items);
    basket.setTotalPrice(basketModel.getTotalPrice());
    page.setCounter(basketCount);
    basket.setButtonDisabled(!basketCount)
});

events.on('basket:open', () => {
    modal.setContent(basket.render());
    modal.modalOpen();
});

events.on('basket:remove', (event: ICardSelectEvent) => {
    basketModel.deleteItem(event.id);
});

events.on('order:start', () => {
    modal.setContent(orderForm.render())
    modal.modalOpen();
});

events.on('order:payment-changed', (event: IPayment) => {
    buyer.setBuyerData({ payment: event.payment });
});

events.on('order:change', (event: InputOrder) => {
    const { field, value } = event;
    buyer.setBuyerData({ [field]: value });
});

events.on('order:submit', () => {
    const { payment, address } = buyer.isValidData();
    if (payment || address) return
    modal.setContent(contactsForm.render());
});

events.on('contacts:change', (event: InputOrder) => {
    const { field, value } = event;
    buyer.setBuyerData({ [field]: value });
});

events.on('contacts:submit', () => {
    const { phone, email } = buyer.isValidData();
    if (phone || email) return;
    const data = buyer.getData();
    const orderData = {
        ...data,
        items: basketModel.getItems().map(item => item.id),
        total: basketModel.getTotalPrice()
    }

    apiModel.postProducts(orderData).then(() => {
        const success = new Success(events, cloneTemplate(successTemplate));
        success.setDescription(basketModel.getTotalPrice());
        basketModel.clearBasket();
        buyer.clearData();
        modal.setContent(success.render());
    })
});

events.on("success:close", () => {
    modal.modalClose();
});

events.on('buyer:changed', (event: IBuyer) => {
    console.log(event);
    const { payment, address, email, phone } = buyer.isValidData();
    orderForm.setError(payment ?? address);
    orderForm.setValid(!payment && !address);
    orderForm.setCurrentPayment(event.payment);
    orderForm.setAddress(event.address);
    contactsForm.setError(phone ?? email);
    contactsForm.setValid(!phone && !email);
    contactsForm.setEmail(event.email);
    contactsForm.setPhone(event.phone);
})