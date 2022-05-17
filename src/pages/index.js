import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "../pages/index.css";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

/* //рендер карточек
function renderCard(card) {
  const cardElement = createCard(card);
  section.addItem(cardElement);
} */

//создание карточки
function createCard(data) {
  const newCard = new Card(data, ".cards-template", () => imagePopup.open(data), () => popupDeleteCard.open(data)).generateCard();
  return newCard;
}

//Добавление карточки
function handleAddCardSubmit(item) {
  renderCard(item);
  popupAddForm.close();
}

//Заполнение профиля
const handleEditProfileSubmit = (data) => {
  api.setUserInfo(data)
  .then(res => userInfo.setUserInfo(res));
  popupEditForm.close();
};

//-------Открытие Попапа редактирования профиля------//
buttonEditProfile.addEventListener("click", function () {
  popupEditForm.open();
  formValidators["editForm"].resetValidation();
  const userData = userInfo.getUserInfo();
  popupEditForm.setInputValues(userData);  
});

//-------Открытие Попапа добавления карточки--------//
buttonAddCard.addEventListener("click", () => {
  popupAddForm.open();
  formValidators["addForm"].resetValidation();
});

const formValidators = {};
// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const imagePopup = new PopupWithImage(".popup_photo");
imagePopup.setEventListeners();
const popupAddForm = new PopupWithForm(".popup_add", handleAddCardSubmit);
popupAddForm.setEventListeners();
const popupEditForm = new PopupWithForm(".popup_edit", handleEditProfileSubmit);
popupEditForm.setEventListeners();
const popupDeleteCard = new Popup('.popup_deleteCard');
popupDeleteCard.setEventListeners();
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});
/* const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements__items"
);
section.renderItems(); */


const api = new Api({
  url: "nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "e43cf3d4-dce7-474b-8529-7a9891978e41",
    "content-type": "application/json",
  },
});

//Получение профиля
const user = api.getInitialUser();
user.then((data) => {
  userInfo.setUserInfo(data);
})
.catch((err) => console.log(err));

//получение карточек
const cards = api.getInitialCards();
cards.then((data) => {
  data.map((card) => {
    const section = new Section(
      {
        items: [card],
        renderer: (card) => {
          const cardElement = createCard(card);
          section.addItem(cardElement);
        },
      },
      ".elements__items"
    );
    section.renderItems();
  });
})
.catch((err) => console.log(err));